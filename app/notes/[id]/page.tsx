import NoteName from "@/components/note/note-name";
import NoteText from "@/components/note/note-text";
import NoteTranscript from "@/components/note/note-transcript";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNote } from "@/lib/note";

export default async function NotePage({
	params: { id },
}: {
	params: { id: string };
}) {
	const note = await getNote(id);
	if (!note) {
		return <div>Note not found</div>;
	}
	return (
		<div className="max-w-screen-lg mx-auto">
			<NoteName noteId={note.id} name={note.name} />
			<Tabs defaultValue="note">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="note">Note</TabsTrigger>
					<TabsTrigger value="transcript">Transcript</TabsTrigger>
				</TabsList>
				<TabsContent value="note">
					<div className="rounded-md border bg-muted p-2">
						{note.text && <NoteText text={note.text} />}
					</div>
				</TabsContent>
				<TabsContent value="transcript">
					<div className="rounded-md border bg-muted p-2">
						{note.transcript && <NoteTranscript transcript={note.transcript} />}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
