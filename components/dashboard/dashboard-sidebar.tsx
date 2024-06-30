"use client";
import FeedbackForm from "@/components/dashboard/feedback-form";
import NewCaseButton from "@/components/dashboard/home/new-case-button";
import LogoutButton from "@/components/dashboard/logout-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Case } from "@/lib/case";
import { CaseFetchParams, useCases } from "@/lib/useCases";
import { Search, Settings } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface DashboardSidebarProps {
  initialCases: Case[];
  initialFetchParams: CaseFetchParams;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  initialCases,
  initialFetchParams,
}) => {
  const pathname = usePathname();
  const { casesGroupedByDate, fetchParams, handleLoadMore, handleQuery } =
    useCases(initialCases, initialFetchParams);

  return (
    <nav className="fixed top-0 bottom-0 left-0 z-20 h-screen overflow-hidden transition-all duration-300 ease-in-out bg-transparent hover:bg-background hover:border-r-primary hover:border-r w-18 group">
      <div className="flex h-full flex-col gap-2 px-3 pb-4 pt-2.5 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 opacity-0 group-hover:opacity-100 max-w-72">
        <NextLink href="/home">
          <Image
            src="/logo_text.svg"
            alt="Logo"
            width={70}
            height={36}
            className="mb-4 cursor-pointer logo"
          />
        </NextLink>
        <div className="flex-grow overflow-hidden">
          <NewCaseButton variant="outline" className="w-full mb-2" />
          <div className="relative mb-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={fetchParams.query}
              onChange={handleQuery}
              placeholder="Search cases"
              className="pl-8"
            />
          </div>

          <div>
            {casesGroupedByDate?.map(([date, casesForDate], i) => (
              <div key={date}>
                <h3 className="text-text-300 mb-1 mt-1 text-sm font-bold">
                  {date}
                </h3>
                <ul className="flex flex-col gap-0.5">
                  {casesForDate.map((current_case: Case) => (
                    <NextLink
                      key={current_case.id}
                      href={`/cases/${current_case.id}`}
                    >
                      <Button
                        variant={
                          pathname === `/cases/${current_case.id}`
                            ? "secondary"
                            : "ghost"
                        }
                        size="sm"
                        className="text-text-200 text-sm justify-start w-full"
                      >
                        {current_case.title}
                      </Button>
                    </NextLink>
                  ))}
                </ul>
              </div>
            ))}
            {casesGroupedByDate &&
              fetchParams.days &&
              casesGroupedByDate.length >= fetchParams.days + 1 && (
                <Button
                  className="w-full mt-2"
                  variant="link"
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
              )}
          </div>
        </div>
        <div>
          <FeedbackForm />
          <NextLink href="/account">
            <Button variant="ghost" className="justify-start w-full">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
          </NextLink>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
