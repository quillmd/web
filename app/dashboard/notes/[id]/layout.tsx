import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import NextLink from "next/link";

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-5 md:p-10">
      <div className="mb-2">
        <Button variant={"outline"} size="icon" asChild>
          <NextLink href={"/dashboard/home/"}>
            <ChevronLeft />
          </NextLink>
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
}
