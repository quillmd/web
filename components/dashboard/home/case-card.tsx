import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
      <Card className={`${"hover:border-amber-900 cursor-pointer"} truncate`}>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex flex-col justify-center">
            <CardTitle className="p-0">{current_case.title}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {DateTime.fromISO(current_case.inserted_at).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </span>
          </div>
        </CardContent>
      </Card>
    </NextLink>
  );
}
