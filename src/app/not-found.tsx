"use client"
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

function notFound() {

  const pathName = usePathname()

  return (
    <div>
      {pathName}
    </div>
  );
}

export default notFound;
