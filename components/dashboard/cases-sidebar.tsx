"use client";
import { Case, CasesGroupedByDate } from "@/lib/case";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import NewCaseButton from "./home/new-case-button";

export default function CasesSidebar({
  casesGroupedByDate,
}: {
  casesGroupedByDate: CasesGroupedByDate;
}) {
  const pathname = usePathname();
  const regexCasesPathname = /\/cases\/(\d+)/;
  const casesArray = Object.entries(casesGroupedByDate);
  if (regexCasesPathname.test(pathname)) {
    return (
      <aside className="top-16 z-50 fixed hidden md:sticky md:block h-[calc(100vh-4.5rem)] w-1/4 max-w-[300px] shrink-0">
        <ScrollArea className="h-full p-2 border rounded-lg">
          <div className="flex flex-col gap-4">
            <NewCaseButton variant={"ghost"} />
            {casesArray.map(([date, casesForDate]) => (
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
      <h4 className="font-semibold">{text}</h4>
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
