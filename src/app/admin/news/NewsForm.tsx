"use client";
import { Button } from "@/components/ui/button";
import { News } from "@prisma/client";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { addNews, updateNews } from "../_actions/news"; // Import actions based on your setup

const NewsForm = ({ news }: { news?: News | null }) => {
  const [error, action] = useFormState(
    news == null ? addNews : updateNews.bind(null, news!.id),
    {}
  );

  const [existingImages, setExistingImages] = useState<string[]>(
    news?.picturePaths || []
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  // Handle new image uploads
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedImages([...selectedImages, ...newFiles]);
    }
  };

  // Remove existing image
  const handleRemoveExistingImage = (imagePath: string) => {
    setExistingImages(existingImages.filter((img) => img !== imagePath));
    setRemovedImages([...removedImages, imagePath]); // Track removed images
  };

  // Remove new image before submission
  const handleRemoveNewImage = (imageFile: File) => {
    setSelectedImages(selectedImages.filter((file) => file !== imageFile));
  };

  return (
    <form
      action={(formData) => {
        if (selectedImages.length === 0) {
          formData.delete("images");
        }
        action(formData);
      }}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      {/* Title Section */}
      <h2 className="text-lg font-bold mb-4">News Details</h2>
      <div className="space-y-2">
        <Label htmlFor="title" className="font-semibold">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={news?.title || ""}
          className={`w-full border p-2 rounded ${error?.title ? 'border-red-500' : ''}`}
        />
        {error?.title && <div className="text-red-500">{error.title}</div>}
      </div>

      {/* Description Section */}
      <div className="space-y-2">
        <Label htmlFor="description" className="font-semibold">Description</Label>
        <textarea
          className={`w-full p-2 border rounded ${error?.description ? 'border-red-500' : ''}`}
          id="description"
          name="description"
          required
          defaultValue={news?.description || ""}
        />
        {error?.description && <div className="text-red-500">{error.description}</div>}
      </div>

      {/* Date Section */}
      <div className="space-y-2">
        <Label htmlFor="date" className="font-semibold">Date</Label>
        <Input
          type="date"
          id="date"
          name="date"
          required
          defaultValue={news?.date?.toISOString().split("T")[0] || ""}
          className={`w-full border p-2 rounded ${error?.date ? 'border-red-500' : ''}`}
        />
        {error?.date && <div className="text-red-500">{error.date}</div>}
      </div>

      {/* Image Upload Section */}
      <h2 className="text-lg font-bold mt-6 mb-4">Images</h2>
      <div className="space-y-2">
        <h3 className="text-md font-semibold">Upload New Images</h3>
        <Label htmlFor="images" className="font-semibold">Images</Label>
        <Input
          type="file"
          id="images"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />
        {error?.images && <div className="text-red-500">{error.images}</div>}

        {/* Existing images (only for update) */}
        {existingImages.length > 0 && news != null && (
          <>
            <h3 className="text-md font-semibold mt-4">Existing Images</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {existingImages.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    height={200}
                    width={200}
                    alt={`Existing image ${index + 1}`}
                    className="rounded"
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => handleRemoveExistingImage(image)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Preview newly selected images */}
        {selectedImages.length > 0 && (
          <>
            <h3 className="text-md font-semibold mt-4">
              Newly Selected Images
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {selectedImages.map((imageFile, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(imageFile)}
                    height={200}
                    width={200}
                    alt={`Selected image preview ${index + 1}`}
                    className="rounded"
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => handleRemoveNewImage(imageFile)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Hidden inputs for existing images and removed images (only for update) */}
      {news != null &&
        removedImages.length > 0 &&
        removedImages.map((imagePath, index) => (
          <input
            key={`removed-${index}`}
            type="hidden"
            name="removedImages[]"
            value={imagePath}
          />
        ))}

      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="my-3 bg-blue-500 text-white p-2 rounded" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default NewsForm;
