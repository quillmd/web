import AccountButton from "@/components/dashboard/account-button";
import CasesSidebar from "@/components/dashboard/cases-sidebar";
import CasesSocket from "@/components/dashboard/cases-socket";
import FeedbackForm from "@/components/dashboard/feedback-form";
import LogoutButton from "@/components/dashboard/logout-button";
import { getCases } from "@/lib/case";
import Image from "next/image";
import NextLink from "next/link";

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
  const initialCases = await getCases(initialFetchParams);
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
            <li className="block">
              <AccountButton />
            </li>
            <li className="block">
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex items-start max-w-7xl mx-auto gap-2 p-2">
        <CasesSidebar
          initialCases={initialCases}
          initialFetchParams={initialFetchParams}
        />
        <div className="flex-1">{children}</div>
      </div>
    </body>
  );
}
