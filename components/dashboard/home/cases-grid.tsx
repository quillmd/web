"use client";
import CaseCard from "@/components/dashboard/home/case-card";
import { Input } from "@/components/ui/input";
import { Case } from "@/lib/case";
import { CaseFetchParams, useCases } from "@/lib/useCases";
import { Search } from "lucide-react";

interface CasesGridProps {
  initialCases: Case[];
  initialFetchParams: CaseFetchParams;
  showSearch: boolean;
}

export default function CasesGrid({
  initialCases,
  initialFetchParams,
  showSearch,
}: CasesGridProps) {
  const { casesGroupedByDate, fetchParams, handleLoadMore, handleQuery } =
    useCases(initialCases, initialFetchParams);

  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      {showSearch && (
        <div className="relative mb-8">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={fetchParams.query}
            onChange={handleQuery}
            placeholder="Search cases"
            className="pl-8"
          />
        </div>
      )}

      {casesGroupedByDate?.map(([date, casesForDate]) => (
        <div key={date}>
          <h3 className="font-semibold tracking-tight scroll-m-20">{date}</h3>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
            {casesForDate.map((current_case: Case) => (
              <CaseCard
                key={`case-${current_case.id}`}
                current_case={current_case}
              />
            ))}
          </div>
          <hr className="my-4 border-t border-gray-200" />
        </div>
      ))}
    </div>
  );
}
