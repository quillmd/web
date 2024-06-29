import CasesGrid from "@/components/dashboard/home/cases-grid";
import { getCases } from "@/lib/case";

export default async function HomeAllPage() {
  const initialFetchParams = {
    days: 9999,
    query: "",
  };
  const cases = await getCases(initialFetchParams);

  return (
    <div className="max-w-4xl mx-auto">
      <CasesGrid
        initialCases={cases}
        initialFetchParams={initialFetchParams}
        showSearch={true}
      />
    </div>
  );
}
