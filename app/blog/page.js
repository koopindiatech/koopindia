"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image"; // 🔥 Next.js Image कंपोनेंट इम्पोर्ट किया

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // लेटेस्ट ब्लॉग्स को सबसे ऊपर सॉर्ट करना
        const sortedBlogs = data.sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.date || 0);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.date || 0);
          return dateB - dateA;
        });

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(query) ||
      blog.author?.toLowerCase().includes(query) ||
      blog.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-gradient-to-r from-[#141d32] via-[#1c2545] to-[#141d32] text-white py-13">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-4xl font-extrabold">
            Koop India <span className="text-[#F97316]">Insights</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Expert advice, industry trends, and actionable strategies to help
            your business thrive
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-7">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECOND SECTION: Grid View */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredBlogs.map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.id}
                className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200/60 group cursor-pointer"
              >
                {/* Upper Image Section */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-100">
                  
                  {blog.imageUrl ? (
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title || "Blog Image"}
                      fill
                      sizes="(max-w-768px) 100vw, 600px"
                      priority
                      className="object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                      No Image Available
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 text-center shadow-md min-w-[55px] border border-slate-100 z-10">
                    <p className="text-lg font-black text-slate-800 leading-none">
                      {blog.date ? new Date(blog.date).getDate() : "17"}
                    </p>
                    <p className="text-[11px] font-bold text-slate-500 uppercase mt-1 tracking-wider">
                      {blog.date ? new Date(blog.date).toLocaleString("default", { month: "short" }) : "MAY"}
                    </p>
                  </div>
                </div>

                {/* Lower Content Section */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {blog.seo?.focusKeywords?.[0] && (
                      <span className="inline-block text-[11px] font-bold tracking-wider text-[#F97316] uppercase bg-orange-50 px-2.5 py-1 rounded-md mb-3">
                        {blog.seo.focusKeywords[0]}
                      </span>
                    )}

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 tracking-tight line-clamp-2 group-hover:text-[#F97316] transition-colors duration-200">
                      {blog.title}
                    </h2>
                    
                    <p className="text-slate-500 text-xs font-medium mb-4">
                      By <span className="font-semibold text-slate-700">{blog.author || "Team Koop India"}</span>
                    </p>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {blog.description}
                    </p>
                  </div>

                  {/* Clean Animated Link Text */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-[#F97316] font-bold text-sm tracking-wide group-hover:text-orange-600">
                      Continue Reading
                      <span className="transform group-hover:translate-x-1 transition-transform duration-200 text-base">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-100 rounded-2xl border border-slate-200">
            <p className="text-base text-slate-500 font-medium">
              No results found for “{searchQuery}”
            </p>
          </div>
        )}
      </div>
    </div>
  );
}