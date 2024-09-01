"use client";
import { Button } from "@/components/ui/button";
import { News } from "@prisma/client";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addNews } from "../_actions/news";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const NewForm = ({ news }: { news?: News | null }) => {
  const [error, action] = useFormState(addNews, {});

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <form action={action}>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={news?.title || ""}
        />
        {error.title && <div className="text-destructive">{error.title}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          name="description"
          required
          defaultValue={news?.description || ""}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          name="date"
          required
          defaultValue={news?.date?.toISOString().split("T")[0] || ""}
        />
        {error.date && <div className="text-destructive">{error.date}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          required={news == null}
          onChange={handleImageChange}
        />
        {selectedImage && (
          <div className="mt-4">
            <Image
              src={selectedImage}
              height={400}
              width={400}
              alt="Selected image preview"
            />
          </div>
        )}
        {news != null && (
          <Image
            src={news.picturePath}
            height={400}
            width={400}
            alt="New banner image"
          />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="my-3" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default NewForm;
