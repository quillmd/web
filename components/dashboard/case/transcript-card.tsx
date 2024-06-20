import LocalDateTime from "@/components/local-datetime";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Transcript } from "@/lib/transcript";
import { Check, LoaderCircle, X } from "lucide-react";

interface CaseCardProps extends React.HTMLAttributes<HTMLElement> {
  transcript: Transcript;
}

export default function TranscriptCard({ transcript }: CaseCardProps) {
  return (
    <Card className={`relative`}>
      <CardContent className="flex justify-between items-center p-4">
        <div className="flex flex-col justify-center w-full">
          <div className="flex w-full justify-between">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {transcript.type
                ? `${transcript.type
                    .charAt(0)
                    .toUpperCase()}${transcript.type.slice(1)}`
                : `New Input`}
            </h4>
            <Badge variant={"outline"}>
              {`${transcript.status
                .charAt(0)
                .toUpperCase()}${transcript.status.slice(1)}`}
              &nbsp;
              {transcript.status == "processing" ? (
                <LoaderCircle
                  size={16}
                  className={`animate-spin text-muted-foreground`}
                />
              ) : transcript.status == "error" ? (
                <X size={16} />
              ) : (
                <Check size={16} />
              )}
            </Badge>
          </div>
          <LocalDateTime
            className="text-sm text-muted-foreground"
            isoString={transcript.inserted_at}
          />
          <span className="text-sm text-muted-foreground">
            {transcript.status == "error" ? `Error:` : `Description:`}
          </span>
          <span className="text-sm text-muted-foreground">
            {transcript.status == "ready" || transcript.status == "error"
              ? transcript.description
              : "New input queued for processing"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
