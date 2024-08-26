"use client";
import { usePathname } from "next/navigation";
import React from "react";

function NotFound() {
  const pathName = usePathname();

  return (
    <div>
      {pathName}
    </div>
  );
}

export default NotFound;
