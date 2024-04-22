import NoteCard from "@/components/case/NoteCard";
import { getNotes } from "@/lib/note";

export default async function CasePage({
  params: { case_id },
}: {
  params: { case_id: string };
}) {
  const notes = await getNotes({ case_id: parseInt(case_id) });
  return (
    <div className="max-w-screen-lg mx-auto pt-4">
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        All Cases
      </h2>
      {/* Updated the container to use grid instead of flex and specify 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <NoteCard
            key={`note-${note.id}`}
            case_id={parseInt(case_id)}
            note={note}
          />
        ))}
      </div>
    </div>
  );
}
