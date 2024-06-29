import CasesGrid from "@/components/dashboard/home/cases-grid";
import NewCase from "@/components/dashboard/home/new-case";
import { getCases } from "@/lib/case";
import NextLink from "next/link";
import { initialFetchParams } from "../layout";

export default async function HomePage() {
  const cases = await getCases(initialFetchParams);
  return (
    <div className="flex flex-col max-w-3xl mx-auto">
      <div className="max-w-md mx-auto mb-12">
        <NewCase />
      </div>
      <CasesGrid
        initialCases={cases}
        initialFetchParams={initialFetchParams}
        showSearch={false}
      />
      <div>
        <div className="flex justify-center w-full h-20">
          <NextLink href={"/home/all"}>{`View all ->`}</NextLink>
        </div>
      </div>
    </div>
  );
}
