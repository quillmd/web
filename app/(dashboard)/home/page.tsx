import CaseCard from "@/components/dashboard/home/case-card";
import NewCaseButton from "@/components/dashboard/home/new-case-button";
import { Case, getCasesGroupedByDate } from "@/lib/case";


export default async function HomePage() {
  const cases = await getCasesGroupedByDate();
  const casesArray = Object.entries(cases);

  return (
    <main className="mx-auto pt-4">
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        All Cases
      </h2>
      <NewCaseButton/>
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