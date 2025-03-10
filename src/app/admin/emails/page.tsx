// src/app/admin/emails/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchEmails } from "../_actions/email";
import { addEmail } from "@/lib/addEmail";
import { unsubscribeEmail } from "@/lib/unsubscribeEmail";

const AdminEmailsPage = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newEmail, setNewEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Fetch emails from the server on component mount
  useEffect(() => {
    const loadEmails = async () => {
      setLoading(true);
      const fetchedEmails = await fetchEmails();
      setEmails(fetchedEmails);
      setLoading(false);
    };

    loadEmails();
  }, []);

  // Add a new email
  const handleAddEmail = async () => {
    const formData = new FormData();
    formData.append("email", newEmail);

    const response = await addEmail(formData);
    setMessage(response.message);

    if (response.success) {
      setEmails([...emails, newEmail]);
      setNewEmail("");
    }
  };

  // Remove an email
  const handleRemoveEmail = async (emailToRemove: string) => {
    const formData = new FormData();
    formData.append("email", emailToRemove);

    const response = await unsubscribeEmail(formData);
    setMessage(response.message);

    if (response.success) {
      setEmails(emails.filter(email => email !== emailToRemove));
    }
  };

  // Format emails into a comma-separated string for the bcc field
  const bccEmails = emails.join(",");

  // Create the mailto link with a single recipient in `to` and all others in `bcc`
  const mailtoHref = `mailto:?bcc=${encodeURIComponent(bccEmails)}`;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin - Send Emails</h1>
      <div className="mb-4">
        <a href={mailtoHref}>
          <Button className="text-lg">Open Email Client</Button>
        </a>
      </div>
      <h2 className="text-xl font-semibold mt-5 mb-3">Subscribed Emails</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      {loading ? (
        <p>Loading emails...</p>
      ) : (
        <ul className="list-disc pl-5">
          {emails.map((email) => (
            <li key={email} className="mb-1">
              {email}
              <button onClick={() => handleRemoveEmail(email)} className="ml-2 text-red-500">Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Add new email"
          className="border p-2 mr-2"
        />
        <Button onClick={handleAddEmail} className="text-lg">Add Email</Button>
      </div>
    </div>
  );
};

export default AdminEmailsPage;
