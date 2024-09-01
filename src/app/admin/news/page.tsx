import NewsCard from "@/components/NewsCard";
import db from "@/db/db";

const AdminNewsPage = async () => {
  const news = await db.news.findMany();

  if (news.length == 0) return <div>No news found</div>;
  return (
    <div>
      <h1>Admin News Page</h1>
      {news.map((news, i) => (
          <NewsCard
            key={i}
            id={0}
            title={news.title}
            description={news.description}
            picture={news.picturePath}
            date={news.date}
          />
        ))}
    </div>
  );
};

export default AdminNewsPage;
