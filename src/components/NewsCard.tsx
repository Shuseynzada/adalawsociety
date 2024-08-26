import { placeholderImg } from "@/assets";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { Button } from "./ui/button";
import { getDayName, getMonthName } from "@/lib/utils";

const EventCard = ({
  id,
  title,
  description,
  picture,
  date,
}: {
  id: number;
  title: string;
  description: string;
  picture: StaticImageData | null | undefined;
  date: Date;
}) => {
  return (
    <>
      <div className="border border-[1D1D1D] max-w-[500px] rounded-md shadow-md relative">
        <div className="absolute right-5 top-5 w-[90px] h-[90px] bg-white z-10 flex flex-col justify-center items-center border">
          <span className="block text-sm font-light">{getDayName(date,"en-EN")}</span>
          <span className="block text-lg font-bold">{date.getDate()}</span>
          <span className="block text-sm font-light">
            {getMonthName(date,"en-EN")} {date.getFullYear()}
          </span>
        </div>
        <Image
          src={picture ? picture : placeholderImg}
          alt="Event picture"
          className="w-full h-[250px] shadow-sm object-cover"
        />
        <div className="flex flex-col justify-center gap-2 items-start p-3 max-h-[250px]">
          <h3>{title}</h3>
          <p>{description}</p>
          <Button variant="link" className="p-0">
            View event
          </Button>
        </div>
      </div>
    </>
  );
};

export default EventCard;
