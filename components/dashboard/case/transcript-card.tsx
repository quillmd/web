import LocalDateTime from "@/components/local-datetime";
import { Badge } from "@/components/ui/badge";
import { Transcript } from "@/lib/transcript";
import { Check, LoaderCircle, X } from "lucide-react";

interface CaseCardProps extends React.HTMLAttributes<HTMLElement> {
  transcript: Transcript;
}

export default function TranscriptCard({ transcript }: CaseCardProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col justify-center w-full">
        <div className="flex justify-between w-full">
          <h4 className="font-semibold tracking-tight scroll-m-20">
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
          {`${transcript.status == "error" ? `Error:` : `Description:`} ${
            transcript.status == "ready" || transcript.status == "error"
              ? transcript.description
              : "New input queued for processing"
          }`}
        </span>
      </div>
    </div>
  );
}
