import Image from "next/image";
import { placeholderImg } from "@/assets";
import { Button } from "./ui/button";
import { Link } from "@/i18n/routing";

type BlogCardProps = {
  id: string;
  title: string;
  description: string;
  date: Date;
  picture: string[] | null;
};

const BlogCard: React.FC<BlogCardProps> = ({ id, title, description, date, picture }) => {
  // Clipping the description to limit the content on the card
  const maxLength = 100;
  const clippedDescription =
    description.length > maxLength ? description.substring(0, maxLength) + "..." : description;

  return (
    <div className="border border-[1D1D1D] rounded-md shadow-md relative overflow-hidden">
      {/* Blog Image */}
      <Image
        src={picture && picture.length > 0 ? picture[0] : placeholderImg}
        alt="Blog picture"
        width={400}
        height={300}
        className="w-full h-[200px] object-cover"
      />

      <div className="p-4">
        {/* Blog Title */}
        <h3 className="font-semibold text-lg">{title}</h3>

        {/* Blog Date */}
        <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>

        {/* Blog Description */}
        <p className="text-sm mt-2 text-gray-700">{clippedDescription}</p>

        {/* Link to dynamic blog page */}
        <Link href={`/blogs/${id}`}>
          <Button variant="link" className="mt-3 p-0">
            Read more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
