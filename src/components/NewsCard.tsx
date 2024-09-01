"use client";
import { useState, useEffect } from "react";
import { placeholderImg } from "@/assets";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import { getDayName, getMonthName } from "@/lib/utils";

const NewsCard = ({
  id,
  title,
  description,
  picture,
  date,
}: {
  id: number;
  title: string;
  description: string;
  picture: string | StaticImageData | null | undefined;
  date: Date;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <div className="border border-[1D1D1D] max-w-[500px] rounded-md shadow-md relative">
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
          src={picture ? picture : placeholderImg}
          alt="Event picture"
          width={400} // Provide a width
          height={400} // Provide a height
          className="w-full h-[250px] shadow-sm object-cover"
        />
        <div className="flex flex-col justify-center gap-2 items-start p-3 max-h-[250px]">
          <h3>{title}</h3>
          <p>{description}</p>
          <Button variant="link" className="p-0" onClick={openModal}>
            View event
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg mx-auto relative">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="mb-4">{description}</p>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-lg text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="mt-4">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;
