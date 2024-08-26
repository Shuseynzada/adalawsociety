import { placeholderImg } from "@/assets";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { Button } from "./ui/button";

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
    <div className="border border-[1D1D1D] w-[500px] min-h-[400px] rounded-md overflow-hidden shadow-md">
      <Image
        src={picture ? picture : placeholderImg}
        alt="Event picture"
        className="w-full h-[60%] shadow-sm object-cover"
      />
      <div className="flex flex-col justify-center gap-2 items-start p-3 h-[40%]">
        <h3>{title}</h3>
        <p>{description}</p>
        <Button variant="link" className="p-0">View event</Button>
      </div>
    </div>
  );
};

export default EventCard;
