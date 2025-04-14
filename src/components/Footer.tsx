"use client";
import { mainLogo } from "@/assets";
import Image from "next/image";
import { Button } from "./ui/button";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { addEmail } from "@/lib/addEmail";
import { useState } from "react";

const Footer = () => {
  const t = useTranslations("Footer");
  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    const response = await addEmail(formData);

    if (response.success) {
      setMessage(response.message);
      setEmail(""); // Clear the email field on success
    } else {
      setMessage(response.message);
    }
  };

  return (
    <div className="px-20 mt-5 pt-10 shadow-inner">
      <div className="grid sm:grid-cols-2">
        <div>
          <Image
            src={mainLogo}
            alt="Law Society Logo"
            className="outline outline-offset-4 rounded-full bg-[#F8F8FF] p-1 mx-auto sm:mx-0"
            width={90}
            height={90}
          />
          <span>{t("join")}</span>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("enterMail")}
              className="text-lg border border-black px-2 py-1 w-full"
              type="email"
              required
            />
            <Button
              variant="outline"
              className="border border-black rounded-none"
            >
              {t("subscribe")}
            </Button>
          </form>
          {message && <p className="mt-2">{message}</p>}
        </div>
        <div className="sm:px-10 md:px-20">
          <h3>{t("follow")}</h3>
          <ul className="p-2 flex flex-col gap-4">
            <Link href="https://www.facebook.com/adalawsociety" target="_blank">
              <li className="flex gap-3">
                <Facebook /> Facebook{" "}
              </li>
            </Link>
            <hr className="w-[10rem]" />
            <Link
              href="https://www.instagram.com/adalawsociety"
              target="_blank"
            >
              <li className="flex gap-3">
                <Instagram /> Instagram{" "}
              </li>
            </Link>
            <hr className="w-[10rem]" />
            <Link
              href="https://www.linkedin.com/company/ada-law-society"
              target="_blank"
            >
              <li className="flex gap-3">
                <Linkedin /> Linkedin{" "}
              </li>
            </Link>
            <hr className="w-[10rem]" />
            <Link
              href="https://www.youtube.com/@ADALawSociety"
              target="_blank"
            >
              <li className="flex gap-3">
                <Youtube /> YouTube{" "}
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="h-[1px] w-full bg-black my-1"></div>
      <div className="text-end font-medium mb-5 mt-3">
        © 2024 ADA Law Society. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
