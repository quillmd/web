import { Card, CardContent } from "@/components/ui/card";
import { Case } from "@/lib/case";
import { DateTime } from "luxon";
import NextLink from "next/link";

interface CaseCardProps extends React.HTMLAttributes<HTMLElement> {
  current_case: Case;
}

export default function CaseCard({ current_case }: CaseCardProps) {
  const path = `/cases/${current_case.id}`;
  return (
    <NextLink href={path}>
      <Card className={`relative ${"hover:border-blue-600 cursor-pointer"}`}>
        <CardContent className="flex justify-between items-center p-4">
          <div className="flex flex-col justify-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {current_case.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {DateTime.fromISO(current_case.inserted_at).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </NextLink>
  );
}
