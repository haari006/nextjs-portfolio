import './globals.css'
import StarsCanvas from "@/components/main/StarBackground";

import type { Metadata } from "next";
import clsx from "clsx";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: process.env.NEXT_TENANT_METADATA || "Haariharan Portfolio",
  description: "Trust me this is portfolio",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(
        "h-full scroll-smooth bg-black antialiased",
        inter.variable,
        lexend.variable
      )}
    >
      {" "}
      <body className="flex h-full ">
        <StarsCanvas />
        {children}
      </body>
    </html>
  );
}