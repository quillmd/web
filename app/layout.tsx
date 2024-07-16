import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import "./globals.css";
import {EB_Garamond} from "next/font/google"

// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-garamond" });
const sansFont = localFont({
  src: "./IBMPlexSans-Medium.ttf",
  variable: "--font-sans",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(sansFont.variable, garamond.variable)}>
      {children}
    </html>
  );
}
