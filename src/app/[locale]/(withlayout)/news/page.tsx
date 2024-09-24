import NewsCard from "@/components/NewsCard";
import db from "@/db/db";
import React from "react";

const NewsPage = async () => {
  const newsArr = await db.news.findMany();
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <h1>News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-10 gap-y-6">
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
};

export default NewsPage;
