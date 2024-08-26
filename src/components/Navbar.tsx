"use client";
import { useState } from "react";
import { mainLogo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LanguageBox } from "./languageBox";
import { Button } from "./ui/button";
import { ArrowUpRight, Menu, XIcon } from "lucide-react";

const menus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Directors",
    href: "/directors",
  },
];

const Navbar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="grid grid-cols-2 xl:grid-cols-3 px-20 shadow-lg mb-3 py-2">
      <div className="hidden xl:flex items-center justfiy-end xl:justify-start gap-5">
        {menus.map((menu,i) => (
          <Link className="" href={menu.href} key={i}>
            <div
              className={`hover:bg-custom-transparent p-2 rounded-md ${
                pathName == menu.href ? "bg-customprimary text-white" : ""
              }`}
            >
              {menu.title}
            </div>
          </Link>
        ))}
      </div>
      <div className="xl:hidden flex justify-start xl:justify-center items-center">
        <Button variant={"outline"} onClick={() => toggleMenu()}>
          {!isOpen ? <Menu /> : <XIcon />}
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={mainLogo}
          alt="Law Society Logo"
          className="outline outline-offset-4 rounded-full bg-[#F8F8FF] p-1"
          width={90}
          height={90}
        />
      </div>
      <div className="flex items-center col-span-2 xl:col-span-1 justify-start xl:justify-end gap-5">
        <LanguageBox />
        {pathName != "/competitions" ? (
          <Link href={"/competitions"}>
            <Button className="bg-custom">
              Competitions
              <ArrowUpRight />
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
