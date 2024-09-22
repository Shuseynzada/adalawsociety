import NewsCard from "@/components/NewsCard";
import db from "@/db/db";
import NewsDelete from "./NewsDelete";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit } from "lucide-react";
const AdminNewsPage = async () => {
  const news = await db.news.findMany();

  return (
    <div>
      <h1>Admin News Page</h1>
      <Button asChild className="m-2">
        <Link href="./news/add">Add news</Link>
      </Button>
      {news.length == 0 ? (
        <div>No news found</div>
      ) : (
        news.map((news, i) => (
          <div key={i}>
            <div className="absolute z-10 p-1 flex gap-10">
              <NewsDelete id={news.id} />
              <Button variant="secondary" asChild>
                <Link href={`./news/${news.id}/edit`}>
                  <Edit />
                </Link>
              </Button>
            </div>
            <NewsCard
              title={news.title}
              description={news.description}
              picture={news.picturePaths}
              date={news.date}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default AdminNewsPage;
