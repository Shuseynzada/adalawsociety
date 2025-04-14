// app/admin/blogs/page.tsx
import db from "@/db/db";
import BlogDelete from "./BlogDelete";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit } from "lucide-react";

const AdminBlogsPage = async () => {
  const blogs = await db.blogs.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-[#346178]">Admin Blogs Page</h1>

      <Button asChild className="mb-6">
        <Link href="./blogs/add">Add New Blog</Link>
      </Button>

      {blogs.length === 0 ? (
        <div className="text-gray-600">No blogs found.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="relative p-4 border rounded shadow bg-white">
              <div className="absolute right-4 top-4 flex gap-2 z-10">
                <BlogDelete id={blog.id.toString()} />
                <Button variant="secondary" size="sm" asChild>
                  <Link href={`./blogs/${blog.id}/edit`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <h2 className="text-xl font-semibold text-[#222] mb-2">{blog.title}</h2>
              <p className="text-sm italic text-gray-600">By {blog.author}</p>
              <p className="text-sm mt-2 text-gray-800 line-clamp-3">{blog.summary || "No summary provided"}</p>
              <p className="text-xs mt-2 text-gray-500">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-xs text-gray-500">Comments: {blog.commentCount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlogsPage;
