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
    key: "debat",
    path: "/debat",
  },
  {
    key: "moot",
    path: "/mootcourt",
  },
];

const CompetitionsBox = () => {

  const t = useTranslations("competitions");

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
          <DropdownMenuItem key={competition.key} asChild>
            <Link href={competition.path}>{t(competition.key)}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompetitionsBox;
