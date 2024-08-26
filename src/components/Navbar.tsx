"use client";
import { useState, useEffect, MouseEvent } from "react";
import { mainLogo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageBox } from "./languageBox";
import { Button } from "./ui/button";
import { ArrowUpRight, Menu, XIcon } from "lucide-react";

const menus = [
  {
    title: "Home",
    href: "/#home",
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
];

const Navbar: React.FC = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home"); // Set initial state to "home"

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsSticky(scrollTop > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const options = {
      root: null,
      rootMargin: "-50px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // Update activeSection when section enters viewport
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const url = new URL(href, window.location.href); // Parse the URL

    // Extract the hash from the URL (i.e., #about)
    const targetId = url.hash;

    if (targetId) {
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offset = -120; // Adjust this offset as needed
        const topPosition =
          targetElement.getBoundingClientRect().top + window.scrollY + offset;

        // Smooth scroll to the position
        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });

        // Update the URL without reloading the page
        window.history.pushState({}, "", href);

        // Manually set active section after click
        setActiveSection(targetId.replace("#", ""));
      }
    }
  };

  const isActiveMenu = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.split("#")[1];
      return activeSection === sectionId;
    }
    return pathName === href;
  };

  return (
    <nav
      className={`${
        isSticky
          ? "bg-white shadow-lg sticky top-0 z-50 transition-all duration-100"
          : "bg-transparent"
      } grid grid-cols-2 xl:grid-cols-3 px-12 sm:px-20 mb-3 py-2 w-full`}
    >
      <div className="hidden xl:flex items-center justify-end xl:justify-start gap-4">
        {menus.map((menu, i) => (
          <a
            href={menu.href}
            key={i}
            onClick={(e) => handleClick(e, menu.href)}
          >
            <div
              className={`hover:bg-custom-transparent p-2 rounded-md text-center ${
                isActiveMenu(menu.href) ? "bg-customprimary text-white" : ""
              }`}
            >
              {menu.title}
            </div>
          </a>
        ))}
      </div>
      <div className="xl:hidden flex justify-start xl:justify-center items-center z-30">
        <Button variant={"outline"} className="" onClick={() => toggleMenu()}>
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
        {pathName !== "/competitions" ? (
          <Link href={"/competitions"}>
            <Button className="bg-custom">
              Competitions
              <ArrowUpRight />
            </Button>
          </Link>
        ) : null}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white z-20 shadow-lg">
          <div className="flex flex-col items-center py-4">
            {menus.map((menu, i) => (
              <a
                href={menu.href}
                key={i}
                onClick={(e) => {
                  handleClick(e, menu.href);
                  setIsOpen(false);
                }}
              >
                <div
                  className={`hover:bg-custom-transparent p-3 px-10 rounded-md ${
                    isActiveMenu(menu.href) ? "bg-customprimary text-white" : ""
                  }`}
                >
                  {menu.title}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
