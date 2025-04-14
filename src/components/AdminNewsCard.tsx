// components/AdminNewsCard.tsx
import Image from "next/image";
import { placeholderImg } from "@/assets";
import { format } from "date-fns";

type AdminNewsCardProps = {
  title: string;
  description: string;
  picture?: string[] | null;
  date: Date;
};

const AdminNewsCard = ({
  title,
  description,
  picture,
  date,
}: AdminNewsCardProps) => {
  const formattedDate = format(new Date(date), "dd MMM yyyy");

  const clippedDescription =
    description.length > 150 ? description.substring(0, 150) + "..." : description;

  return (
    <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden bg-white">
      <Image
        src={picture && picture.length > 0 ? picture[0] : placeholderImg}
        alt="News Image"
        width={400}
        height={250}
        className="w-full h-[200px] object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-[#222]">{title}</h3>
        <p className="text-sm text-gray-600">{formattedDate}</p>
        <p className="text-sm text-gray-800">{clippedDescription}</p>
      </div>
    </div>
  );
};

export default AdminNewsCard;
