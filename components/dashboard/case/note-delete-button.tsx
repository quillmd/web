"use client";
import { Button } from "@/components/ui/button";
import { deleteNote } from "@/lib/note";
import { Trash } from "lucide-react";

interface NoteDeleteButtonProps {
  case_id: string;
  note_id: string;
}

export default function NoteDeleteButton({
  case_id,
  note_id,
}: NoteDeleteButtonProps) {
  const handleDelete = () => {
    deleteNote({ case_id: case_id, note_id: note_id });
  };

  return (
    <Button
      className="hover:text-destructive-foreground hover:bg-destructive/90 w-full"
      variant="ghost"
      onClick={handleDelete}
    >
      Delete note
    </Button>
  );
}
