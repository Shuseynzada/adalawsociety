"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Schema for adding blog
const addSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  summary: z.string().optional(),
  author: z.string().min(1),
  date: z.string().min(1), // will convert to Date later
});

// Add Blog Action
export async function addBlog(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    summary: formData.get("summary") ?? undefined,
    author: formData.get("author"),
    date: formData.get("date"),
  });

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    await db.blogs.create({
      data: {
        title: data.title,
        description: data.description,
        summary: data.summary,
        author: data.author,
        date: new Date(data.date),
        commentCount: 0,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
  } catch (error) {
    console.error("Error adding blog:", error);
  }

  redirect("/admin/blogs");
}

// Delete Blog Action
export async function deleteBlog(id: string) {
  const blog = await db.blogs.findUnique({ where: { id: Number(id) } });
  if (!blog) return notFound();

  try {
    await db.blogs.delete({ where: { id: Number(id) } });
    revalidatePath("/");
    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
  } catch (error) {
    console.error("Error deleting blog:", error);
  }

  redirect("/admin/blogs");
}

// Update Blog Action
export async function updateBlog(id: string, prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    summary: formData.get("summary") ?? undefined,
    author: formData.get("author"),
    date: formData.get("date"),
  });

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const blog = await db.blogs.findUnique({ where: { id: Number(id) } });
  if (!blog) return notFound();

  try {
    await db.blogs.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        description: data.description,
        summary: data.summary,
        author: data.author,
        date: new Date(data.date),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
  } catch (error) {
    console.error("Error updating blog:", error);
  }

  redirect("/admin/blogs");
}
