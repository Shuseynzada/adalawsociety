"use client"; // Ensure this is at the top of the file

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { azFlagIcon, enFlagIcon, placeholderImg } from "@/assets";
import Link from "next/link";
import { usePathname } from "next/navigation"; // For getting the current path

type Language = {
  label: string;
  value: string;
  icon?: string | StaticImageData;
};

const languages: Language[] = [
  {
    label: "English",
    value: "en",
    icon: enFlagIcon,
  },
  {
    label: "Azerbaijani",
    value: "az",
    icon: azFlagIcon,
  },
];

export function LanguageBox() {
  const pathname = usePathname(); // Get the current path without router
  const [language, setLanguage] = useState<string>("en"); // Default to English

  // You can derive the current locale from the URL path or a global state
  useEffect(() => {
    const currentLocale = pathname.split("/")[1]; // Assume locale is the first segment of the path
    if (languages.some((lang) => lang.value === currentLocale)) {
      setLanguage(currentLocale);
    }
  }, [pathname]);

  const selectedLanguage = languages.find((lang) => lang.value === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent">
          {selectedLanguage && selectedLanguage.icon ? (
            <Image
              src={selectedLanguage.icon}
              alt={selectedLanguage.label}
              width={24}
              height={24}
            />
          ) : (
            <Image src={placeholderImg} alt="Language" width={24} height={24} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(newLocale) => setLanguage(newLocale)}
        >
          {languages.map((lang) => (
            <Link key={lang.value} href={`/${lang.value}${pathname.slice(3)}`}>
              <DropdownMenuRadioItem
                value={lang.value}
                className="flex items-center"
              >
                <Image
                  src={lang.icon || placeholderImg}
                  alt={lang.label}
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <div>{lang.label}</div>
              </DropdownMenuRadioItem>
            </Link>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
