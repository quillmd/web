import NoteText from "@/components/note/note-text";
import { Note, getNote } from "@/lib/note";

export default async function NotePage({
  params: { case_id, note_id },
}: {
  params: { case_id: string , note_id:string};
}) {
  const note = await getNote({case_id:parseInt(case_id), note_id:parseInt(note_id)})
  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {`${note.type} ${note.version}`}
      </h2>
      <div className="rounded-md border bg-muted p-2 font-garamond text-lg">
        {note.content && <NoteText text={note.content} />}
      </div>
    </div>
  );
}
