"use client";
import { useState } from "react";
import { mainLogo } from "@/assets";
import Image from "next/image";
import Link from "next/link";

const menus = [
  {
    title: "Home",
    href: "/",
    isActive: true,
  },
  {
    title: "About",
    href: "/about",
    isActive: false,
  },
  {
    title: "Services",
    href: "/services",
    isActive: false,
  },
    {
      title: "Contact",
      href: "/contact",
      isActive: false,
    },

];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex py-5 px-10 justify-between items-center bg-primary">
      <div className="flex items-center">
        <Image
          src={mainLogo}
          alt="Law Society Logo"
          className="outline outline-offset-4 rounded-full outline-gray-600"
          width={60}
          height={60}
        />
        <h1 className="ml-3 text-white font-bold text-lg">Law Society</h1>
      </div>
      <div className="hidden md:flex space-x-6">
        {menus.map((menu, index) => (
          <Link
            key={index}
            href={menu.href}
            className={`text-white ${
              menu.isActive ? "font-semibold" : "font-normal"
            }`}
          >
            {menu.title}
          </Link>
        ))}
      </div>
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        {/* Hamburger Icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          ></path>
        </svg>
      </button>

      {/* Collapsible Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 w-full bg-primary shadow-md`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4">
          {menus.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.href}
                className={`text-white ${
                  menu.isActive ? "font-semibold" : "font-normal"
                }`}
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
