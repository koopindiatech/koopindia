"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs, addDoc, limit } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  Send,
  User,
  Mail,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

// Filter out keyword-stuffing / spammy tag cloud appended at the end of blogs
function isKeywordStuffing(text) {
  if (!text) return false;
  const clean = text.replace(/<[^>]*>/g, "").trim();
  const commas = (clean.match(/,/g) || []).length;
  if (commas < 5) return false;

  const parts = clean.split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length < 6) return false;

  const rawWords = clean.split(/\s+/);
  const wordFreq = {};
  for (const w of rawWords) {
    const cleanWord = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (cleanWord.length > 3) {
      wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
    }
  }
  const maxWordRepeat = Math.max(0, ...Object.values(wordFreq));
  const capitalizedWords = rawWords.filter((w) => /^[A-Z]/.test(w)).length;
  const capRatio = capitalizedWords / Math.max(rawWords.length, 1);

  return maxWordRepeat >= 3 || capRatio > 0.6;
}

function cleanBlogHtml(html) {
  if (!html || typeof html !== "string") return html;

  // 1. Remove enclosing tags (like <p>, <div>, <span>, <small>) that match keyword stuffing
  let cleaned = html.replace(
    /<(p|div|section|span|h[1-6]|small)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag, attrs, inner) => {
      if (isKeywordStuffing(inner)) {
        return "";
      }
      return match;
    }
  );

  // 2. Also check if the trailing string after the last closing tag is keyword stuffing
  const lastCloseTag = cleaned.lastIndexOf(">");
  if (lastCloseTag !== -1 && lastCloseTag < cleaned.length - 1) {
    const trailingText = cleaned.slice(lastCloseTag + 1).trim();
    if (isKeywordStuffing(trailingText)) {
      cleaned = cleaned.slice(0, lastCloseTag + 1);
    }
  } else if (lastCloseTag === -1 && isKeywordStuffing(cleaned)) {
    cleaned = "";
  }

  return cleaned.trim();
}

