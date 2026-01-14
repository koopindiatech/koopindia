"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", slug);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setBlog(snapshot.data());
      }

      setLoading(false);
    };

    fetchBlog();
  }, [slug]);

  if (!slug) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">
          Invalid blog URL (slug missing)
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl">Loading blog...</h2>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Blog not found</h2>
      </div>
    );
  }

  return (
    <article className="bg-white">
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          width={1200}
          height={600}
          className="w-full rounded-xl shadow object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl text-gray-900 font-bold mb-3">
          "{blog.title}"
        </h1>

        <p className="text-gray-800 text-md mb-8">
          By <strong>"{blog.author}</strong>" •{" "}
          {new Date(blog.date).toDateString()}
        </p>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}
