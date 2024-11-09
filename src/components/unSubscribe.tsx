"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { unsubscribeEmail } from "@/lib/unsubscribeEmail";

export default function UnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    const response = await unsubscribeEmail(formData);

    if (response.success) {
      setMessage(response.message);
      setEmail(""); // Clear the email field on success
    } else {
      setMessage(response.message);
    }
  };

  return (
    <form onSubmit={handleUnsubscribe} className="flex flex-col gap-3">
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email to unsubscribe"
        className="text-lg border border-black px-2 py-1 w-full"
        type="email"
        required
      />
      <Button variant="outline" className="border border-black rounded-none">
        Unsubscribe
      </Button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
