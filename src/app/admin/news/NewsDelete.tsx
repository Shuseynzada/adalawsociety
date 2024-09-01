"use client"
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { deleteNews } from "../_actions/news";
import { XSquareIcon } from "lucide-react";

const NewsDelete = ({id}:{id:number}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant="destructive"
      className="z-10"
      onClick={() => {
        console.log(0);
        startTransition(async () => {
          await deleteNews(id);
        });
      }}
    >
      <XSquareIcon />
    </Button>
  );
};

export default NewsDelete;
