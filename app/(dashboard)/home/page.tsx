import { getCases } from "@/lib/case";
import CaseCard from "@/components/home/case-card";

export default async function HomePage() {
  const cases = await getCases();
  return (
    <div className="max-w-screen-lg mx-auto pt-4">
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        All Cases
      </h2>
      {/* Updated the container to use grid instead of flex and specify 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cases.map((current_case) => (
          <CaseCard
            key={`case-${current_case.id}`}
            current_case={current_case}
          />
        ))}
      </div>
    </div>
  );
}
