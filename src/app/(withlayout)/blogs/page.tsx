import NewsCard from "@/components/NewsCard";
import db from "@/db/db";

const BlogsPage = async () => {
  const newsArr = await db.news.findMany();
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <h1>Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-10 gap-y-6">
        {newsArr.map((news) => (
          <NewsCard
            key={news.id}
            title={news.title}
            description={news.description}
            picture={news.picturePath[0]}
            date={news.date}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
