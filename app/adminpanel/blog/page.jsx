"use client";
import { useState } from "react";
import {
  FileText, Plus, Search, Eye, Edit2, Trash2,
  CheckCircle2, Clock, XCircle, Tag, Calendar,
  User, TrendingUp, BookOpen,
} from "lucide-react";

const initialPosts = [
  { id: 1, title: "How to Register Your GST in 2025: Complete Guide", category: "Business Compliance", status: "Published", author: "Koop India", views: 3421, tags: ["GST", "Tax", "Business"], date: "2025-06-10", readTime: "8 min" },
  { id: 2, title: "Top 10 Benefits of Listing Your Buyer on B2B Portals", category: "Buyer Growth", status: "Published", author: "Content Team", views: 2187, tags: ["Buyering", "B2B", "Marketing"], date: "2025-06-15", readTime: "6 min" },
  { id: 3, title: "FSSAI License: Who Needs It and How to Get It Fast", category: "Business Compliance", status: "Published", author: "Koop India", views: 1876, tags: ["FSSAI", "Food", "License"], date: "2025-06-20", readTime: "7 min" },
  { id: 4, title: "E-Commerce vs Informative Website: Which Is Right for Your Buyer?", category: "Digital Growth", status: "Draft", author: "Content Team", views: 0, tags: ["Website", "E-Commerce", "Strategy"], date: "2025-07-01", readTime: "5 min" },
  { id: 5, title: "How Distributors Can Find Quality Buyers on Koop India", category: "Distribution", status: "Published", author: "Koop India", views: 986, tags: ["Distribution", "B2B", "Sourcing"], date: "2025-06-25", readTime: "4 min" },
  { id: 6, title: "Trademark Registration: Protect Your Business Identity", category: "Business Compliance", status: "Draft", author: "Legal Team", views: 0, tags: ["Trademark", "Legal", "Buyer"], date: "2025-07-05", readTime: "9 min" },
];

const categories = ["All", "Business Compliance", "Buyer Growth", "Digital Growth", "Distribution"];
const statusConfig = {
  Published: { color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
  Draft: { color: "text-amber-600", bg: "bg-amber-50 border-amber-200", icon: Clock },
};

export default function BlogPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", category: "Business Compliance", tags: "" });

  const filtered = posts.filter((p) => {
    const s = search.toLowerCase();
    const match = p.title.toLowerCase().includes(s) || p.category.toLowerCase().includes(s);
    const matchCat = filterCat === "All" || p.category === filterCat;
    const matchStatus = filterStatus === "All" || p.status === filterStatus;
    return match && matchCat && matchStatus;
  });

  const handleAdd = () => {
    if (!newPost.title) return;
    setPosts([...posts, {
      id: posts.length + 1,
      ...newPost,
      status: "Draft",
      author: "Admin",
      views: 0,
      tags: newPost.tags.split(",").map(t => t.trim()).filter(Boolean),
      date: new Date().toISOString().split("T")[0],
      readTime: "5 min",
    }]);
    setShowModal(false);
    setNewPost({ title: "", category: "Business Compliance", tags: "" });
  };

  const totalViews = posts.reduce((a, b) => a + b.views, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Blog Manager</h1>
          <p className="text-gray-500 text-sm">Create and manage blog posts for SEO and buyer awareness.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20"
        >
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Posts", value: posts.length, color: "text-gray-900", icon: FileText },
          { label: "Published", value: posts.filter(p => p.status === "Published").length, color: "text-emerald-600", icon: CheckCircle2 },
          { label: "Drafts", value: posts.filter(p => p.status === "Draft").length, color: "text-amber-600", icon: Clock },
          { label: "Total Views", value: totalViews.toLocaleString(), color: "text-orange-500", icon: TrendingUp },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <Icon size={14} className={c.color} />
                <p className={`text-xl font-extrabold ${c.color}`}>{c.value}</p>
              </div>
              <p className="text-gray-400 text-xs mt-1">{c.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl pl-9 pr-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100 shadow-sm"
          />
        </div>
        {["All", "Published", "Draft"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all ${filterStatus === s ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20" : "border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 bg-white shadow-sm"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${filterCat === c ? "bg-violet-100 border-violet-300 text-violet-600" : "border-gray-200 text-gray-500 hover:text-gray-900 bg-white shadow-sm"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((post) => {
          const cfg = statusConfig[post.status];
          const Icon = cfg.icon;
          return (
            <div key={post.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-violet-200 hover:shadow-md transition-all group shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-semibold bg-violet-50 text-violet-600 border border-violet-200 px-2 py-0.5 rounded-md">
                  {post.category}
                </span>
                <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
                  <Icon size={9} /> {post.status}
                </span>
              </div>

              <h3 className="text-gray-900 font-bold text-sm leading-snug mb-3 group-hover:text-orange-500 transition-colors">
                {post.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-gray-400 text-[10px] mb-3">
                <span className="flex items-center gap-1"><User size={9} /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar size={9} /> {post.date}</span>
                <span className="flex items-center gap-1"><BookOpen size={9} /> {post.readTime}</span>
                {post.views > 0 && (
                  <span className="flex items-center gap-1 text-orange-500 font-semibold">
                    <TrendingUp size={9} /> {post.views.toLocaleString()} views
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-semibold bg-gray-100 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-orange-50 hover:bg-orange-500 text-orange-500 hover:text-white text-xs font-bold py-2 rounded-lg transition-all border border-orange-200 hover:border-orange-500">
                  <Edit2 size={12} /> Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-bold py-2 rounded-lg transition-all border border-gray-200">
                  <Eye size={12} /> Preview
                </button>
                <button className="w-8 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-all border border-red-200">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-gray-900 font-bold text-lg mb-5">Create New Blog Post</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-500 text-xs font-semibold block mb-1.5">Post Title *</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter a compelling title..."
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100"
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs font-semibold block mb-1.5">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100"
                >
                  {categories.filter(c => c !== "All").map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-500 text-xs font-semibold block mb-1.5">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  placeholder="GST, Tax, Business"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold hover:text-gray-900 hover:border-gray-300 transition-colors bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all shadow-md shadow-orange-500/20"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
