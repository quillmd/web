import NoteCard from "@/components/home/note-card";
import { getNotes } from "@/lib/note";
import { DateTime } from "luxon";

export default async function HomePage() {
  const notes = await getNotes();
  return (
    <div className="max-w-screen-lg mx-auto pt-4">
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        All Notes
      </h2>

      {notes.map((note) => (
        <NoteCard
          key={`note-row-${note.id}`}
          noteId={note.id}
          name={note.name}
          createdAt={DateTime.fromISO(note.created_at).toLocaleString(
            DateTime.DATETIME_SHORT
          )}
          status={note.status}
        />
      ))}
    </div>
  );
}
