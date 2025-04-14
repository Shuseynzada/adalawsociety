import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
const competitions = [
  {
    label: "Debates",
    path: "/debat",
  },
  {
    label: "Moot Court",
    path: "/mootcourt",
  },
];

const CompetitionsBox = () => {

  const t = useTranslations("Navbar");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-custom">
          {t("competitions")}
          <ArrowUpRight />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {competitions.map((competition) => (
          <DropdownMenuItem key={competition.label} asChild>
            <Link href={competition.path}>{competition.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompetitionsBox;
