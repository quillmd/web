import BreadcrumbNav from "@/components/dashboard/breadcrumb-nav";
import NoteText from "@/components/dashboard/note/note-text";
import { Case, getCase } from "@/lib/case";
import { Note, getNote } from "@/lib/note";

async function getData(case_id: string, note_id: string) {
  const promiseArray = [
    getCase({ id: case_id }),
    getNote({ case_id: case_id, note_id: note_id }),
  ];

  const results = await Promise.all(promiseArray);

  return {
    current_case: results[0] as Case,
    note: results[1] as Note,
  };
}

export default async function NotePage({
  params: { case_id, note_id },
}: {
  params: { case_id: string; note_id: string };
}) {
  const { current_case, note } = await getData(
    case_id,
    note_id
  );

  return (
    <div className="flex flex-col gap-2">
      <BreadcrumbNav current_case={current_case} note={note} />
      <h2 className="text-3xl font-semibold tracking-tight transition-colors">
        {`${note.template?.title || "Generic Note"} ${note.version}`}
      </h2>
      <div className="rounded-md border bg-muted p-2 font-garamond text-lg">
        {note.content && <NoteText text={note.content} />}
      </div>
    </div>
  );
}
