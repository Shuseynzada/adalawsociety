// lib/unsubscribeEmail.js
"use server";

import db from "@/db/db";

export async function unsubscribeEmail(formData: FormData) {
    const email = formData.get("email");

    // Ensure email is of type string
    if (!email || typeof email !== "string") {
        return { success: false, message: "A valid email is required to unsubscribe." };
    }

    try {
        // Check if the email exists in the database
        const existingEmail = await db.emails.findUnique({
            where: { email },
        });

        if (!existingEmail) {
            return { success: false, message: "Email not found in our subscription list." };
        }

        // Delete or mark the email as unsubscribed
        await db.emails.delete({
            where: { email },
        });

        return { success: true, message: "You have been unsubscribed successfully." };
    } catch (error) {
        console.error("Error unsubscribing email:", error);
        return { success: false, message: "An error occurred. Please try again later." };
    }
}
