"use client";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { mainLogo } from "@/assets";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Contact />
    </>
  );
}

function Hero() {
  const t = useTranslations("Hero");

  const handleLearnMoreClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="home"
      className="flex flex-col justify-center items-center gap-4 my-10 text-center w-full bg-[#346178] p-10 rounded-lg shadow-lg"
    >
      <h1 className="text-5xl font-extrabold text-[#F7F6F7] mb-4">
        ADA LAW SOCIETY
      </h1>
      <p className="text-2xl text-[#F7F6F7] max-w-lg mb-6">"Your Gateway to the Legal World"</p>
      <Button
        onClick={handleLearnMoreClick}
        className="bg-[#A85D71] text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-[#A5596B]"
      >
        {t("learnMore")}
      </Button>
    </div>
  );
}

function About() {
  const t = useTranslations("About");
  return (
    <div
      id="about"
      className="grid grid-cols-1 sm:grid-cols-2 w-full my-12 px-6 py-10 gap-6 bg-white rounded-lg shadow-md max-w-6xl mx-auto"
    >
      <div className="flex flex-col justify-center px-4 order-2 sm:order-1">
        <h1 className="text-3xl font-bold mb-4 text-[#346178]">{t("title")}</h1>
        <p className="max-w-md text-lg leading-relaxed">{t("description")}</p>
      </div>
      <div className="flex justify-center items-center order-1 sm:order-2">
        <Image
          src={mainLogo}
          alt="Main logo"
          width={300}
          height={300}
          className="object-cover bg-center rounded-lg"
        />
      </div>
    </div>
  );
}

function Contact() {
  const t = useTranslations("Contact");
  return (
    <div
      id="contact"
      className="text-center mb-10 mt-10 px-6 py-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-4 text-[#346178]">{t("title")}</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-10 mt-10">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="w-16 h-16 flex justify-center items-center bg-blue-600 text-white rounded-full shadow-lg">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-lg text-[#A85D71] mt-2">Email</h3>
          <Button
            variant="link"
            className="text-customprimary text-lg hover:underline"
          >
            <Link href="mailto:lawsociety@ada.edu.az">
              lawsociety@ada.edu.az
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
