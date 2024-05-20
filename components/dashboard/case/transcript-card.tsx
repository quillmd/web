import { Card, CardContent } from "@/components/ui/card";
import { Transcript } from "@/lib/transcript";
import { DateTime } from "luxon";

interface CaseCardProps extends React.HTMLAttributes<HTMLElement> {
  transcript: Transcript;
}

export default function TranscriptCard({ transcript }: CaseCardProps) {
  return (
    <Card className={`relative`}>
      <CardContent className="flex justify-between items-center p-4">
        <div className="flex flex-col justify-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {`${transcript.type?.charAt(0).toUpperCase()}${transcript.type?.slice(
              1
            )}`}
          </h4>
          <span className="text-sm text-muted-foreground">
            {DateTime.fromISO(transcript.inserted_at).toLocaleString(
              DateTime.DATETIME_SHORT
            )}
          </span>
          <span className="text-sm text-muted-foreground">Description:</span>
          <span className="text-sm text-muted-foreground">
            {transcript.description}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
