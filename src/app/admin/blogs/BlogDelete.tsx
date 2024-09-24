"use client";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { deleteBlog } from "../_actions/blogs";
import { XSquareIcon } from "lucide-react";

const BlogDelete = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant="destructive"
      className="z-10"
      onClick={() => {
        console.log(0);
        startTransition(async () => {
          await deleteBlog(id);
        });
      }}
    >
      <XSquareIcon />
    </Button>
  );
};

export default BlogDelete;
