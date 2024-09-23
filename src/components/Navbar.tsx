"use client";
import { useState, useEffect } from "react";
import { mainLogo } from "@/assets";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LanguageBox } from "./languageBox";
import { Button } from "./ui/button";
import { Menu, XIcon } from "lucide-react";
import CompetitionsBox from "./competitionsBox";
import Link from "next/link";
import useHash from "../lib/useHash"; // Import the custom hook

const menus = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "News",
    href: "/#news",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
  {
    title: "ALS Team",
    href: "/team",
  },
  {
    title: "Blog",
    href: "/blogs",
  },
];

const Navbar: React.FC = () => {
  const pathName = usePathname();
  const hash = useHash(); // Use the custom hook to get the current hash
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsSticky(scrollTop > 90);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScrollToHash = () => {
      if (hash && pathName === "/") {
        const targetId = hash.replace("#", "");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offset = -120; // Adjust offset as needed
          const topPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY +
            offset;

          window.scrollTo({
            top: topPosition,
            behavior: "smooth",
          });
        }
      }
    };

    // Call scroll when the hash changes
    handleScrollToHash();
  }, [hash, pathName]); // Trigger when hash or pathName changes

  const currentPathWithHash = pathName + hash;

  const isActiveMenu = (href: string) => {
    return href === currentPathWithHash;
  };

  return (
    <nav
      className={`${
        isSticky
          ? "bg-white shadow-lg sticky top-0 z-50 transition-all duration-100"
          : "bg-transparent"
      } grid grid-cols-2 xl:grid-cols-5 px-12 sm:px-20 mb-3 py-2 w-full`}
    >
      <div className="hidden col-span-2 xl:flex items-center justify-end xl:justify-start gap-4">
        {menus.map((menu, i) => (
          <Link
            href={menu.href}
            key={i}
            className={`hover:bg-custom-transparent p-2 rounded-md text-center ${
              isActiveMenu(menu.href) ? "bg-customprimary text-white" : ""
            }`}
          >
            {menu.title}
          </Link>
        ))}
      </div>
      <div className="xl:hidden flex justify-start xl:justify-center items-center z-30">
        <Button variant={"outline"} onClick={toggleMenu}>
          {!isOpen ? <Menu /> : <XIcon />}
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            src={mainLogo}
            alt="Law Society Logo"
            className="outline outline-offset-4 rounded-full bg-[#F8F8FF] p-1"
            width={90}
            height={90}
          />
        </Link>
      </div>
      <div className="flex items-center col-span-2 xl:col-span-2 justify-start xl:justify-end gap-5">
        <LanguageBox />
        <CompetitionsBox />
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white z-20 shadow-lg">
          <div className="flex flex-col items-center py-4">
            {menus.map((menu, i) => (
              <Link
                href={menu.href}
                key={i}
                onClick={() => {
                  setIsOpen(false);
                }}
                className={`hover:bg-custom-transparent p-3 px-10 rounded-md ${
                  isActiveMenu(menu.href) ? "bg-customprimary text-white" : ""
                }`}
              >
                {menu.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
