import { NextResponse } from "next/server";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";

// In-memory cache for ultra-fast repeated loads (0-1ms latency)
const memoryCache = new Map();
const MAX_MEM_CACHE = 300;

// In-flight request deduplication map to prevent multiple parallel fetches/sharp ops for same URL
const inflightRequests = new Map();

// Local disk cache directory
let diskCacheDir = null;
try {
  diskCacheDir = path.join(process.cwd(), ".next", "cache", "koop-img");
  if (!fs.existsSync(diskCacheDir)) {
    fs.mkdirSync(diskCacheDir, { recursive: true });
  }
} catch {
  try {
    diskCacheDir = path.join(os.tmpdir(), "koop-img");
    if (!fs.existsSync(diskCacheDir)) {
      fs.mkdirSync(diskCacheDir, { recursive: true });
    }
  } catch {
    diskCacheDir = null;
  }
}

function getCacheKeyHash(key) {
  return crypto.createHash("md5").update(key).digest("hex");
}

async function processImage(url, targetWidth, targetQuality) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36",
    },
    next: { revalidate: 86400 * 30 }, // 30-day fetch cache
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch image from upstream: ${res.statusText} (${res.status})`);
  }

  const contentType = (res.headers.get("content-type") || "image/jpeg").toLowerCase();
  const rawBuffer = Buffer.from(await res.arrayBuffer());

  // If SVG or GIF, return as-is
  if (contentType.includes("svg") || contentType.includes("gif")) {
    return { buffer: rawBuffer, contentType };
  }

  // If already WebP and reasonably sized, return directly to avoid re-encoding overhead
  if (contentType.includes("webp") && rawBuffer.byteLength < 250 * 1024 && targetWidth >= 800) {
    return { buffer: rawBuffer, contentType: "image/webp" };
  }

  try {
    let pipeline = sharp(rawBuffer).rotate();
    const meta = await pipeline.metadata();

    if (meta.width && meta.width > targetWidth) {
      pipeline = pipeline.resize({ width: targetWidth, withoutEnlargement: true });
    }

    // effort: 1 is 4x-5x faster than effort: 4 with negligible difference in file size & visual quality
    const outputBuffer = await pipeline
      .webp({ quality: targetQuality, effort: 1 })
      .toBuffer();

    return { buffer: outputBuffer, contentType: "image/webp" };
  } catch (sharpError) {
    console.warn("Sharp optimization fallback to raw buffer:", sharpError.message);
    return { buffer: rawBuffer, contentType };
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    const widthParam = searchParams.get("w");
    const qualityParam = searchParams.get("q");

    if (!url || !url.startsWith("http")) {
      return new NextResponse("Invalid URL parameter", { status: 400 });
    }

    // Sensible defaults: 800px width (faster than 1200px) and 78 quality
    const targetWidth = widthParam ? Math.min(Math.max(parseInt(widthParam, 10) || 800, 40), 1920) : 800;
    const targetQuality = qualityParam ? Math.min(Math.max(parseInt(qualityParam, 10) || 78, 20), 100) : 78;
    const cacheKey = `${url}_w${targetWidth}_q${targetQuality}`;
    const keyHash = getCacheKeyHash(cacheKey);
    const etag = `"${keyHash}"`;

    // 1. Check HTTP If-None-Match for 304 Not Modified (instant 0ms response)
    const ifNoneMatch = request.headers.get("if-none-match");
    if (ifNoneMatch && ifNoneMatch === etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          "ETag": etag,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    // 2. Check Fast In-Memory Cache
    if (memoryCache.has(cacheKey)) {
      const cached = memoryCache.get(cacheKey);
      return new NextResponse(cached.buffer, {
        status: 200,
        headers: {
          "Content-Type": cached.contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "ETag": etag,
          "X-Image-Cache": "MEM_HIT",
        },
      });
    }

    // 3. Check Persistent Disk Cache
    if (diskCacheDir) {
      const diskPath = path.join(diskCacheDir, `${keyHash}.webp`);
      const metaPath = path.join(diskCacheDir, `${keyHash}.meta`);
      if (fs.existsSync(diskPath)) {
        try {
          const fileBuf = fs.readFileSync(diskPath);
          let diskContentType = "image/webp";
          if (fs.existsSync(metaPath)) {
            diskContentType = fs.readFileSync(metaPath, "utf8").trim() || "image/webp";
          }

          // Populate memory cache
          if (memoryCache.size >= MAX_MEM_CACHE) {
            const firstKey = memoryCache.keys().next().value;
            memoryCache.delete(firstKey);
          }
          memoryCache.set(cacheKey, { buffer: fileBuf, contentType: diskContentType });

          return new NextResponse(fileBuf, {
            status: 200,
            headers: {
              "Content-Type": diskContentType,
              "Cache-Control": "public, max-age=31536000, immutable",
              "ETag": etag,
              "X-Image-Cache": "DISK_HIT",
            },
          });
        } catch {
          // Fall through to fetch if disk read fails
        }
      }
    }

    // 4. In-flight Request Deduplication
    let pendingPromise = inflightRequests.get(cacheKey);
    if (!pendingPromise) {
      pendingPromise = processImage(url, targetWidth, targetQuality)
        .then((result) => {
          // Write to memory cache
          if (memoryCache.size >= MAX_MEM_CACHE) {
            const firstKey = memoryCache.keys().next().value;
            memoryCache.delete(firstKey);
          }
          memoryCache.set(cacheKey, result);

          // Write to disk cache asynchronously
          if (diskCacheDir) {
            try {
              const diskPath = path.join(diskCacheDir, `${keyHash}.webp`);
              const metaPath = path.join(diskCacheDir, `${keyHash}.meta`);
              fs.writeFile(diskPath, result.buffer, () => {});
              fs.writeFile(metaPath, result.contentType, () => {});
            } catch {}
          }
          return result;
        })
        .finally(() => {
          inflightRequests.delete(cacheKey);
        });

      inflightRequests.set(cacheKey, pendingPromise);
    }

    const { buffer, contentType } = await pendingPromise;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "ETag": etag,
        "X-Image-Cache": "MISS",
      },
    });
  } catch (err) {
    console.error("Image proxy error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
