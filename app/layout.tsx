import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { IBM_Plex_Serif, Inter } from 'next/font/google'
import { IBM_Plex_Sans } from 'next/font/google'
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fontHeading = IBM_Plex_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: "700"
})

const fontBody = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: "500"
})

const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: "700"
})


export const metadata: Metadata = {
  title: "Squire",
  description: "AI Medical Scribe",
};

export default function RootLayout({ children }:Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable,
          fontMono.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}