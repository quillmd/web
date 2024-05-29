import LocalDateTime from "@/components/local-datetime";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Case } from "@/lib/case";
import { Note } from "@/lib/note";
import { Check, LoaderCircle } from "lucide-react";
import NextLink from "next/link";

interface CaseCardProps extends React.HTMLAttributes<HTMLElement> {
  case_id: Case["id"];
  note: Note;
}

export default async function NoteCard({ case_id, note }: CaseCardProps) {
  const path = `/cases/${case_id}/notes/${note.id}`;
  return (
    <NextLink
      className={note.status != "ready" ? "pointer-events-none" : ""}
      href={path}
      aria-disabled={note.status != "ready"}
    >
      <Card className={`relative ${"hover:border-primary cursor-pointer"}`}>
        <CardContent className="flex justify-between items-center p-4">
          <div className="flex flex-col justify-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {`${note.template?.title || "Generic Note"} ${note.version}`}
            </h4>
            <LocalDateTime
              className="text-sm text-muted-foreground"
              isoString={note.inserted_at}
            />
          </div>
          <Badge variant={"outline"}>
            {`${note.status.charAt(0).toUpperCase()}${note.status.slice(1)}`}
            &nbsp;
            {note.status == "processing" ? (
              <LoaderCircle
                size={16}
                className={`animate-spin text-muted-foreground`}
              />
            ) : (
              <Check size={16} />
            )}
          </Badge>
        </CardContent>
      </Card>
    </NextLink>
  );
}
