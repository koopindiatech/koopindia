"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

// ─── Legacy block-based renderer (backward compat) ────────────────────────────
function renderFormattedText(text) {
  if (!text) return "";
  let formatted = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-950">$1</strong>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-slate-800">$1</em>');
  return formatted;
}

function LegacyBlockRenderer({ blocks }) {
  return (
    <div className="space-y-6 text-slate-800 leading-relaxed text-md sm:text-lg">
      {blocks.map((block) => {
        const htmlContent = block.type !== "image" ? renderFormattedText(block.value) : "";
        switch (block.type) {
          case "heading":
            return <h2 key={block.id} className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight pt-4 mt-6 mb-2" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
          case "paragraph":
            return <p key={block.id} className="text-slate-700 font-normal leading-8 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
          case "bullet-list":
            return (
              <ul key={block.id} className="list-disc pl-6 space-y-2 text-slate-700 leading-7 my-4">
                {block.value.split("\n").map((item, i) => item.trim() && <li key={i} dangerouslySetInnerHTML={{ __html: renderFormattedText(item) }} />)}
              </ul>
            );
          case "ordered-list":
            return (
              <ol key={block.id} className="list-decimal pl-6 space-y-2 text-slate-700 leading-7 my-4">
                {block.value.split("\n").map((item, i) => item.trim() && <li key={i} dangerouslySetInnerHTML={{ __html: renderFormattedText(item) }} />)}
              </ol>
            );
          case "image":
            return (
              <div key={block.id} className="my-6 relative w-full aspect-[16/7.5] md:aspect-[16/7] rounded-xl overflow-hidden shadow-md border border-slate-100 bg-slate-50">
                <Image src={block.value} alt="Blog inline illustration" fill sizes="(max-w-6xl) 100vw, 800px" className="object-cover object-center" />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      try {
        const snapshot = await getDoc(doc(db, "blogs", slug));
        if (snapshot.exists()) {
          const data = snapshot.data();
          setBlog(data);
          document.title = data.seo?.metaTitle || data.title || "Blog";
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
        <div className="w-full max-w-4xl space-y-4 animate-pulse">
          <div className="h-8 bg-slate-200 rounded-lg w-3/4 mx-auto" />
          <div className="h-[400px] bg-slate-200 rounded-2xl w-full my-8" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-slate-200 rounded w-full" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center py-20 px-4">
        <p className="text-6xl mb-4">📄</p>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Blog Post Not Found</h2>
        <p className="text-slate-500 mb-6">This article may have been moved or deleted.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 bg-[#F97316] text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white text-slate-900 selection:bg-orange-100">

      {/* ── Header ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 text-center">

        {/* Keywords / Tags */}
        {blog.seo?.focusKeywords?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {blog.seo.focusKeywords.map((keyword, i) => (
              <span key={i} className="text-xs font-semibold uppercase tracking-wider bg-orange-50 text-[#F97316] px-3 py-1 rounded-full border border-orange-100">
                #{keyword}
              </span>
            ))}
          </div>
        )}

        {/* Categories */}
        {blog.categories?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {blog.categories.map((cat, i) => (
              <span key={i} className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl  font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center justify-center flex-wrap gap-3 text-sm text-slate-500 border-b border-slate-100 pb-8">
          <span className="font-semibold text-slate-700">By {blog.author || "Team Koop India"}</span>
          <span className="text-slate-300">•</span>
          <time dateTime={blog.date}>
            {blog.date
              ? new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
              : "Recent Post"}
          </time>
        </div>
      </div>

      {/* ── Cover Image ── */}
      {blog.imageUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 my-8">
          <div className="relative aspect-[16/7] md:aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-xl border border-slate-100 bg-slate-50">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              priority
              className="object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">

        {/* Excerpt / Description */}
        {blog.description && (
          <p className="text-xl font-medium text-slate-600 leading-relaxed italic border-l-4 border-[#F97316] pl-5 mb-10 bg-orange-50/40 py-3 pr-4 rounded-r-xl">
            {blog.description}
          </p>
        )}

        {/* ─ NEW FORMAT: bodyContent (HTML from WYSIWYG editor) ─ */}
        {blog.bodyContent ? (
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.bodyContent }}
          />
        ) : blog.bodyContentBlocks?.length > 0 ? (
          /* ─ OLD FORMAT: legacy block array ─ */
          <LegacyBlockRenderer blocks={blog.bodyContentBlocks} />
        ) : blog.content ? (
          /* ─ OLDEST FORMAT: plain content field ─ */
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
        ) : (
          <p className="text-slate-400 text-center py-10">No content available.</p>
        )}
      </div>

      {/* ── Back Link ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 border-t border-slate-100 pt-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#F97316] font-bold text-sm hover:text-orange-600 transition">
          ← Back to All Articles
        </Link>
      </div>

      {/* ── Blog Content Global Styles ── */}
      <style jsx global>{`
        /* ─ Core body typography ─ */
        .blog-content {
          font-size: 1.0625rem;
          line-height: 1.9;
          color: #334155;
        }

        /* ─ Headings ─ */
        .blog-content h1 { font-size: 2.1rem; font-weight: 800; color: #0f172a; margin: 2rem 0 0.75rem; line-height: 1.2; }
        .blog-content h2 { font-size: 1.6rem; font-weight: 700; color: #1e293b; margin: 1.8rem 0 0.6rem; padding-left: 0.9rem; border-left: 4px solid #F97316; }
        .blog-content h3 { font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 1.4rem 0 0.5rem; }
        .blog-content h4 { font-size: 1.05rem; font-weight: 600; color: #334155; margin: 1rem 0 0.4rem; }
        .blog-content h5, .blog-content h6 { font-size: 0.95rem; font-weight: 600; color: #475569; margin: 0.8rem 0 0.3rem; }

        /* ─ Paragraph ─ */
        .blog-content p { margin: 0.75rem 0; }

        /* ─ Lists ─ */
        .blog-content ul { list-style: disc; padding-left: 1.75rem; margin: 0.75rem 0; }
        .blog-content ol { list-style: decimal; padding-left: 1.75rem; margin: 0.75rem 0; }
        .blog-content li { margin: 0.35rem 0; color: #475569; line-height: 1.75; }

        /* ─ Blockquote ─ */
        .blog-content blockquote {
          border-left: 4px solid #0ea5e9;
          padding: 0.9rem 1.2rem;
          background: #f0f9ff;
          border-radius: 0 0.6rem 0.6rem 0;
          margin: 1.25rem 0;
          color: #0369a1;
          font-style: italic;
        }
        .blog-content blockquote cite { display: block; font-size: 0.8rem; margin-top: 0.4rem; color: #0284c7; font-style: normal; }

        /* ─ HR ─ */
        .blog-content hr { border: none; border-top: 2px solid #e2e8f0; margin: 2rem 0; }

        /* ─ Links ─ */
        .blog-content a, .blog-content .blog-link {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
          cursor: pointer;
          transition: color 0.15s;
        }
        .blog-content a:hover { color: #F97316; }

        /* ─ Inline formatting ─ */
        .blog-content b, .blog-content strong { font-weight: 700; color: #1e293b; }
        .blog-content i, .blog-content em { font-style: italic; }
        .blog-content u { text-decoration: underline; }
        .blog-content s, .blog-content strike { text-decoration: line-through; color: #94a3b8; }

        /* ─ Code / Pre ─ */
        .blog-content code {
          background: #f1f5f9;
          color: #c026d3;
          padding: 0.15rem 0.4rem;
          border-radius: 0.3rem;
          font-size: 0.875rem;
          font-family: ui-monospace, monospace;
        }
        .blog-content pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1.2rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.25rem 0;
          font-size: 0.875rem;
          font-family: ui-monospace, monospace;
          line-height: 1.7;
        }

        /* ─ Figures / Images inserted in editor ─ */
        .blog-content .blog-figure, .blog-content figure {
          margin: 1.5rem auto;
          text-align: center;
        }
        .blog-content .blog-img, .blog-content figure img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
        }
        .blog-content .blog-figcaption, .blog-content figcaption {
          font-size: 0.8rem;
          color: #94a3b8;
          margin-top: 0.5rem;
          font-style: italic;
        }

        /* ─ Text alignment ─ */
        .blog-content [style*="text-align: center"] { text-align: center; }
        .blog-content [style*="text-align: right"] { text-align: right; }
        .blog-content [style*="text-align: justify"] { text-align: justify; }
      `}</style>
    </article>
  );
}
