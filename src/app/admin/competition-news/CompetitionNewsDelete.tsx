"use client";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { deleteCompetitionNews } from "../_actions/competition-news";
import { XSquareIcon } from "lucide-react";

const CompetitionNewsDelete = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant="destructive"
      className="z-10"
      onClick={() => {
        console.log(0);
        startTransition(async () => {
          await deleteCompetitionNews(id);
        });
      }}
    >
      <XSquareIcon />
    </Button>
  );
};

export default CompetitionNewsDelete;
