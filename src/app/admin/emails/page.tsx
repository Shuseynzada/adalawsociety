// src/app/admin/emails/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchEmails } from "../_actions/email";

const AdminEmailsPage = () => {
  const [emails, setEmails] = useState<string[]>([]);

  // Fetch emails from the server on component mount
  useEffect(() => {
    const loadEmails = async () => {
      const fetchedEmails = await fetchEmails();
      setEmails(fetchedEmails);
    };

    loadEmails();
  }, []);

  // Format emails into a comma-separated string for the bcc field
  const bccEmails = emails.join(",");

  // Create the mailto link with a single recipient in `to` and all others in `bcc`
  const mailtoHref = `mailto:?bcc=${encodeURIComponent(
    bccEmails
  )}`;

  return (
    <div>
      <h1>Admin - Send Emails</h1>
      <a href={mailtoHref}>
        <Button>Open Email Client</Button>
      </a>
      <h2 className="mt-5">Subscribed Emails</h2>
      <ul>
        {emails.map((email) => (
          <li key={email}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminEmailsPage;
