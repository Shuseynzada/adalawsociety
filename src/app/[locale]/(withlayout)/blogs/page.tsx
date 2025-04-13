// app/blogs/page.tsx
import db from "@/db/db";
import BlogCard from "@/components/BlogCard";
import { format } from "date-fns";

export default async function BlogsPage() {
  const blogs = await db.blogs.findMany({
    orderBy: { date: "desc" },
  });

  // Group blogs by formatted date (e.g., '10 April 2025')
  const groupedBlogs: Record<string, typeof blogs> = {};
  for (const blog of blogs) {
    const formattedDate = format(new Date(blog.date), "dd MMMM yyyy");
    if (!groupedBlogs[formattedDate]) {
      groupedBlogs[formattedDate] = [];
    }
    groupedBlogs[formattedDate].push(blog);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {Object.entries(groupedBlogs).map(([date, posts]) => (
        <div key={date} className="mb-12">
          <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-6 text-gray-700">
            {date}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard
                id={post.id}
                key={post.id}
                author={post.author}
                title={post.title}
                date={post.date}
                summary={post.summary || post.description.slice(0, 200) + "..."}
                commentCount={post.commentCount || 0}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
