// src/app/admin/emails/actions.ts
"use server";

import db from "@/db/db";
import { Emails } from "@prisma/client";

// Fetch all emails action
export async function fetchEmails(): Promise<string[]> {
  const emails = await db.emails.findMany({
    select: { email: true },
  });

  return emails.map((email) => email.email);
}
