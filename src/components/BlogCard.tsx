// components/BlogCard.tsx
import { MessageSquare } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { format } from "date-fns";
import { enUS, az } from "date-fns/locale";


type BlogCardProps = {
  id: number;
  title: string;
  author: string;
  summary?: string;
  date: Date;
  commentCount: number;
};

const BlogCard = ({ id, title, author, summary, date, commentCount }: BlogCardProps) => {
  const localeCode = useLocale();
  const t = useTranslations("BlogCard");
  const locale = localeCode === "az" ? az : enUS;

  const formattedDate = format(new Date(date), "dd MMMM yyyy", { locale });

  return (
    <div className="flex flex-col gap-2 border-l-4 border-blue-700 pl-4 pr-4 pb-6 bg-white shadow-md rounded-md">
      <p className="italic text-sm text-gray-700">{author}</p>
      <h2 className="font-semibold text-xl text-black">{title}</h2>
      <p className="text-sm text-gray-800 leading-relaxed">
        {summary || t("noSummary")}
      </p>
      <Link
        href={`/blogs/${id}`}
        className="text-blue-600 text-sm mt-1 hover:underline"
      >
        {t("continueReading")} &gt;&gt;
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
