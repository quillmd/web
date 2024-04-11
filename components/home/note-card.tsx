import { Card, CardContent } from "@/components/ui/card";
import { Note } from "@/lib/note";
import NextLink from "next/link";

interface NoteCardProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  createdAt: string;
  status: Note["status"];
}

function NoteCard({ name, createdAt, status }: NoteCardProps) {
  return (
    <Card
      className={`relative ${
        status === "ready" ? "hover:border-blue-600 cursor-pointer" : ""
      }`}
    >
      <CardContent className="flex justify-between items-center p-4">
        <div className="flex flex-col justify-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {name}
          </h4>
          <p className="text-sm text-muted-foreground">{createdAt}</p>
        </div>
      </CardContent>
      {status !== "ready" && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-opacity-75 rounded-lg ${
            status === "error"
              ? "bg-red-900 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          <span className="text-lg font-semibold">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      )}
    </Card>
  );
}

interface NoteCardWrappedProps extends NoteCardProps {
  noteId: Note["id"];
}

export default async function NoteCardWrapped({
  noteId,
  name,
  createdAt,
  status,
}: NoteCardWrappedProps) {
  const path = `/dashboard/notes/${noteId}`;
  if (status === "ready") {
    return (
      <NextLink href={path}>
        <NoteCard name={name} createdAt={createdAt} status={status} />
      </NextLink>
    );
  }
  return <NoteCard name={name} createdAt={createdAt} status={status} />;
}