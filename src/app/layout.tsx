import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/ui/navbar/navbar";
import Header from "@/components/ui/header/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex items-center flex-col bg-[#F2F3F8] overflow-x-hidden">
        <Header />
        <div className="my-4 w-full px-2 md:px-10">{children}</div>
        <Toaster />
        <Navbar />
      </body>
    </html>
  );
}
