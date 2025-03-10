import NewsCard from "@/components/NewsCard";
import db from "@/db/db";
import NewsDelete from "./NewsDelete";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit } from "lucide-react";

const AdminNewsPage = async () => {
  const news = await db.news.findMany();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin News Page</h1>
      <Button asChild className="m-2">
        <Link href="./news/add">Add News</Link>
      </Button>
      {news.length === 0 ? (
        <div className="text-center text-gray-500">No news found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((newsItem, i) => (
            <div key={i} className="relative border rounded-lg p-4 shadow-sm">
              <div className="absolute top-2 right-2 z-20 flex gap-2 bg-white p-1 rounded-md shadow-md">
                <NewsDelete id={newsItem.id} />
                <Button variant="secondary" asChild>
                  <Link href={`./news/${newsItem.id}/edit`}>
                    <Edit />
                  </Link>
                </Button>
              </div>
              <NewsCard
                title={newsItem.title}
                description={newsItem.description}
                picture={newsItem.picturePaths}
                date={newsItem.date}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNewsPage;
