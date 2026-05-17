"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

// Helper function to safely parse **bold** and *italic* markers without storing raw HTML in DB
function renderFormattedText(text) {
  if (!text) return "";
  let formatted = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Transform Markdown **text** -> <strong>text</strong>
  formatted = formatted.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold text-slate-950">$1</strong>',
  );
  // Transform Markdown *text* -> <em>text</em>
  formatted = formatted.replace(
    /\*(.*?)\*/g,
    '<em class="italic text-slate-800">$1</em>',
  );

  return formatted;
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", slug);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setBlog(data);

          if (data.seo?.metaTitle || data.title) {
            document.title = data.seo?.metaTitle || data.title;
          }
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
        <div className="w-full max-w-6xl space-y-4 animate-pulse">
          <div className="h-8 bg-slate-200 rounded-lg w-3/4 mx-auto"></div>
          <div className="h-[400px] bg-slate-200 rounded-2xl w-full my-8"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-3xl font-extrabold text-slate-800">
          Blog Post Not Found
        </h2>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white text-slate-900 selection:bg-orange-100">
      {/* Blog Top Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 text-center">
        {blog.seo?.focusKeywords && blog.seo.focusKeywords.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {blog.seo.focusKeywords.map((keyword, index) => (
              <span
                key={index}
                className="text-xs font-semibold uppercase tracking-wider bg-orange-50 text-[#fc8f41] px-3 py-1 rounded-full border border-orange-100"
              >
                #{keyword}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight max-w-6xl mx-auto">
          {blog.title}
        </h1>

        <div className="flex items-center justify-center gap-3 text-sm text-slate-500 border-b border-slate-100 pb-8 max-w-md mx-auto">
          <span className="font-semibold text-slate-700">
            By {blog.author || "Anonymous"}
          </span>
          <span className="text-slate-300">•</span>
          <time dateTime={blog.date}>
            {blog.date
              ? new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Recent Post"}
          </time>
        </div>
      </div>

      {/* Main Cover Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 my-8">
        <div className="relative aspect-[16/7] md:aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-xl border border-slate-100/60 bg-slate-50">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            priority
            className="object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* Core Body Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {blog.description && (
          <p className="text-xl font-medium text-slate-600 leading-relaxed italic border-l-4 border-[#fc8f41] pl-4 mb-10">
            {blog.description}
          </p>
        )}

        {/* Dynamic Mapping and Safe Formatting Element Engine */}
        <div className="space-y-6 text-slate-800 leading-relaxed text-md sm:text-lg">
          {blog.bodyContentBlocks && blog.bodyContentBlocks.length > 0
            ? blog.bodyContentBlocks.map((block) => {
                // Formatting raw text strings safely
                const htmlContent =
                  block.type !== "image"
                    ? renderFormattedText(block.value)
                    : "";

                switch (block.type) {
                  case "heading":
                    return (
                      <h2
                        key={block.id}
                        className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight pt-4 mt-6 mb-2"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                      />
                    );

                  case "paragraph":
                    return (
                      <p
                        key={block.id}
                        className="text-slate-700 font-normal leading-8 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                      />
                    );

                  case "bullet-list":
                    return (
                      <ul
                        key={block.id}
                        className="list-disc pl-6 space-y-2 text-slate-700 leading-7 my-4"
                      >
                        {block.value.split("\n").map(
                          (item, i) =>
                            item.trim() && (
                              <li
                                key={i}
                                dangerouslySetInnerHTML={{
                                  __html: renderFormattedText(item),
                                }}
                              />
                            ),
                        )}
                      </ul>
                    );

                  case "ordered-list":
                    return (
                      <ol
                        key={block.id}
                        className="list-decimal pl-6 space-y-2 text-slate-700 leading-7 my-4"
                      >
                        {block.value.split("\n").map(
                          (item, i) =>
                            item.trim() && (
                              <li
                                key={i}
                                dangerouslySetInnerHTML={{
                                  __html: renderFormattedText(item),
                                }}
                              />
                            ),
                        )}
                      </ol>
                    );

                  case "image":
                    return (
                      <div
                        key={block.id}
                        className="my-6 relative w-full aspect-[16/7.5] md:aspect-[16/7] rounded-xl overflow-hidden shadow-md border border-slate-100 bg-slate-50"
                      >
                        <Image
                          src={block.value}
                          alt="Blog inline illustration"
                          fill
                          sizes="(max-w-6xl) 100vw, 800px"
                          className="object-cover object-center transform hover:scale-[1.01] transition-transform duration-500"
                        />
                      </div>
                    );

                  default:
                    return null;
                }
              })
            : blog.content && (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              )}
        </div>
      </div>
    </article>
  );
}
