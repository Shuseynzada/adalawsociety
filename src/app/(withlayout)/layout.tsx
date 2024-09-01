import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ada Law Society",
  description: "Ada Law Society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "overflow-x-hidden")}>
        <Navbar />
        <main className="flex flex-col items-center justify-center">
          <div className="container max-w-7xl">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
