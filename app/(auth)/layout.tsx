import Image from "next/image";
import NextLink from "next/link";
import logotype from "../../public/logotype_green.webp";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="sticky top-0 z-50 bg-background p-2 px-16 mb-12">
        <nav className="flex justify-between items-center w-full">
          <NextLink href={"/"}>
            <Image
              src={logotype}
              width={100}
              height={100}
              alt="Logo"
              className="cursor-pointer logo object-contain"
            />
          </NextLink>
        </nav>
      </header>
      {children}
    </div>
  );
}
