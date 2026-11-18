import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.koopindia.com";
const FEED_URL = `${SITE_URL}/feed.xml`;

function escapeXml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    // Remove invalid XML 1.0 control characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(value) {
  if (!value) return null;
  if (typeof value?.toDate === "function") {
    const d = value.toDate();
    return isNaN(d.getTime()) ? null : d;
  }
  if (typeof value === "object" && typeof value.seconds === "number") {
    const d = new Date(value.seconds * 1000);
    return isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

function getImageMimeType(url) {
  if (!url) return "image/jpeg";
  const lower = url.toLowerCase().split("?")[0];
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
}

function resolveAbsoluteUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) return `${SITE_URL}${trimmed}`;
  return null;
}

export async function GET() {
  let blogs = [];

  try {
    const snap = await getDocs(collection(db, "blogs"));
    blogs = snap.docs
      .map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))
      .filter((blog) => {
        if (!blog.title && !blog.seo?.metaTitle) return false;
        if (blog.status && String(blog.status).toLowerCase() === "draft") {
          return false;
        }
        return true;
      });

    // Sort newest first by createdAt / date / updatedAt
    blogs.sort((a, b) => {
      const dateA =
        parseDate(a.createdAt) ||
        parseDate(a.date) ||
        parseDate(a.updatedAt) ||
        new Date(0);
      const dateB =
        parseDate(b.createdAt) ||
        parseDate(b.date) ||
        parseDate(b.updatedAt) ||
        new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
  }

  const latestDate =
    blogs.length > 0
      ? parseDate(blogs[0].updatedAt) ||
        parseDate(blogs[0].createdAt) ||
        parseDate(blogs[0].date) ||
        new Date()
      : new Date();

  const itemsXml = blogs
    .map((blog) => {
      const slug = blog.slug || blog.id;
      const blogUrl = `${SITE_URL}/blog/${encodeURIComponent(slug)}`;
      const title = blog.seo?.metaTitle || blog.title || "Koop India Blog";

      const rawDesc =
        blog.seo?.metaDescription ||
        blog.description ||
        stripHtml(blog.bodyContent || blog.content || "").slice(0, 280) ||
        "Read expert business insights, compliance guides, and growth strategies on Koop India.";
      const description =
        rawDesc.length > 320 ? `${rawDesc.slice(0, 317).trim()}...` : rawDesc;

      const pubDate =
        parseDate(blog.date) || parseDate(blog.createdAt) || new Date();
      const updatedDate = parseDate(blog.updatedAt) || pubDate;
      const author = blog.author || "Team Koop India";

      const imageUrl = resolveAbsoluteUrl(blog.imageUrl || blog.coverImage);
      const imageMime = getImageMimeType(imageUrl);

      const categoriesXml = Array.isArray(blog.categories)
        ? blog.categories
            .filter(Boolean)
            .map((cat) => `      <category>${escapeXml(cat)}</category>`)
            .join("\n")
        : "";

      const imageXml = imageUrl
        ? `      <media:content url="${escapeXml(imageUrl)}" medium="image" type="${imageMime}" />
      <enclosure url="${escapeXml(imageUrl)}" length="0" type="${imageMime}" />`
        : "";

      return [
        "    <item>",
        `      <title>${escapeXml(title)}</title>`,
        `      <link>${escapeXml(blogUrl)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(blogUrl)}</guid>`,
        `      <description>${escapeXml(description)}</description>`,
        `      <pubDate>${pubDate.toUTCString()}</pubDate>`,
        `      <atom:updated>${updatedDate.toISOString()}</atom:updated>`,
        `      <dc:creator>${escapeXml(author)}</dc:creator>`,
        categoriesXml,
        imageXml,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Koop India Insights | Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Expert advice, business compliance guides, startup consulting insights, and actionable growth strategies from Koop India.</description>
    <language>en-us</language>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/favican.png</url>
      <title>Koop India Insights | Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
