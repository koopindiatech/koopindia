"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { Search } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(data);
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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#141d32] via-[#1c2545] to-[#141d32] text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-5xl font-extrabold">
            Koop India <span className="text-[#F97316]">Insights</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert advice, industry trends, and actionable strategies to help
            your business thrive
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog List */}
      <div className="max-w-6xl mx-auto py-16 px-6 space-y-12">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="md:w-1/2 w-full relative">
                <div className="relative h-[340px] md:h-[280px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-50 shadow-lg">
                  {/* Image */}
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-contain
                    scale-105
                  "
                    />

                  {/* Soft vignette for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </div>

              {/* Right side content */}
              <div className="md:w-1/2 w-full p-8 flex flex-col justify-center relative">
                {/* Date badge */}
                <div className="absolute top-6 right-6 bg-gray-100 rounded-md px-3 py-1 text-center shadow-lg">
                  <p className="text-lg font-bold text-gray-800">
                    {new Date(blog.date).getDate()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(blog.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </p>
                </div>

                {/* <span className="inline-block bg-[#F97316] text-white text-xs font-semibold px-3 py-1 rounded mb-3 w-fit">
                  DISTRIBUTION
                </span> */}

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  "{blog.title}"
                </h2>
                <p className="text-gray-800 text-sm mb-4">
                  By <span className="font-semibold">"{blog.author}"</span>
                </p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {blog.description}
                </p>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="
                  inline-flex
                  items-center
                  gap-1
                  text-orange-500
                  font-semibold
                  group
                "
                >
                  Continue Reading
                  <span
                    className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  >
                    →
                  </span>
                  <span
                    className="
                    absolute
                    bottom-0
                    left-0
                    w-full
                    h-[2px]
                    bg-orange-500
                    scale-x-0
                    origin-left
                    transition-transform
                    duration-300
                    group-hover:scale-x-100
                  "
                  />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No results found for “{searchQuery}”
          </p>
        )}
      </div>
    </div>
  );
}
