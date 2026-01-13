import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function BlogDetail({ params }) {
  const docRef = doc(db, "blogs", params.slug);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return <p>Blog not found</p>;
  }

  const blog = snapshot.data();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden rounded-lg">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-6">
        By {blog.author} • {blog.date}
      </p>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
