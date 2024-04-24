import MobileMenu from "@/components/homepage/mobile-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EB_Garamond, Inter } from "next/font/google";
import Image from "next/image";
import NextLink from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, garamond.variable)}>
      <body className="font-garamond">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-background p-2 px-8 mb-12">
            <nav className="flex justify-between items-center w-full">
              <NextLink href={"/"}>
                <Image
                  src="/logo_text.svg"
                  alt="Logo"
                  width={80}
                  height={36}
                  className="logo cursor-pointer"
                />
              </NextLink>

              <ul className="hidden md:flex md:items-center md:gap-6">
                {/* <li>
                  <NextLink
                    href={"/howquillworks"}
                    className="text-lg font-semibold hover:underline"
                  >
                    How Quill Works
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    href={"/testimonials"}
                    className="text-lg font-semibold hover:underline"
                  >
                    Testimonials
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    href={"/pricing"}
                    className="text-lg font-semibold hover:underline"
                  >
                    Pricing
                  </NextLink>
                </li> */}
                <li>
                  <NextLink
                    href={"/about"}
                    className="text-lg font-semibold hover:underline"
                  >
                    About us
                  </NextLink>
                </li>
                <li className="hidden md:block">
                  <Button
                    variant={"outline"}
                    className="text-lg font-semibold"
                    size={"lg"}
                    asChild
                  >
                    <NextLink href={"/login"}>Login</NextLink>
                  </Button>
                </li>
              </ul>
              <div className="md:hidden">
                <MobileMenu />
              </div>
            </nav>
          </header>

          {/* Main */}
          {children}
          {/* Footer */}
          <footer className="w-full font-garamond flex items-center justify-between p-2 px-8 mt-12">
            <div className="w-1/4 hidden md:block">
              <Image src="/hippa.svg" alt="HIPAA" width={120} height={120} />
            </div>
            <div className="flex flex-1 justify-center">
              <ul className="flex gap-6">
                <li>
                  <a href="/privacypolicy" className="text-lg hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/contactus" className="text-lg hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/trustsafety" className="text-lg hover:underline">
                    Trust & Safety
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/4 hidden md:block" />
          </footer>
      </body>
    </html>
  );
}
