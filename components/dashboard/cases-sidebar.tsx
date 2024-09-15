"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Case } from "@/lib/case";
import { CaseFetchParams, useCases } from "@/lib/useCases";
import { Search } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CaseDeleteButton from "./case/case-delete-button";
import NewCaseButton from "./home/new-case-button";

interface CasesSidebarProps {
  initialCases: Case[];
  initialFetchParams: CaseFetchParams;
}

export default function CasesSidebar({
  initialCases,
  initialFetchParams,
}: CasesSidebarProps) {
  const [accordionValue, setAccordionValue] = useState<string[]>([]);
  const { casesGroupedByDate, fetchParams, handleLoadMore, handleQuery } =
    useCases(initialCases, initialFetchParams);

  const pathname = usePathname();
  const regexCasesPathname = /\/cases\/[^/]+/;

  const defaultOpenSection = useMemo(() => {
    const currentCaseId = pathname
      .match(regexCasesPathname)?.[0]
      .replace("/cases/", "");
    if (currentCaseId && casesGroupedByDate?.length) {
      for (const [date, casesForDate] of casesGroupedByDate) {
        if (casesForDate.some((c) => c.id === currentCaseId)) {
          return [date];
        }
      }
    }
    return casesGroupedByDate?.length ? [casesGroupedByDate?.[0][0]] : [];
  }, [pathname, casesGroupedByDate]);

  useEffect(() => {
    setAccordionValue(defaultOpenSection);
  }, [defaultOpenSection]);

  return (
    <aside className="top-16 z-50 fixed hidden md:sticky md:block h-[calc(100vh-4.5rem)]">
      <ScrollArea className="bg-card h-full border rounded-lg p-2">
        <div className="flex flex-col w-72">
          <div className="flex flex-col gap-2 mb-2">
            <NewCaseButton variant={"secondary"} />
            {/* <div className="relative w-full mx-auto bg-background">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={fetchParams.query}
                onChange={handleQuery}
                placeholder="Search"
                className="pl-8 h-10"
              />
            </div> */}
          </div>
          {casesGroupedByDate && (
            <Accordion
              type="multiple"
              value={accordionValue}
              onValueChange={(newValue) => setAccordionValue(newValue)}
            >
              {casesGroupedByDate?.map(([date, casesForDate], i) => (
                <AccordionItem key={date} value={date}>
                  <AccordionTrigger>
                    <SidebarSectionTitle text={date} />
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col">
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
                        next_case_id={
                          casesForDate.find((c) => c.id != current_case.id)?.id
                        }
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
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
  next_case_id,
}: {
  id: string;
  text: string;
  active: boolean;
  next_case_id?: string;
}) {
  if (active) {
    return (
      <div className="px-2 h-14 inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full justify-between bg-accent text-accent-foreground">
        <NextLink
          className="w-full h-full items-center justify-start flex"
          href={`/cases/${id}`}
        >
          <span className="font-semibold">{text}</span>
        </NextLink>
        <CaseDeleteButton case_id={id} next_case_id={next_case_id} />
      </div>
    );
  }
  return (
    <div className="px-2 h-14 inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full justify-between hover:bg-accent hover:text-accent-foreground">
      <NextLink
        className="w-full h-full items-center justify-start flex"
        href={`/cases/${id}`}
      >
        <span>{text}</span>
      </NextLink>
    </div>
  );
}
