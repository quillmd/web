import Subscribe from "@/components/account/subscribe";
import AccountButton from "@/components/dashboard/account-button";
import CasesSidebar from "@/components/dashboard/cases-sidebar";
import CasesSocket from "@/components/dashboard/cases-socket";
import FeedbackForm from "@/components/dashboard/feedback-form";
import LogoutButton from "@/components/dashboard/logout-button";
import { Account, getAccount } from "@/lib/account";
import { Case, getCases } from "@/lib/case";
import { CaseFetchParams } from "@/lib/useCases";
import Image from "next/image";
import NextLink from "next/link";
import ThemeToggle from "../../components/dashboard/theme-toggle";
import logotypeLight from "../../public/logotype_green.webp";
import logotypeDark from "../../public/logotype_white.webp";
import { ThemeProvider } from "../theme-provider";

export const initialFetchParams = {
  days: 10,
  query: "",
  from: undefined,
  to: undefined,
};

async function getData(initialFetchParams: CaseFetchParams) {
  const promiseArray = [getAccount(), getCases(initialFetchParams)];
  const results = await Promise.all(promiseArray);
  return {
    account: results[0] as Account,
    initialCases: results[1] as Case[],
  };
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { account, initialCases } = await getData(initialFetchParams);
  return (
    <body>
      <CasesSocket />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <header className="sticky top-0 z-50 p-2 px-16 bg-background">
          <nav className="flex items-center justify-between w-full">
            <NextLink href={"/home"}>
              <Image
                src={logotypeLight}
                width={120}
                height={120}
                alt="Logo"
                className="cursor-pointer logo dark:hidden object-contain"
              />
              <Image
                src={logotypeDark}
                width={120}
                height={120}
                alt="Logo"
                className="cursor-pointer logo hidden dark:block object-contain"
              />
            </NextLink>
            <ul className="flex items-center gap-4">
              <li className="block">
                <FeedbackForm />
              </li>
              {!account.subscription_exempt && !account.subscription && (
                <li className="block">
                  <Subscribe />
                </li>
              )}
              <li className="block">
                <AccountButton />
              </li>
              <li className="block">
                <ThemeToggle />
              </li>
              <li className="block">
                <LogoutButton />
              </li>
            </ul>
          </nav>
        </header>
        <div className="flex items-start max-w-screen-2xl mx-auto gap-2 p-2 max-h-[calc(100vh-18rem)]">
          <CasesSidebar
            initialCases={initialCases}
            initialFetchParams={initialFetchParams}
          />
          <div className="flex-1">{children}</div>
        </div>
      </ThemeProvider>
    </body>
  );
}
