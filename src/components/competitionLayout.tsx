"use server"
import { placeholderImg } from "@/assets";
import Image from "next/image";
import db from "@/db/db"; // Assuming Prisma client is available here
import { Competition, CompetitionNews } from "@prisma/client"; // Prisma generated types

// Define the component's props type
type CompetitionLayoutProps = {
  name: Competition;
  description: string;
};

const CompetitionLayout = async ({ name, description }: CompetitionLayoutProps) => {
  
  // Fetch competition news from the database for the given competition
  const news: CompetitionNews[] = await db.competitionNews.findMany({
    where: { competition: name as Competition }, // Cast name to the Competition enum
    orderBy: { date: "desc" },  
  });

  return (
    <div className="p-2">
      <h1 className="text-center mb-4">{name}</h1>
      <div className="grid grid-cols-5">
        <p className="block col-span-5">{description}</p>
        {/* Static Competition Description */}
      </div>
      <div className="p-5">
        {news.length === 0 ? (
          <p>No news available for this competition.</p>
        ) : (
          news.map((item) => (
            <CompetitionNewsItem key={item.id} {...item} />
          ))
        )}
      </div>
    </div>
  );
};

type CompetitionNewsItemProps = {
  title: string;
  picturePaths: string[];
  description: string;
  date: Date;
};

const CompetitionNewsItem: React.FC<CompetitionNewsItemProps> = ({
  title,
  picturePaths,
  description,
  date,
}) => {
  const imagePath = picturePaths.length > 0 ? picturePaths[0] : null;

  return (
    <div className="sm:flex justify-center items-center mb-4">
      <Image
        src={imagePath ? imagePath : placeholderImg}
        alt="news image"
        width={350}
        height={200}
      />
      <div className="sm:ml-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">
          {new Date(date).toLocaleDateString()}
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CompetitionLayout;
