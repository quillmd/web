import Subscribe from "@/components/account/subscribe";
import AccountButton from "@/components/dashboard/account-button";
import CasesSidebar from "@/components/dashboard/cases-sidebar";
import CasesSocket from "@/components/dashboard/cases-socket";
import FeedbackForm from "@/components/dashboard/feedback-form";
import LogoutButton from "@/components/dashboard/logout-button";
import { Account, getAccount } from "@/lib/account";
import { Case, getCases } from "@/lib/case";
import { DateTime } from "luxon";
import Image from "next/image";
import NextLink from "next/link";

interface InitialFetchParamsProps {
  days: number;
  query: string;
  from?: DateTime;
  to?: DateTime;
}

async function getData(initialFetchParams: InitialFetchParamsProps) {
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
  const initialFetchParams = {
    days: 10,
    query: "",
    from: undefined,
    to: undefined,
  };
  const { account, initialCases } = await getData(initialFetchParams);
  return (
    <body>
      <CasesSocket />
      <header className="sticky top-0 z-50 bg-background p-2 px-16">
        <nav className="flex justify-between items-center w-full">
          <NextLink href={"/home"}>
            <Image
              src="/logo_text.svg"
              alt="Logo"
              width={70}
              height={36}
              className="logo cursor-pointer"
            />
          </NextLink>
          <ul className="flex items-center gap-6">
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
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex items-start max-w-screen-2xl mx-auto gap-2 p-2">
        <CasesSidebar
          initialCases={initialCases}
          initialFetchParams={initialFetchParams}
        />
        <div className="flex-1">{children}</div>
      </div>
    </body>
  );
}
