"use client";
import { Case, CasesGroupedByDate, getCases } from "@/lib/case";
import { Search } from "lucide-react";
import { DateTime } from "luxon";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import NewCaseButton from "./home/new-case-button";

export default function CasesSidebar() {
  const [fetchParams, setFetchParams] = useState({
    days: 5,
    query: "",
    from: undefined,
    to: undefined,
  });

  const [casesGroupedByDate, setCasesGroupedByDate] = useState<
    [string, Case[]][] | undefined
  >();

  useEffect(() => {
    getCases({
      days: fetchParams.query.length == 0 ? fetchParams.days : 9999,
      query: fetchParams.query,
    }).then((cases) =>
      setCasesGroupedByDate(
        Object.entries(
          cases.reduce((acc: CasesGroupedByDate, current_case: Case) => {
            const date: string = DateTime.fromISO(
              current_case.inserted_at
            ).toLocaleString(DateTime.DATE_SHORT);
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(current_case);
            return acc;
          }, {} as CasesGroupedByDate)
        )
      )
    );
  }, [fetchParams]);

  const handleLoadMore = () => {
    setFetchParams({
      ...fetchParams,
      days: fetchParams.days + 500,
    });
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFetchParams({
      ...fetchParams,
      query: e.target.value,
    });
  };

  const pathname = usePathname();
  const regexCasesPathname = /\/cases\/(\d+)/;
  if (regexCasesPathname.test(pathname)) {
    return (
      <aside className="top-16 z-50 fixed hidden md:sticky md:block h-[calc(100vh-4.5rem)] w-1/4 max-w-[300px] shrink-0">
        <ScrollArea className="h-full border rounded-lg p-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <NewCaseButton variant={"ghost"} />
              {/* <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={fetchParams.query}
                  onChange={handleQuery}
                  placeholder="Search"
                  className="pl-8 border-hidden"
                />
              </div> */}
            </div>
            {casesGroupedByDate?.map(([date, casesForDate]) => (
              <div key={date}>
                <SidebarSectionTitle text={date} />
                <div className="flex flex-col">
                  {casesForDate.map((current_case: Case) => (
                    <SidebarLabel
                      key={`sidebar-case-${current_case.id}`}
                      id={current_case.id}
                      text={current_case.title}
                      active={
                        pathname.match(regexCasesPathname)?.[1] ==
                        `${current_case.id}`
                      }
                    />
                  ))}
                </div>
                <Separator />
              </div>
            ))}
            <Button
              className="w-full"
              variant={"ghost"}
              onClick={handleLoadMore}
            >
              Load More
            </Button>
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
  id: number;
  text: string;
  active: boolean;
}) {
  if (active) {
    return (
      <Button className="w-full justify-start p-2" variant={"outline"}>
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
