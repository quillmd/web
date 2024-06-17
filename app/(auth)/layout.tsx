import Image from "next/image";
import NextLink from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      <header className="sticky top-0 z-50 bg-background p-2 px-16 mb-12">
        <nav className="flex justify-between items-center w-full">
          <NextLink href={"/"}>
            <Image
              src="/logo_text.svg"
              alt="Logo"
              width={70}
              height={36}
              className="logo cursor-pointer"
            />
          </NextLink>
        </nav>
      </header>
      {children}
    </body>
  );
}
