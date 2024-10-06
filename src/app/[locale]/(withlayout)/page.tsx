import { placeholderImg } from "@/assets";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Home() {
  const tNews = useTranslations("Homenews");
  return (
    <>
      <Hero />
      <About />
      <News tNews={tNews} />
      <Contact />
    </>
  );
}

function Hero() {
  const t = useTranslations("Hero");
  return (
    <div
      id="home"
      className="flex flex-col justify-center items-center gap-3 my-10 text-center w-full"
    >
      <h1>{t("title")}</h1>
      <p className="text-xl max-w-md">{t("subtitle")}</p>
      <Image
        src={placeholderImg}
        alt={"hero section banner"}
        className="border w-full h-96 object-cover bg-center bg-[#D9D9D9]"
      />
    </div>
  );
}

function About() {
  const t = useTranslations("About");
  return (
    <div
      id="about"
      className="flex flex-col-reverse sm:grid grid-cols-2 w-full my-8"
    >
      <Image
        src={placeholderImg}
        alt={"about section banner"}
        className="border w-[500px] aspect-[1/1] object-cover bg-center bg-[#D9D9D9]"
      />
      <div className="flex flex-col justify-center pl-2">
        <h1>{t("title")}</h1>
        <p className="max-w-md">{t("description")}</p>
      </div>
    </div>
  );
}

async function News({ tNews }: any) {
  // Fetch data directly as this is a server-side component
  const newsArr = await db.news.findMany({ take: 2 });

  return (
    <div
      id="news"
      className="flex flex-col max-w-[500px] lg:max-w-[1100px] my-6 mx-auto"
    >
      <div className="flex justify-between px-6">
        <h1>{tNews("title")}</h1>
        <Button variant="outline" className="shadow-md">
          <Link href="/news">{tNews("buttonAll")}</Link>
        </Button>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-20 gap-y-10 px-2 py-6 mx-auto">
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
}

function Contact() {
  const t = useTranslations("Contact");
  return (
    <div id="contact" className="text-center mb-10 mt-5">
      <h1>{t("title")}</h1>
      <div className="flex justify-center gap-10 mt-10">
        <div className="flex flex-col gap-1 justify-center items-center">
          <Mail className="size-16 bg-custom p-3 text-white rounded-full" />
          <h3 className="p-0 m-0">Email</h3>
          <Button variant="link" className="text-customprimary text-lg">
            <Link href="mailto:lawsociety@ada.edu.az">
              lawsociety@ada.edu.az
            </Link>
          </Button>
        </div>
        {/* <div className="flex flex-col gap-1 justify-center items-center">
          <Phone className="size-16 bg-custom p-3 text-white rounded-full" />
          <h3 className="p-0 m-0">Phone</h3>
          <Button variant="link" className="text-customprimary text-lg">
            <Link href="tel:+994500000000">+994 50 000 00 00</Link>
          </Button>
        </div> */}
        {/* <div className="flex flex-col sm:col-span-2 lg:col-span-1 gap-1 justify-center items-center">
          <MapPin className="size-16 bg-custom p-3 text-white rounded-full" />
          <h3 className="p-0 m-0">Office</h3>
          <Button
            variant="link"
            className="text-customprimary text-lg text-wrap"
          >
            <Link
              href="https://maps.app.goo.gl/ZWhfMzsPijn67dJK9"
              target="_blank"
            >
              Ahmadbey Aghaoglu str. 61 Baku, 1008
            </Link>
          </Button>
        </div> */}
      </div>
    </div>
  );
}
