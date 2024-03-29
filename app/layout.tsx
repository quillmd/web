import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Quill",
  description: "Effortless documentation with an AI scribe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, garamond.variable)}>{children}</body>
    </html>
  );
}
