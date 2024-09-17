"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const competitions = [
  {
    label: "Debat",
    path: "/debat",
  },
  {
    label: "MoodCourt",
    path: "/mood",
  },
];

const CompetitionsBox = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href={"/competitions"}>
          <Button className="bg-custom">
            Competitions
            <ArrowUpRight />
          </Button>
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Select language</DropdownMenuLabel>
    <DropdownMenuSeparator /> */}
        {competitions.map((competition) => (
          <DropdownMenuItem key={competition.label}>
            <Link href={competition.path}>{competition.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompetitionsBox;
