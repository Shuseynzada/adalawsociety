"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
        <Button className="bg-custom">
          Competitions
          <ArrowUpRight />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Select language</DropdownMenuLabel>
    <DropdownMenuSeparator /> */}
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