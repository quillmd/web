import { AccountSidebar } from "@/components/account/account-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import NextLink from "next/link";
import { ThemeProvider } from "../theme-provider";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/account",
  },
  {
    title: "Subscription",
    href: "/account/subscription",
  },
  // {
  //   title: "Scribes",
  //   href: "/account/scribes",
  // },
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
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    >
      <header className="sticky top-0 z-50 bg-background p-2 px-8">
        <ul className="flex items-center gap-6 w-full justify-start">
          <li className="block">
            <NextLink href={"/home"}>
              <Button variant="secondary">
                <ArrowLeft className="mr-2" /> Back
              </Button>
            </NextLink>
          </li>
        </ul>
      </header>
      <div className="flex items-start max-w-7xl mx-auto gap-2 p-2">
        <AccountSidebar items={sidebarNavItems} />
        <div className="flex-1">{children}</div>
      </div>
    </ThemeProvider>
  );
}
