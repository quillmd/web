import CasesSidebar from "@/components/dashboard/cases-sidebar";
import CasesSocket from "@/components/dashboard/cases-socket";
import LogoutButton from "@/components/dashboard/logout-button";
import { getCasesGroupedByDate } from "@/lib/case";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const casesGroupedByDate = await getCasesGroupedByDate();
  return (
    <body>
      <CasesSocket />
      <header className="sticky top-0 z-50 bg-background p-2 px-8">
        <nav className="flex justify-end items-center w-full">
          <ul className="flex items-center gap-6">
            <li className="block">
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex items-start max-w-7xl mx-auto gap-2 p-2">
        <CasesSidebar casesGroupedByDate={casesGroupedByDate} />
        <div className="flex-1">{children}</div>
      </div>
    </body>
  );
}
