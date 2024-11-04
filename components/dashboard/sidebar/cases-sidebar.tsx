"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Case } from "@/lib/case";
import { CaseFetchParams, useCases } from "@/lib/useCases";
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CaseDeleteButton from "../case/case-delete-button";
import NewCaseButton from "../home/new-case-button";
import ThemeMenuItem from "./theme-menu-item";
import AppStoreMenuItem from "./app-store-menu-item";
import { Dialog } from "@/components/ui/dialog";

interface CasesSidebarProps extends React.HTMLAttributes<HTMLElement> {
  initialCases: Case[];
  initialFetchParams: CaseFetchParams;
}

export default function CasesSidebar({
  initialCases,
  initialFetchParams,
  children,
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
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <NewCaseButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {casesGroupedByDate?.map(([date, casesForDate]) => (
                <Collapsible
                  key={date}
                  open={accordionValue.includes(date)}
                  onOpenChange={(isOpen) => {
                    setAccordionValue(
                      isOpen
                        ? [...accordionValue, date]
                        : accordionValue.filter((v) => v !== date)
                    );
                  }}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {date}
                        <ChevronRight
                          className={`ml-auto transition-transform duration-200 ${
                            accordionValue.includes(date) && "rotate-90"
                          }`}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
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
                              casesForDate.find((c) => c.id != current_case.id)
                                ?.id
                            }
                          />
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
              {casesGroupedByDate &&
                fetchParams.days &&
                casesGroupedByDate.length >= fetchParams.days + 1 && (
                  <Button
                    className="w-full mt-4"
                    variant="ghost"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </Button>
                )}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
        <Dialog>
          <SidebarMenu>
            <SidebarMenuItem>
            
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">test</span>
                      <span className="truncate text-xs">test3</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">test</span>
                        <span className="truncate text-xs">test2</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                 <ThemeMenuItem/>
                 <AppStoreMenuItem/>
                 </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
            </SidebarMenuItem>
          </SidebarMenu>
          </Dialog>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="shadow-none">{children}</SidebarInset>
    </SidebarProvider>
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
  return (
    <SidebarMenuSubButton
      className={`pr-0 ${
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "hover:bg-sidebar-accent text-sidebar-accent-foreground"
      }`}
    >
      <NextLink
        className="w-full h-full items-center justify-start flex"
        href={`/cases/${id}`}
      >
        <span className={active ? "font-semibold" : ""}>{text}</span>
      </NextLink>
      {active && <CaseDeleteButton case_id={id} next_case_id={next_case_id} />}
    </SidebarMenuSubButton>
  );
}
