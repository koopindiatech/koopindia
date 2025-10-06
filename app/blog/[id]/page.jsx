"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setBlog(docSnap.data());
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-8">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{blog.title}</h1>
        <p className="text-gray-500 font-bold text-sm mb-6">
          {new Date(blog.date).toDateString()} • By {blog.author}
        </p>
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
