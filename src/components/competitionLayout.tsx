"use server";
import { placeholderImg } from "@/assets";
import Image from "next/image";
import db from "@/db/db";
import { Competition, CompetitionNews } from "@prisma/client";

type CompetitionLayoutProps = {
  name: Competition;
  description: string;
};

const CompetitionLayout = async ({
  name,
  description,
}: CompetitionLayoutProps) => {
  const news: CompetitionNews[] = await db.competitionNews.findMany({
    where: { competition: name },
    orderBy: { date: "desc" },
  });

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#346178]">
        {name === "MoodCourt" ? "Moot Court" : name}
      </h1>

      <div className="mb-10 text-gray-800 whitespace-pre-line leading-relaxed">
        {description}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-[#346178]">News</h2>
      <div className="space-y-6">
        {news.length === 0 ? (
          <p className="text-gray-600">No news available for this competition.</p>
        ) : (
          news.map((item) => <CompetitionNewsItem key={item.id} {...item} />)
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

const CompetitionNewsItem = ({
  title,
  picturePaths,
  description,
  date,
}: CompetitionNewsItemProps) => {
  const imagePath = picturePaths.length > 0 ? picturePaths[0] : placeholderImg;

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start bg-white rounded-md shadow-md p-4">
      <Image
        src={imagePath}
        alt="news image"
        width={350}
        height={200}
        className="rounded-md object-cover"
      />
      <div>
        <h3 className="text-xl font-semibold text-[#222]">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default CompetitionLayout;
