import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Interview Portal",
  description: "Advanced AI Mock Interview Suite",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0B1120] text-slate-200 antialiased selection:bg-indigo-500/30 min-h-screen flex flex-col`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
