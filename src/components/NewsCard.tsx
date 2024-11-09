"use client";
import { useState, useEffect } from "react";
import { placeholderImg } from "@/assets";
import Image from "next/image";
import { Button } from "./ui/button";
import { getDayName, getMonthName } from "@/lib/utils";

const NewsCard = ({
  title,
  description,
  picture,
  date,
}: {
  title: string;
  description: string;
  picture: string[] | null | undefined;
  date: Date;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clippedDescription, setClippedDescription] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when component is unmounted or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Clip description to a certain number of characters for display in the card
  useEffect(() => {
    const maxLength = 150; // Set max length for the card description
    setClippedDescription(description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description);
  }, [description]);

  return (
    <>
      <div className="border border-[1D1D1D] max-w-[500px] rounded-md shadow-md relative overflow-hidden">
        <div className="absolute right-5 top-5 w-[90px] h-[90px] bg-white z-10 flex flex-col justify-center items-center border">
          <span className="block text-sm font-light">
            {getDayName(date, "en-EN")}
          </span>
          <span className="block text-lg font-bold">{date.getDate()}</span>
          <span className="block text-sm font-light">
            {getMonthName(date, "en-EN")} {date.getFullYear()}
          </span>
        </div>
        <Image
          src={picture ? picture[0] : placeholderImg}
          alt="Event picture"
          width={400} // Provide a width
          height={400} // Provide a height
          className="w-full h-[250px] shadow-sm object-cover"
        />
        <div className="flex flex-col justify-center gap-2 items-start p-3">
          <h3 className="font-semibold text-lg">{title}</h3>
          {/* Limit the description length */}
          <p className="text-sm text-gray-700 line-clamp-3">
            {clippedDescription}
          </p>
          <Button variant="link" className="p-0" onClick={openModal}>
            View event
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg md:mx-3 mx-auto mt-5 relative shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-lg text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            {/* Modal content */}
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <p className="mb-4 text-gray-700">{description}</p>

            {/* Show all pictures in the modal */}
            <div className="flex flex-wrap gap-2">
              {picture && picture.length > 0 ? (
                picture.map((pic, index) => (
                  <Image
                    key={index}
                    src={pic}
                    alt={`Event picture ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover rounded-md"
                  />
                ))
              ) : (
                <Image
                  src={placeholderImg}
                  alt="Placeholder image"
                  width={100}
                  height={100}
                  className="object-cover w-24 h-24 rounded-md"
                />
              )}
            </div>

            {/* Close button */}
            <div className="mt-6 text-right">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;
