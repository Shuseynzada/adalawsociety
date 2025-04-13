// components/NewsSection.tsx
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function NewsSection() {
  const tNews = await getTranslations("Homenews");
  const newsArr = await db.news.findMany({ take: 2 });

  return (
    <div
      id="news"
      className="max-w-[500px] lg:max-w-[1100px] my-12 mx-auto px-6 py-8 bg-gray-100 rounded-lg shadow-md"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between items-center px-4 mb-6">
        <h1 className="text-3xl font-bold text-[#346178] mb-4 sm:mb-0">
          {tNews("title")}
        </h1>
        <Button variant="outline" className="shadow-md hover:bg-gray-200">
          <Link href="/news">{tNews("buttonAll")}</Link>
        </Button>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 px-4 py-6">
        {newsArr.map((news) => (
          <NewsCard
            key={news.id}
            title={news.title}
            description={news.description}
            picture={news.picturePaths}
            date={news.date}
          />
        ))}
      </div>
    </div>
  );
}