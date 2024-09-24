import BlogForm from "../../BlogForm";
import db from "@/db/db";

export default async function EditBlogPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const blog = await db.blogs.findUnique({ where: { id } });

  return (
    <>
      <h1>Edit Blogs</h1>
      <BlogForm blog={blog} />
    </>
  );
}
