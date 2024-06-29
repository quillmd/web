import { Case, CasesGroupedByDate, getCases } from "@/lib/case";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export interface CaseFetchParams {
  days: number;
  query: string;
  from?: DateTime;
  to?: DateTime;
}

export function useCases(
  initialCases: Case[],
  initialFetchParams: CaseFetchParams
) {
  const [fetchParams, setFetchParams] =
    useState<CaseFetchParams>(initialFetchParams);
  const [casesGroupedByDate, setCasesGroupedByDate] = useState<
    [string, Case[]][] | undefined
  >();

  useEffect(() => {
    setCasesGroupedByDate(groupCasesByDate(initialCases));
  }, [initialCases]);

  useEffect(() => {
    getCases({
      days: fetchParams.query.length === 0 ? fetchParams.days : 9999,
      query: fetchParams.query,
    }).then((cases) => setCasesGroupedByDate(groupCasesByDate(cases)));
  }, [fetchParams]);

  const handleLoadMore = () => {
    setFetchParams({
      ...fetchParams,
      days: 9999,
    });
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFetchParams({
      ...fetchParams,
      query: e.target.value.length === 0 ? "" : e.target.value,
    });
  };

  return {
    casesGroupedByDate,
    fetchParams,
    handleLoadMore,
    handleQuery,
  };
}

function groupCasesByDate(cases: Case[]): [string, Case[]][] {
  return Object.entries(
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
  );
}
