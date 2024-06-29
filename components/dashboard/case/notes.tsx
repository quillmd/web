"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Note } from "@/lib/note";
import { Template } from "@/lib/template";
import { Transcript } from "@/lib/transcript";
import { ChevronLeft, ChevronRight, TriangleAlert } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import CopyButton from "../copy-button";
import CreateNotes from "./create-notes";
import ScribingEffect from "./scribing-effect";

interface NotesDisplayProps {
  case_id: string;
  templates: Template[];
  notes: Note[];
  notesDisabled: boolean;
  transcripts: Transcript[];
}

export default function Notes({
  case_id,
  templates,
  notes,
  notesDisabled,
  transcripts,
}: NotesDisplayProps) {
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const current_note = notes[currentNoteIndex];

  useEffect(() => {
    setCurrentNoteIndex(0);
  }, [notes]);
  const handlePreviousNote = () => {
    setCurrentNoteIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextNote = () => {
    setCurrentNoteIndex((prevIndex) =>
      Math.min(notes.length - 1, prevIndex + 1)
    );
  };

  const isNoteOutdated = useMemo(() => {
    if (!current_note || transcripts.length === 0) return false;

    const noteDateTime = DateTime.fromISO(current_note.inserted_at);

    return transcripts
      .filter((transcript) => transcript.status == "ready")
      .some((transcript) => {
        const transcriptDateTime = DateTime.fromISO(transcript.inserted_at);
        return transcriptDateTime > noteDateTime;
      });
  }, [current_note, transcripts]);

  return (
    <Card className="relative flex flex-col overflow-hidden h-[calc(100vh-10rem)]">
      <CardHeader className={`flex flex-row items-center justify-between`}>
        <div className="flex gap-2">
          <CardTitle className="text-xl">
            {notes.length > 0
              ? `${current_note.template?.title || "Generic Note"} ${
                  current_note.version != 1 ? `${current_note.version}` : ``
                }`
              : "Notes"}
          </CardTitle>
          {isNoteOutdated && (
            <HoverCard openDelay={500}>
              <HoverCardTrigger>
                <TriangleAlert className="text-orange-500" />
              </HoverCardTrigger>
              <HoverCardContent>
                {
                  "One or more inputs have been added after this note was created. Scribe a new note to include all current inputs."
                }
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        <CreateNotes
          case_id={case_id}
          templates={templates}
          disabled={notesDisabled}
        />
      </CardHeader>
      <div className="flex flex-col h-full">
        {notes.length > 0 ? (
          <>
            <div className="relative flex flex-col flex-grow overflow-hidden">
              {current_note.status == "ready" && (
                <CopyButton
                  className="absolute z-10 w-8 h-8 top-2 right-6"
                  text={current_note.content}
                />
              )}
              <ScrollArea
                type="auto"
                className="bg-gray-100 py-2 px-4 max-h-[calc(100vh-20rem)]"
              >
                <pre className="font-mono text-sm whitespace-pre-wrap">
                  {current_note.status == "ready" ? (
                    current_note.content
                  ) : current_note.status == "processing" ? (
                    <ScribingEffect />
                  ) : (
                    "Error processing note"
                  )}
                </pre>
              </ScrollArea>
            </div>
            <div className="flex items-center justify-between p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousNote}
                disabled={currentNoteIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Newer
              </Button>
              <span className="text-sm text-gray-500">{`${
                currentNoteIndex + 1
              } / ${notes.length}`}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextNote}
                disabled={currentNoteIndex === notes.length - 1}
              >
                Older
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="mb-4 text-muted-foreground">
              {notesDisabled
                ? `At least one input is needed to create a note`
                : `Click "Create Note" to have Quill scribe a note`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
