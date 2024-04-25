import { getCases } from "@/lib/case";
import CaseCard from "@/components/dashboard/home/case-card";
import { DateTime } from "luxon";
import { Case } from "@/lib/case";

type GroupedCases = {
  [date: string]: Case[];
};

export default async function HomePage() {
  const cases = await getCases();

  // Group cases by date based on the inserted_at parameter using Luxon DateTime
  const groupedCases: GroupedCases = cases.reduce((acc: GroupedCases, current_case: Case) => {
    const date: string = DateTime.fromISO(current_case.inserted_at).toLocaleString(DateTime.DATE_SHORT);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(current_case);
    return acc;
  }, {} as GroupedCases);

  // Convert the grouped cases object to an array of arrays
  const casesArray = Object.entries(groupedCases);

  return (
    <main className="max-w-screen-lg mx-auto pt-4">
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        All Cases
      </h2>
      {casesArray.map(([date, casesForDate]) => (
        <div key={date}>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            {date}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {casesForDate.map((current_case:Case) => (
              <CaseCard key={`case-${current_case.id}`} current_case={current_case} />
            ))}
          </div>
          <hr className="my-8 border-t border-gray-200" />
        </div>
      ))}
    </main>
  );
}