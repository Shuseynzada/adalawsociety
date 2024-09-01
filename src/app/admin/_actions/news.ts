"use server"

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation";

const fileScheme = z.instanceof(File, { message: "Required" });
const imageScheme = fileScheme.refine(file => file.size === 0 || file.type.startsWith("image/"));

const addScheme = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.string().min(1),
    image: imageScheme.refine(file => file.size > 0, "Required"),
})

export async function addNews(prevState: unknown, formData: FormData) {
    const result = addScheme.safeParse(Object.fromEntries(formData.entries()))
    if (result.success == false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("public/news", { recursive: true })
    const imagePath = `/news/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile("public" + imagePath, Buffer.from(await data.image.arrayBuffer()))


    await db.news.create({
        data: {
            title: data.title,
            description: data.description,
            date: new Date(data.date),
            picturePath: imagePath
        }
    })


    redirect("/admin/news")
}