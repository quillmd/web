import CasesSocket from "@/components/dashboard/cases-socket";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { Account, getAccount } from "@/lib/account";
import { Case, getCases } from "@/lib/case";
import { CaseFetchParams } from "@/lib/useCases";

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
    <body className="min-h-screen tracking-tight">
      <CasesSocket />
      <div className="flex w-full min-h-screen">
        <DashboardSidebar
          initialCases={initialCases}
          initialFetchParams={initialFetchParams}
        />
        <div className="flex-1 py-10">{children}</div>
      </div>
    </body>
  );
}
