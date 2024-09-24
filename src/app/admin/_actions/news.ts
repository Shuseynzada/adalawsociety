"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ref, deleteObject } from "firebase/storage";
import { storage, uploadImagesToStorage } from "@/lib/firebase";

// Zod Schemas
const fileScheme = z.instanceof(File, { message: "Required" });
const imageScheme = z.array(
  fileScheme.refine((file) => file.size > 0 && file.type.startsWith("image/"), {
    message: "Each file must be a valid image.",
  })
);

// Schema for adding news
const addScheme = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  images: imageScheme.nonempty("At least one image is required"),
});

// Schema for editing news
const editSchema = addScheme.extend({
  images: imageScheme.optional(),
  removedImages: z.array(z.string()).optional(),
});

// Add News Action
export async function addNews(prevState: unknown, formData: FormData) {
  const result = addScheme.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    images: Array.from(formData.getAll("images")), // Extract images from formData
  });

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // Cast the images to an array of Files
  const images = data.images as File[];

  try {
    // Upload all images to Firebase Storage
    const imageUrls = await uploadImagesToStorage(images, "news");

    // Save the news entry to the database
    await db.news.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        picturePaths: imageUrls, // Save the image URLs
      },
    });

    revalidatePath(`/`);
    revalidatePath(`/admin/news`);
    revalidatePath(`/news`);
  } catch (error) {
    return error
  }
  redirect("/admin/news");
}

// Delete News Action
// Delete News Action
export async function deleteNews(id: string) {
  const news = await db.news.findUnique({ where: { id } });

  if (!news) return notFound();

  try {
    // Delete each image from Firebase Storage
    for (const imagePath of news.picturePaths) {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef).catch((error) => {
        console.error("Error deleting image from Firebase Storage:", error);
      });
    }

    // Delete the news entry from the database
    await db.news.delete({ where: { id } });

    // Revalidate paths to ensure fresh data
    revalidatePath(`/`);
    revalidatePath(`/admin/news`);
    revalidatePath(`/news`);
  } catch (error) {
    console.error("Error deleting news:", error);
    return error;  // Return the error for client-side handling if needed
  }

  // Perform the redirect outside the try-catch
  redirect("/admin/news");
}


// Update News Action
// Update News Action
export async function updateNews(id: string, prevState: unknown, formData: FormData) {
  const result = editSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    images: Array.from(formData.getAll("images")), // Extract new images if any
    removedImages: Array.from(formData.getAll("removedImages[]")), // Removed images
  });

  // Handle validation errors
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const news = await db.news.findUnique({ where: { id } });

  if (!news) return notFound();

  let picturePaths = news.picturePaths;

  try {
    // Handle removed images
    if (data.removedImages && data.removedImages.length > 0) {
      for (const removedImagePath of data.removedImages) {
        const imageRef = ref(storage, removedImagePath);
        try {
          await deleteObject(imageRef);
          console.log(`Deleted image: ${removedImagePath}`);
        } catch (error) {
          console.error("Error deleting removed image from Firebase:", error);
        }
      }
      picturePaths = picturePaths.filter((imagePath) => !data.removedImages?.includes(imagePath));
    }

    // Handle newly added images (upload to Firebase)
    if (data.images && data.images.length > 0) {
      try {
        const newImageUrls = await uploadImagesToStorage(data.images as File[], "news");
        picturePaths = [...picturePaths, ...newImageUrls];
      } catch (error) {
        console.error("Error uploading new images:", error);
      }
    }

    // Update the news entry in the database
    await db.news.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        picturePaths, // Updated picture paths
      },
    });

    // Revalidate paths to ensure fresh data
    revalidatePath(`/`);
    revalidatePath(`/admin/news`);
    revalidatePath(`/news`);

  } catch (error) {
    console.error("Error updating news entry:", error);
    return error;  // Return error for client-side handling
  }

  // Perform the redirect outside the try-catch
  redirect("/admin/news");
}
