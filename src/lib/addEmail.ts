// lib/addEmail.js
"use server";

import db from "@/db/db";

export async function addEmail(formData: FormData) {
    const email = formData.get("email");

    // Check if email is a string
    if (!email || typeof email !== "string") {
        return { success: false, message: "A valid email is required." };
    }

    try {
        // Check if the email already exists
        const existingEmail = await db.emails.findUnique({
            where: { email: email },
        });

        if (existingEmail) {
            return { success: false, message: "Email already subscribed." };
        }

        // Save the email to the database
        await db.emails.create({
            data: { email: email },
        });

        return { success: true, message: "Email added successfully!" };
    } catch (error) {
        console.error("Error adding email:", error);
        return { success: false, message: "An error occurred. Please try again." };
    }
}
