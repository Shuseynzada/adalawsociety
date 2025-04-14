// components/NewsCard.tsx
"use client";
import { useState, useEffect } from "react";
import { placeholderImg } from "@/assets";
import Image from "next/image";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { az, enUS } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [clippedDescription, setClippedDescription] = useState("");
  const localeCode = useLocale();
  const t = useTranslations("NewsCard");
  const locale = localeCode === "az" ? az : enUS;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    if (selectedImage) {
      setSelectedImage(null);
    } else {
      setIsModalOpen(false);
    }
  };

  const openImageInModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const maxLength = 150;
    setClippedDescription(
      description.length > maxLength
        ? description.substring(0, maxLength) + "..."
        : description
    );
  }, [description]);

  const formattedDay = format(date, "EEEE", { locale });
  const formattedMonth = format(date, "MMMM", { locale });
  const formattedDate = date.getDate();
  const formattedYear = date.getFullYear();

  return (
    <>
      <div className="border border-[1D1D1D] max-w-[500px] rounded-md shadow-md relative overflow-hidden">
        <div className="absolute right-5 top-5 w-[90px] h-[90px] bg-white z-10 flex flex-col justify-center items-center border text-center p-1">
          <span className="block text-xs font-light leading-tight">
            {formattedDay}
          </span>
          <span className="block text-lg font-bold">{formattedDate}</span>
          <span className="block text-xs font-light leading-tight">
            {formattedMonth} {formattedYear}
          </span>
        </div>
        <Image
          src={picture ? picture[0] : placeholderImg}
          alt="Event picture"
          width={400}
          height={400}
          className="w-full h-[250px] shadow-sm object-cover"
        />
        <div className="flex flex-col justify-center gap-2 items-start p-3">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-700 line-clamp-3">
            {clippedDescription}
          </p>
          <Button variant="link" className="p-0 text-blue-600" onClick={openModal}>
            {t("viewEvent")}
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg mx-4 mt-5 relative shadow-lg max-w-4xl w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-lg text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Selected Event Picture"
                width={800}
                height={800}
                className="object-cover max-w-full max-h-[80vh] rounded-md mx-auto"
              />
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <p className="mb-4 text-gray-700 whitespace-pre-line">{description}</p>
                <div className="flex flex-wrap gap-2">
                  {picture && picture.length > 0 ? (
                    picture.map((pic, index) => (
                      <div
                        key={index}
                        onClick={() => openImageInModal(pic)}
                        className="cursor-pointer"
                      >
                        <Image
                          src={pic}
                          alt={`Event picture ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-cover rounded-md"
                        />
                      </div>
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
              </>
            )}

            <div className="mt-6 text-right">
              <Button onClick={closeModal}>{t("close")}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard;