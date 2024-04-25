import LogoutButton from "@/components/dashboard/logout-button";
import Image from "next/image";
import NextLink from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background p-2 px-8">
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

          <ul className="flex items-center gap-6">
            <li className="block">
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </body>
  );
}