// Legacy block-based renderer for backward compatibility
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
  if (!blocks || !Array.isArray(blocks)) return null;
  const filteredBlocks = blocks.filter((b) => !isKeywordStuffing(b.value));
  return (
    <div className="space-y-6 text-slate-800 leading-relaxed text-md sm:text-lg">
      {filteredBlocks.map((block) => {
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
              <div key={block.id} className="my-6 relative w-full aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden shadow-md border border-slate-100 bg-slate-50">
                <Image src={block.value} alt="Blog inline illustration" fill sizes="(max-w-6xl) 100vw, 800px" className="object-contain object-center" />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// Relative date helper for comments
function formatCommentDate(dateString) {
  if (!dateString) return "Just now";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recently";
    const now = new Date();
    const diffSecs = Math.floor((now - date) / 1000);
    if (diffSecs < 60) return "Just now";
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
    if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
    if (diffSecs < 604800) return `${Math.floor(diffSecs / 86400)}d ago`;

    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recently";
  }
}

// Initials avatar generator
function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const avatarGradients = [
  "from-orange-500 to-amber-500",
  "from-blue-600 to-indigo-600",
  "from-emerald-600 to-teal-600",
  "from-purple-600 to-pink-600",
  "from-rose-500 to-orange-500",
  "from-cyan-600 to-blue-600",
];

function getAvatarGradient(name) {
  let hash = 0;
  for (let i = 0; i < (name || "").length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarGradients[Math.abs(hash) % avatarGradients.length];
}

export default function BlogDetailClient({ initialBlog, initialRelatedBlogs = [], slug }) {
  const [blog, setBlog] = useState(initialBlog || null);
  const [loading, setLoading] = useState(!initialBlog);

  // Related Blogs state
  const [relatedBlogs, setRelatedBlogs] = useState(initialRelatedBlogs || []);

  // Comments state
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // 1. Fetch blog if not passed via SSR
  useEffect(() => {
    if (initialBlog) {
      setBlog(initialBlog);
      setLoading(false);
      return;
    }
    if (!slug) return;
    const fetchBlog = async () => {
      try {
        let data = null;
        const snapshot = await getDoc(doc(db, "blogs", slug));
        if (snapshot.exists()) {
          data = snapshot.data();
        } else {
          const q = query(collection(db, "blogs"), where("slug", "==", slug));
          const qSnap = await getDocs(q);
          if (!qSnap.empty) {
            data = qSnap.docs[0].data();
          }
        }
        if (data) {
          setBlog(data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug, initialBlog]);

  // 2. Fetch related blogs client-side fallback if empty
  useEffect(() => {
    if (relatedBlogs && relatedBlogs.length > 0) return;
    const fetchRelated = async () => {
      try {
        const q = query(collection(db, "blogs"), limit(10));
        const snap = await getDocs(q);
        const list = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((b) => (b.slug || b.id) !== slug && b.id !== (blog?.id || ""));
        if (list.length > 0) {
          setRelatedBlogs(list.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching client related blogs:", err);
      }
    };
    fetchRelated();
  }, [slug, blog, relatedBlogs]);

  // 3. Fetch comments for this blog slug
  useEffect(() => {
    if (!slug) return;
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const q = query(
          collection(db, "blog_comments"),
          where("blogSlug", "==", slug)
        );
        const snap = await getDocs(q);
        const list = snap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        // Sort in memory by createdAt descending
        list.sort((a, b) => {
          const tA = new Date(a.createdAt || a.date || 0).getTime();
          const tB = new Date(b.createdAt || b.date || 0).getTime();
          return tB - tA;
        });

        setComments(list);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [slug]);

  // 4. Handle comment submit
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) {
      setSubmitError("Please fill in your name and comment.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const newCommentData = {
        blogSlug: slug,
        blogId: blog?.id || slug,
        blogTitle: blog?.title || "",
        name: authorName.trim(),
        email: authorEmail.trim() || null,
        comment: commentText.trim(),
        createdAt: new Date().toISOString(),
        status: "approved",
      };

      const docRef = await addDoc(collection(db, "blog_comments"), newCommentData);
      const savedComment = { id: docRef.id, ...newCommentData };

      // Also persist to subcollection blogs/{blogId}/comments if doc ID exists
      if (blog?.id) {
        try {
          await addDoc(collection(db, "blogs", blog.id, "comments"), newCommentData);
        } catch (_) {}
      }

      // Optimistic update
      setComments((prev) => [savedComment, ...prev]);
      setAuthorName("");
      setAuthorEmail("");
      setCommentText("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error("Error posting comment:", err);
      setSubmitError("Could not submit comment. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
        <div className="w-full max-w-4xl space-y-4 animate-pulse">
          <div className="h-8 bg-slate-200 rounded-lg w-3/4 mx-auto" />
          <div className="h-[400px] bg-slate-200 rounded-2xl w-full my-8" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-slate-200 rounded w-full" />
            ))}
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

        {/* Keywords / Tags (Commented out) */}
        {/*
        {blog.seo?.focusKeywords?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {blog.seo.focusKeywords.map((keyword, i) => (
              <span key={i} className="text-xs font-semibold uppercase tracking-wider bg-orange-50 text-[#F97316] px-3 py-1 rounded-full border border-orange-100">
                #{keyword}
              </span>
            ))}
          </div>
        )}
        */}

        {blog.categories?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {blog.categories.map((cat, i) => (
              <span key={i} className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center justify-center flex-wrap gap-3 text-sm text-slate-500 border-b border-slate-100 pb-8">
          <span className="font-semibold text-slate-700">By {blog.author || "Team Koop India"}</span>
          <span className="text-slate-300">•</span>
          <time dateTime={blog.date}>
            {blog.date && !isNaN(new Date(blog.date).getTime())
              ? new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
              : (blog.date || "Recent Post")}
          </time>
        </div>
      </div>

      {/* ── Cover Image ── */}
      {blog.imageUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 my-8">
          <div className="relative h-[320px] sm:h-[450px] md:h-[600px] w-full overflow-hidden rounded-2xl shadow-xl border border-slate-100 bg-slate-50">
            <Image
              src={blog.imageUrl}
              alt={blog.title || "Blog cover image"}
              fill
              priority
              className="object-contain object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">

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
            dangerouslySetInnerHTML={{ __html: cleanBlogHtml(blog.bodyContent) }}
          />
        ) : blog.bodyContentBlocks?.length > 0 ? (
          /* ─ OLD FORMAT: legacy block array ─ */
          <LegacyBlockRenderer blocks={blog.bodyContentBlocks} />
        ) : blog.content ? (
          /* ─ OLDEST FORMAT: plain content field ─ */
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: cleanBlogHtml(blog.content) }} />
        ) : (
          <p className="text-slate-400 text-center py-10">No content available.</p>
        )}
      </div>

      {/* ── COMMENTS & DISCUSSION SECTION ── */}
      <section className="bg-white border-t border-slate-200/80 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316]">
                <MessageSquare size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Comments &amp; Discussion
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Share your thoughts, ask questions, or join the discussion
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full">
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </span>
          </div>

          {/* Comment Form Card */}
          <div className="bg-gradient-to-br from-slate-50 via-white to-orange-50/20 rounded-2xl p-6 sm:p-8 border border-orange-100/80 mb-12 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Leave a Reply
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Your email address will not be published. Required fields are marked *
            </p>

            {submitSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-sm animate-fadeIn">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                <span className="font-semibold">
                  Thank you! Your comment has been posted successfully.
                </span>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Email <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-slate-200 focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Comment <span className="text-orange-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your thoughts, feedback, or ask a question about this article..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-4 text-sm bg-white rounded-xl border border-slate-200 focus:border-[#F97316] focus:ring-2 focus:ring-orange-100 outline-none transition resize-y"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Posting Comment...</span>
                    </>
                  ) : (
                    <>
                      <span>Post Comment</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>All Comments</span>
              <span className="text-xs text-slate-400 font-normal">({comments.length})</span>
            </h3>

            {loadingComments ? (
              <div className="space-y-3 py-4">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse flex gap-3.5 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-1/4" />
                      <div className="h-3 bg-slate-200 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 px-4 bg-slate-50/70 border border-dashed border-slate-200 rounded-2xl">
                <div className="w-12 h-12 mx-auto rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center mb-3">
                  <MessageSquare size={22} />
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  No comments yet
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Be the first to share your thoughts or ask a question about this article!
                </p>
              </div>
            ) : (
              comments.map((c, index) => (
                <div
                  key={c.id || index}
                  className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs transition hover:border-orange-200"
                >
                  <div className="flex items-start gap-3.5">
                    {/* User Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarGradient(c.name)} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {getInitials(c.name)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="font-bold text-sm text-slate-900 truncate">
                          {c.name}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium inline-flex items-center gap-1">
                          <Clock size={11} className="text-slate-400" />
                          {formatCommentDate(c.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {c.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── RELATED BLOGS SECTION ── */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200/70 py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F97316] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full mb-2">
                  <Sparkles size={13} />
                  <span>Recommended Reads</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Related Articles
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Explore more expert insights, business compliance tips &amp; growth guides
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F97316] hover:text-orange-600 transition group self-start sm:self-auto"
              >
                <span>View All Articles</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.id || item.slug}
                  href={`/blog/${item.slug || item.id}`}
                  className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Card Image */}
                  <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title || "Related article"}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6 text-center">
                        <span className="text-white/70 font-extrabold text-sm uppercase tracking-wider">
                          {item.categories?.[0] || "Koop India Insights"}
                        </span>
                      </div>
                    )}
                    {item.categories?.[0] && (
                      <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide bg-white/95 text-slate-800 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-xs border border-slate-100">
                        {item.categories[0]}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-[#F97316] transition-colors line-clamp-2 mb-2 leading-snug">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar size={13} className="text-slate-400" />
                        {item.date && !isNaN(new Date(item.date).getTime())
                          ? new Date(item.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
                          : (item.date || "Recent")}
                      </span>
                      <span className="text-[#F97316] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read More <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back Link ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 border-t border-slate-100">
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
