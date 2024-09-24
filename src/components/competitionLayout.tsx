import { placeholderImg } from "@/assets";
import Image from "next/image";
import db from "@/db/db"; // Assuming Prisma client is available here
import { CompetitionNews } from "@prisma/client";
import { notFound } from "next/navigation";

// Define the component's props type
type CompetitionLayoutProps = {
  name: string;
};

// Static description for the competition
const competitionDescription = `
  Competition Description goes here. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit. Donec vel est et purus dictum mollis.
  Nullam condimentum, ligula non gravida fermentum, arcu felis volutpat
  neque, at condimentum ipsum justo vel velit. Sed at sapien a nunc
  gravida dignissim. Integer vel turpis at enim consectetur tincidunt.
  Vestibulum in dui vel justo faucibus cursus. Donec at lectus vel neque
  consectetur facil.
`;

const CompetitionLayout = async ({ name }: CompetitionLayoutProps) => {
  // Fetch competition news from the database for the given competition
  const news: CompetitionNews[] = await db.competitionNews.findMany({
    where: { competition: name },
    orderBy: { date: "desc" },
  });

  // If no news found, handle it with a 404 or appropriate message
  if (!news) {
    return notFound();
  }

  return (
    <div className="p-2">
      <h1 className="text-center mb-4">{name}</h1>
      <div className="grid grid-cols-5">
        <p className="block col-span-5">{competitionDescription}</p>
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
