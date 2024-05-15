import { Card, CardContent } from "@/components/ui/card";
import { Case } from "@/lib/case";
import { Note } from "@/lib/note";
import { DateTime } from "luxon";
import NextLink from "next/link";

interface CaseCardProps extends React.HTMLAttributes<HTMLElement> {
  case_id: Case["id"];
  note: Note;
}

export default function NoteCard({ case_id, note }: CaseCardProps) {
  const path = `/cases/${case_id}/notes/${note.id}`;
  return (
    <NextLink href={path}>
      <Card className={`relative ${"hover:border-blue-600 cursor-pointer"}`}>
        <CardContent className="flex justify-between items-center p-4">
          <div className="flex flex-col justify-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {`${note.type} ${note.version}`}
            </h4>
            <span className="text-sm text-muted-foreground">
              {DateTime.fromISO(note.inserted_at).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </span>
          </div>
        </CardContent>
      </Card>
    </NextLink>
  );
}
