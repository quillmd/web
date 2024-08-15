"use client";
import { Button } from "@/components/ui/button";
import { deleteTranscript } from "@/lib/transcript";
import { Trash } from "lucide-react";

interface TranscriptDeleteButtonProps {
  case_id: string;
  transcript_id: string;
}

export default function TranscriptDeleteButton({
  case_id,
  transcript_id,
}: TranscriptDeleteButtonProps) {
  const handleDelete = () => {
    deleteTranscript({ case_id: case_id, transcript_id: transcript_id });
  };

  return (
    <Button
      className="hover:text-destructive-foreground hover:bg-destructive/90"
      variant="ghost"
      size="icon"
      onClick={handleDelete}
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
