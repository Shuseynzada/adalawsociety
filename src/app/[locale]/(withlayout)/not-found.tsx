"use client";
import { usePathname } from "next/navigation";
import React from "react";

function NotFound() {
  const pathName = usePathname();

  return (
    <div className="text-center m-20 font-medium text-xl">
      Page not found
    </div>
  );
}

export default NotFound;
