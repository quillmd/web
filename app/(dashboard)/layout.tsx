import { AccountProvider } from "@/components/dashboard/account-provider";
import CasesSocket from "@/components/dashboard/cases-socket";
import CasesSidebar from "@/components/dashboard/sidebar/cases-sidebar";
import { Account, getAccount } from "@/lib/account";
import { Case, getCases } from "@/lib/case";
import { CaseFetchParams } from "@/lib/useCases";
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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CasesSocket />
      <AccountProvider account={account}>
        <CasesSidebar
          initialCases={initialCases}
          initialFetchParams={initialFetchParams}
        >
          {children}
        </CasesSidebar>
      </AccountProvider>
    </ThemeProvider>
  );
}
