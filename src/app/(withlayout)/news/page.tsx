import { placeholderImg } from "@/assets";
import NewsCard from "@/components/NewsCard";
import React from "react";

const newsArr = [
  {
    id: 0,
    title: "Event 1",
    description: "Description for Event 1",
    picture: placeholderImg,
    date: new Date(),
  },
  {
    id: 1,
    title: "Event 1",
    description: "Description for Event 1",
    picture: placeholderImg,
    date: new Date(),
  },
  {
    id: 1,
    title: "Event 1",
    description: "Description for Event 1",
    picture: placeholderImg,
    date: new Date(),
  },
  {
    id: 2,
    title: "Event 1",
    description: "Description for Event 1",
    picture: placeholderImg,
    date: new Date(),
  },
  {
    id: 3,
    title: "Event 1",
    description: "Description for Event 1",
    picture: placeholderImg,
    date: new Date(),
  },
];

const NewsPage = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <h1>News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-10 gap-y-6">
        {newsArr.map((news, i) => (
          <NewsCard
            key={i}
            id={0}
            title={news.title}
            description={news.description}
            picture={news.picture}
            date={news.date}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
