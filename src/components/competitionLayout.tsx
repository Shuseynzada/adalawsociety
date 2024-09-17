import { placeholderImg } from "@/assets";
import Image from "next/image";

const news = [
  {
    id: 1,
    title: "News 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel est et purus dictum mollis. Nullam condimentum, ligula non gravida fermentum, arcu felis volutpat neque, at condimentum ipsum justo vel velit. Sed at sapien a nunc gravida dignissim. Integer vel turpis at enim consectetur tincidunt.  Vestibulum in dui vel justo faucibus cursus. Donec at lectus vel neque consectetur facil",
    imagePath: null,
  },
  {
    id: 2,
    title: "News 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel est et purus dictum mollis. Nullam condimentum, ligula non gravida fermentum, arcu felis volutpat neque, at condimentum ipsum justo vel velit. Sed at sapien a nunc gravida dignissim. Integer vel turpis at enim consectetur tincidunt.  Vestibulum in dui vel justo faucibus cursus. Donec at lectus vel neque consectetur facil",
    imagePath: null,
  },
];

const CompetitionLayout = ({ name }: { name: string }) => {
  return (
    <div className="p-2 ">
      <h1 className="text-center mb-4">{name}</h1>
      <div className="grid grid-cols-5">
        <p className="block col-span-5">
          Competition Description goes here. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Donec vel est et purus dictum mollis.
          Nullam condimentum, ligula non gravida fermentum, arcu felis volutpat
          neque, at condimentum ipsum justo vel velit. Sed at sapien a nunc
          gravida dignissim. Integer vel turpis at enim consectetur tincidunt.
          Vestibulum in dui vel justo faucibus cursus. Donec at lectus vel neque
          consectetur facil
        </p>
        {/* TODO: Image */}
      </div>
      <div className="p-5">
        {news.map((item) => (
          <CompetitionNews key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

const CompetitionNews = ({
  title,
  imagePath,
  description,
}: {
  title: string;
  imagePath: string | null;
  description: string;
}) => {
  return (
    <div className="sm:flex justify-center items-center">
      <Image
        src={imagePath ? imagePath : placeholderImg}
        alt={"news image"}
        width={350}
      />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CompetitionLayout;
