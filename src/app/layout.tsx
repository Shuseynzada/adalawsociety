import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script"; // Import Script component

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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T811M34K5H"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T811M34K5H');
            `,
          }}
        />
      </head>
      <body className={cn(inter.className, "overflow-x-hidden")}>
        {children}
      </body>
    </html>
  );
}
