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
import { azFlagIcon, enFlagIcon, placeholderImg, ruFlagIcon } from "@/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  {
    label: "Russian",
    value: "ru",
    icon: ruFlagIcon,
  },
];

export function LanguageBox() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const currentLocale = pathname.split("/")[1];
    if (languages.some((lang) => lang.value === currentLocale)) {
      setLanguage(currentLocale);
    }
  }, [pathname]);

  const selectedLanguage = languages.find((lang) => lang.value === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent">
          {selectedLanguage?.icon ? (
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
