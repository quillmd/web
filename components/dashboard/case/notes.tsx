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
import NewNote from "./new-note";
import NoteDeleteButton from "./note-delete-button";
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
        console.log(transcript)
        const transcriptDateTime = DateTime.fromISO(transcript.updated_at);
        return transcriptDateTime > noteDateTime;
      });
  }, [current_note, transcripts]);

  const extractNoteContent = (content: string) => {
    const startTag = "(start of note)";
    const endTag = "(end of note)";
    const startIndex = content.indexOf(startTag);
    const endIndex = content.lastIndexOf(endTag);

    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
      return content.slice(startIndex + startTag.length, endIndex).trim();
    }
    return content;
  };

  const noteContent = current_note?.content ? extractNoteContent(current_note.content) : '';

  return (
    <Card className="relative flex flex-col overflow-hidden h-[calc(100vh-8rem)]">
      <CardHeader className="px-8 py-6">
        <div className="mx-auto flex gap-2 items-center justify-center">
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
          {current_note && (
            <div className="absolute right-0 top-0">
              <NoteDeleteButton case_id={case_id} note_id={current_note.id} />
            </div>
          )}
        </div>
      </CardHeader>
      <div className="flex flex-col h-full items-center gap-6">
        <NewNote
          case_id={case_id}
          templates={templates}
          disabled={notesDisabled}
        />
        {notes.length > 0 ? (
          <div className="relative w-full border-t">
            {current_note.status == "ready" && (
              <CopyButton
                className="bg-card absolute z-30 h-8 -top-8 right-0 text-sm border-b-0 border-r-0 rounded-none rounded-ss-md"
                text={noteContent}
              />
            )}
            <ScrollArea type="auto" className="p-4 h-[calc(100vh-19.5rem)]">
              <pre className="font-mono text-sm whitespace-pre-wrap">
                {current_note.status == "ready" ? (
                  noteContent
                ) : current_note.status == "processing" ? (
                  <ScribingEffect />
                ) : current_note.status == "editing" ? (
                  <ScribingEffect text="Squire is editing this note..."/>
                ) : (
                  "Error processing note"
                )}
              </pre>
            </ScrollArea>
            <div className="flex items-center justify-between mt-0.5">
              <Button
                className="text-inherit"
                variant="link"
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
                variant="link"
                className="text-inherit"
                size="sm"
                onClick={handleNextNote}
                disabled={currentNoteIndex === notes.length - 1}
              >
                Older
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center border-t w-full">
            <p className="pt-5 text-muted-foreground">
              {notesDisabled
                ? `At least one input is needed to create a note`
                : `Click "New Note" to have Squire scribe a note`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
