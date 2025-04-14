"use client";
import { useState, useEffect } from "react";
import { mainLogo } from "@/assets";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LanguageBox } from "./languageBox";
import { Button } from "./ui/button";
import { Menu, XIcon } from "lucide-react";
import CompetitionsBox from "./competitionsBox";
import useHash from "../lib/useHash";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const menus = [
  { key: "home", href: "/" },
  { key: "about", href: "/#about" },
  { key: "news", href: "/#news" },
  { key: "contact", href: "/#contact" },
  { key: "team", href: "/team" },
  { key: "blog", href: "/blogs" },
];

const Navbar: React.FC = () => {
  const pathName = usePathname();
  const hash = useHash();
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const t = useTranslations("Navbar");


  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = () => setIsSticky(window.scrollY > 90);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollToHash = () => {
      if (hash && pathName === "/") {
        const targetId = hash.replace("#", "");
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offset = -120; // Adjust offset as needed
          const topPosition =
            targetElement.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top: topPosition, behavior: "smooth" });
        }
      }
    };
    handleScrollToHash();
  }, [hash, pathName]);

  const currentPathWithHash = pathName.substring(3)
    ? pathName.substring(3)
    : "/" + hash;

  const isActiveMenu = (href: string) => href === currentPathWithHash;

  return (
    <nav
      className={`relative ${
        isSticky
          ? "bg-white shadow-lg sticky top-0 z-50 transition-all duration-100"
          : "bg-transparent"
      } px-6 sm:px-12 mb-3 py-2 w-full flex items-center`}
    >
      {/* Left Section */}
      <div className="flex items-center flex-1 min-w-0">
        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-2 flex-shrink-0">
          {menus.map((menu, i) => (
            <Link
              href={menu.href}
              key={i}
              className={`hover:bg-custom-transparent px-2 py-1 rounded-md text-center text-sm ${
                isActiveMenu(menu.href) ? "bg-customprimary text-white" : ""
              }`}
            >
              {t(menu.key)}
            </Link>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button variant="outline" onClick={toggleMenu}>
            {!isOpen ? <Menu /> : <XIcon />}
          </Button>
        </div>
      </div>

      {/* Center Logo */}
      <div className="flex items-center justify-center flex-none mx-4">
        <Link href="/">
          <Image
            src={mainLogo}
            alt="Law Society Logo"
            className="outline outline-offset-4 rounded-full bg-[#F8F8FF] p-1"
            width={70}
            height={70}
          />
        </Link>
      </div>

      {/* Right Section */}
      <div className="hidden sm:flex items-center flex-1 justify-end gap-3">
        <LanguageBox />
        <CompetitionsBox />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white z-20 shadow-lg">
          <div className="flex flex-col items-center py-4 gap-3">
            <CompetitionsBox />
            {menus.map((menu, i) => (
              <Link
                href={menu.href}
                key={i}
                onClick={() => setIsOpen(false)}
                className={`hover:bg-custom-transparent p-1 px-10 rounded-md ${
                  isActiveMenu(menu.href) ? "bg-customprimary text-white" : ""
                }`}
              >
                {t(menu.key)}
              </Link>
            ))}
            <LanguageBox />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
