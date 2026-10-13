import { NextResponse } from "next/server";
import sharp from "sharp";

// In-memory cache for ultra-fast repeated loads (0-2ms latency)
const imageCache = new Map();
const MAX_CACHE_SIZE = 400;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    const widthParam = searchParams.get("w");
    const qualityParam = searchParams.get("q");

    if (!url || !url.startsWith("http")) {
      return new NextResponse("Invalid URL parameter", { status: 400 });
    }

    const targetWidth = widthParam ? Math.min(Math.max(parseInt(widthParam, 10) || 1200, 50), 2000) : 1200;
    const targetQuality = qualityParam ? Math.min(Math.max(parseInt(qualityParam, 10) || 80, 20), 100) : 80;
    const cacheKey = `${url}_w${targetWidth}_q${targetQuality}`;

    // Return from in-memory cache if available
    if (imageCache.has(cacheKey)) {
      const cached = imageCache.get(cacheKey);
      return new NextResponse(cached.buffer, {
        status: 200,
        headers: {
          "Content-Type": cached.contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "X-Image-Cache": "HIT",
        },
      });
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 86400 * 30 }, // 30-day fetch cache
    });

    if (!res.ok) {
      return new NextResponse(`Failed to fetch image: ${res.statusText}`, {
        status: res.status,
      });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const rawBuffer = Buffer.from(await res.arrayBuffer());

    // If SVG or gif, return as-is
    if (contentType.includes("svg") || contentType.includes("gif")) {
      return new NextResponse(rawBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    let outputBuffer;
    let outputContentType = "image/webp";

    try {
      let pipeline = sharp(rawBuffer).rotate();
      const meta = await pipeline.metadata();

      if (meta.width && meta.width > targetWidth) {
        pipeline = pipeline.resize({ width: targetWidth, withoutEnlargement: true });
      }

      outputBuffer = await pipeline
        .webp({ quality: targetQuality, effort: 4 })
        .toBuffer();
    } catch (sharpError) {
      console.warn("Sharp optimization fallback to raw buffer:", sharpError.message);
      outputBuffer = rawBuffer;
      outputContentType = contentType;
    }

    // Cache in memory
    if (imageCache.size >= MAX_CACHE_SIZE) {
      const firstKey = imageCache.keys().next().value;
      imageCache.delete(firstKey);
    }
    imageCache.set(cacheKey, { buffer: outputBuffer, contentType: outputContentType });

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": outputContentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Image-Cache": "MISS",
      },
    });
  } catch (err) {
    console.error("Image proxy error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
