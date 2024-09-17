"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

const fileScheme = z.instanceof(File, { message: "Required" });
const imageScheme = fileScheme.refine(file => file.size === 0 || file.type.startsWith("image/"));

const addScheme = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  image: imageScheme.refine(file => file.size > 0, "Required"),
});

async function uploadImageToStorage(file: File): Promise<string> {
  const storageRef = ref(storage, `news/${crypto.randomUUID()}-${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      null,
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

export async function addNews(prevState: unknown, formData: FormData) {
  const result = addScheme.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // Cast the image and other form fields to their proper types
  const image = data.image as File;

  // Upload image to Firebase Storage
  const imageUrl = await uploadImageToStorage(image);

  // Save the news entry to the database
  await db.news.create({
    data: {
      title: data.title as string, // Cast to string
      description: data.description as string, // Cast to string
      date: new Date(data.date as string), // Cast to string and then to Date
      picturePath: imageUrl, // Save the URL of the uploaded image
    },
  });

  revalidatePath(`/`);
  revalidatePath(`/admin/news`);
  revalidatePath(`/news`);
  redirect("/admin/news");
}

export async function deleteNews(id: string) {
  const news = await db.news.findUnique({ where: { id } });

  if (!news) return notFound();

  // Delete the image from Firebase Storage
  const imageRef = ref(storage, news.picturePath);
  await deleteObject(imageRef).catch((error) => {
    console.error("Error deleting image from Firebase Storage:", error);
  });

  // Delete the news entry from the database
  await db.news.delete({ where: { id } });

  revalidatePath("/admin/news");
  redirect("/admin/news");
}

const editSchema = addScheme.extend({
  image: imageScheme.optional(),
});

export async function updateNews(id: string, prevState: unknown, formData: FormData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const news = await db.news.findUnique({ where: { id } });

  if (!news) return notFound();

  let picturePath = news.picturePath;

  // If a new image is uploaded, replace the old image
  if (data.image && data.image.size > 0) {
    // Delete old image from Firebase Storage
    const oldImageRef = ref(storage, news.picturePath);
    await deleteObject(oldImageRef).catch((error) => {
      console.error("Error deleting old image:", error);
    });

    // Upload new image to Firebase Storage
    const newImage = data.image as File;
    picturePath = await uploadImageToStorage(newImage);
  }

  // Update the news entry in the database
  await db.news.update({
    where: { id },
    data: {
      title: data.title as string, // Cast to string
      description: data.description as string, // Cast to string
      date: new Date(data.date as string), // Cast to string and then to Date
      picturePath, // Updated picture path
    },
  });

  revalidatePath(`/`);
  revalidatePath(`/admin/news`);
  revalidatePath(`/news`);
  redirect("/admin/news");
}
