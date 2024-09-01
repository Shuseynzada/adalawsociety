import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center">
        <div className="container max-w-7xl">{children}</div>
      </main>
      <Footer />
    </>
  );
}
