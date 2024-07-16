"use client";
import { Case } from "@/lib/case";
import { CaseFetchParams, useCases } from "@/lib/useCases";
import { Search } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import NewCaseButton from "./home/new-case-button";
import { useTheme } from "next-themes";

interface CasesSidebarProps {
  initialCases: Case[];
  initialFetchParams: CaseFetchParams;
}

export default function CasesSidebar({
  initialCases,
  initialFetchParams,
}: CasesSidebarProps) {
  const { casesGroupedByDate, fetchParams, handleLoadMore, handleQuery } =
    useCases(initialCases, initialFetchParams);

  const pathname = usePathname();
  const regexCasesPathname = /\/cases\/[^/]+/;

  if (regexCasesPathname.test(pathname)) {
    return (
      <aside className="top-16 z-50 fixed hidden md:sticky md:block h-[calc(100vh-4.5rem)]">
        <ScrollArea className="h-full border rounded-lg p-2">
          <div className="flex flex-col w-72">
            <div className="flex flex-col gap-2 mb-2">
              <NewCaseButton variant={"ghost"} />
              <div className="relative w-11/12 mx-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={fetchParams.query}
                  onChange={handleQuery}
                  placeholder="Search"
                  className="pl-8 border-hidden"
                />
              </div>
            </div>
            {casesGroupedByDate?.map(([date, casesForDate], i) => (
              <div key={date}>
                {i != 0 && <Separator className="my-2" />}
                <SidebarSectionTitle text={date} />
                <div className="flex flex-col">
                  {casesForDate.map((current_case: Case) => (
                    <SidebarLabel
                      key={`sidebar-case-${current_case.id}`}
                      id={current_case.id}
                      text={current_case.title}
                      active={
                        pathname
                          .match(regexCasesPathname)?.[0]
                          .replace("/cases/", "") == `${current_case.id}`
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
            {casesGroupedByDate &&
              fetchParams.days &&
              casesGroupedByDate.length >= fetchParams.days + 1 && (
                <Button
                  className="w-full"
                  variant={"ghost"}
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
              )}
          </div>
        </ScrollArea>
      </aside>
    );
  }
  return null;
}

function SidebarSectionTitle({ text }: { text: string }) {
  return (
    <div className="p-2">
      <h4 className="font-semibold" suppressHydrationWarning={true}>
        {text}
      </h4>
    </div>
  );
}
function SidebarLabel({
  id,
  text,
  active,
}: {
  id: string;
  text: string;
  active: boolean;
}) {
  const {theme} = useTheme()
  if (active) {
    return (
      <Button className="w-full justify-start p-2" variant={theme=="dark"?"outline":"default"}>
        <span className="font-semibold">{text}</span>
      </Button>
    );
  }
  return (
    <NextLink href={`/cases/${id}`}>
      <Button className="w-full justify-start p-2" variant={"ghost"}>
        <span>{text}</span>
      </Button>
    </NextLink>
  );
}
