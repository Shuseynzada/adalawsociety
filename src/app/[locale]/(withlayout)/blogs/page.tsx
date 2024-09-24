// pages/blogs/index.tsx
import BlogCard from "@/components/BlogCard";
import db from "@/db/db"; // Assume Prisma client or another DB client is configured
import { Blogs } from "@prisma/client"; // Import your Prisma Blog type

const BlogsPage = async () => {
  // Fetch all blog posts
  const blogs: Blogs[] = await db.blogs.findMany({
    orderBy: { date: "desc" }, // Order by date
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            date={blog.date}
            picture={blog.picturePaths}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
