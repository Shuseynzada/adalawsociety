// components/BlogCard.tsx
import { MessageSquare } from "lucide-react";
import { Link } from "@/i18n/routing";

type BlogCardProps = {
  id: number;
  title: string;
  author: string;
  summary?: string;
  date: Date;
  commentCount: number;
};

const BlogCard = ({ id, title, author, summary, date, commentCount }: BlogCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-2 border-l-4 border-blue-700 pl-4 pr-4 pb-6 bg-white shadow-md rounded-md">
      <p className="italic text-sm text-gray-700">{author}</p>
      <h2 className="font-semibold text-xl text-black">{title}</h2>
      <p className="text-sm text-gray-800 leading-relaxed">
        {summary || "No summary provided..."}
      </p>
      <Link
        href={`/blogs/${id}`}
        className="text-blue-600 text-sm mt-1 hover:underline"
      >
        Continue reading &gt;&gt;
      </Link>
      <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
        <span>{formattedDate}</span>
        <span className="flex items-center gap-1">
          <MessageSquare size={16} />
          {commentCount}
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
