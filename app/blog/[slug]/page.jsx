import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import BlogDetailClient from "./BlogDetailClient";

function serialize(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;
  if (typeof obj.toMillis === "function") return obj.toMillis();
  if (typeof obj.toDate === "function") return obj.toDate().toISOString();
  if (Array.isArray(obj)) return obj.map(serialize);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, serialize(v)])
  );
}

async function getBlogBySlug(slug) {
  if (!slug) return null;
  try {
    const docSnap = await getDoc(doc(db, "blogs", slug));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    const q = query(collection(db, "blogs"), where("slug", "==", slug));
    const qSnap = await getDocs(q);
    if (!qSnap.empty) {
      const d = qSnap.docs[0];
      return { id: d.id, ...d.data() };
    }
  } catch (error) {
    console.error("Error fetching blog for metadata/ssr:", error);
  }
  return null;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams || {};

  const blog = await getBlogBySlug(slug);

  if (blog) {
    const title = blog.seo?.metaTitle || blog.title || "Blog Post";
    const description =
      blog.seo?.metaDescription ||
      blog.description ||
      "Read expert business insights, compliance guides, and industry trends on Koop India.";
    const imageUrl = blog.imageUrl || blog.coverImage || "https://www.koopindia.com/favican.png";
    const canonicalUrl = `https://www.koopindia.com/blog/${slug}`;

    return {
      title: `${title} | Koop India`,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "Koop India",
        locale: "en_US",
        type: "article",
        publishedTime:
          blog.date ||
          (blog.createdAt?.toDate ? blog.createdAt.toDate().toISOString() : undefined),
        authors: [blog.author || "Koop India"],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  }

  return {
    title: "Koop India Insights | Blog",
    description: "Expert advice, industry trends, and actionable strategies to help your business thrive.",
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams || {};

  const rawBlog = await getBlogBySlug(slug);
  const serializedBlog = serialize(rawBlog);

  return <BlogDetailClient initialBlog={serializedBlog} slug={slug} />;
}
