"use client";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";

interface AccountSidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function AccountSidebar({ items }: AccountSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="top-16 z-50 fixed hidden md:sticky md:block h-[calc(100vh-4.5rem)] w-1/4 max-w-[300px] shrink-0">
      <ScrollArea className="h-full border rounded-lg p-2 flex flex-col justify-between bg-card">
        <div className="flex flex-col gap-4">
          <div className="p-2">
            <h4 className="font-semibold" suppressHydrationWarning={true}>
              {`Account Settings`}
            </h4>
          </div>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
