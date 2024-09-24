import NewsCard from "@/components/NewsCard";
import db from "@/db/db";
import BlogDelete from "./BlogDelete";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit } from "lucide-react";
const AdminBlogsPage = async () => {
  const blogs = await db.blogs.findMany();

  return (
    <div>
      <h1>Admin Blogs Page</h1>
      <Button asChild className="m-2">
        <Link href="./blogs/add">Add blog</Link>
      </Button>
      {blogs.length == 0 ? (
        <div>No blog found</div>
      ) : (
        blogs.map((blog, i) => (
          <div key={i}>
            <div className="absolute z-10 p-1 flex gap-10">
              <BlogDelete id={blog.id} />
              <Button variant="secondary" asChild>
                <Link href={`./blogs/${blog.id}/edit`}>
                  <Edit />
                </Link>
              </Button>
            </div>
            <NewsCard
              title={blog.title}
              description={blog.description}
              picture={blog.picturePaths}
              date={blog.date}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default AdminBlogsPage;
