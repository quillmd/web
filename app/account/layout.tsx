import { AccountSidebar } from "@/components/account/account-sidebar";
import LogoutButton from "@/components/dashboard/logout-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import NextLink from "next/link";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/account",
  },
  {
    title: "Subscription",
    href: "/account/subscription",
  },
  {
    title: "Templates",
    href: "/account/templates",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <body>
      <header className="sticky top-0 z-50 bg-background p-2 px-8">
        <ul className="flex items-center gap-6 w-full justify-between">
          <li className="block">
            <NextLink href={"/home"}>
              <Button variant="ghost" size={"icon"}>
                <ArrowLeft />
              </Button>
            </NextLink>
          </li>
          <li className="block">
            <LogoutButton />
          </li>
        </ul>
      </header>
      <div className="flex items-start max-w-7xl mx-auto gap-2 p-2">
        <AccountSidebar items={sidebarNavItems} />
        <div className="flex-1 mt-2">{children}</div>
      </div>
    </body>
  );
}
