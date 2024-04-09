// layout.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { EB_Garamond, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en" className={cn(inter.variable, garamond.variable)}>
      <body className="max-w-screen min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 left-0 right-0 z-50 px-6 py-2 bg-background font-garamond">
          <nav className="flex justify-between items-center w-full">
            <NextLink href={"/"}>
              <Image
                src="/logo_text.svg"
                alt="Logo"
                width={100}
                height={36}
                className="logo cursor-pointer"
              />
            </NextLink>
            <ul className="hidden md:flex">
              <li>
                <Button variant="ghost" size={"lg"} className="text-lg" asChild>
                  <NextLink href={"/homepage/howquillworks"}>How To Use</NextLink>
                </Button>
              </li>
              <li className="hidden md:block">
                <Button
                  variant={"outline"}
                  className="text-lg"
                  size={"lg"}
                  asChild
                >
                  <NextLink href={"/auth/login"}>Logout</NextLink>
                </Button>
              </li>
            </ul>
            <div className="md:hidden">
              <Button variant="ghost" size={"lg"} className="flex flex-col justify-center items-center gap-2" onClick={toggleMenu}>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-6 h-0.5 bg-black"></div>
              </Button>
            </div>
          </nav>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center font-garamond">
            <Button
              variant="ghost"
              size={"lg"}
              className="text-lg absolute top-6 right-6"
              onClick={toggleMenu}
            >
              Close
            </Button>
            <ul className="flex flex-col space-y-16 text-center">
              {/*
              <li>
                <Button variant="ghost" size={"lg"} className="text-3xl" asChild>
                  <NextLink href={"/about"} onClick={toggleMenu}>How Quill Works</NextLink>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size={"lg"} className="text-3xl" asChild>
                  <NextLink href={"/testimonials"} onClick={toggleMenu}>Testimonials</NextLink>
                </Button>
              </li>
              */}
              <li>
                <Button variant="ghost" size={"lg"} className="text-3xl" asChild>
                  <NextLink href={"/homepage/pricing"} onClick={toggleMenu}>Pricing</NextLink>
                </Button>
              </li>
              <li>
                <Button variant="ghost" size={"lg"} className="text-3xl" asChild>
                  <NextLink href={"/homepage/about"} onClick={toggleMenu}>About us</NextLink>
                </Button>
              </li>
            </ul>
          </div>
        )}

        <div className="flex-grow">
          <main className="font-garamond overflow-x-hidden">
            {children}
          </main>
        </div>

        {/* Footer */}
      </body>
    </html>
  );
}