"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Note } from "@/lib/note";
import { Template } from "@/lib/template";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import CopyButton from "../copy-button";
import CreateNotes from "./create-notes";
import ScribingEffect from "./scribing-effect";

interface NotesDisplayProps {
  case_id: string;
  templates: Template[];
  notes: Note[];
  notesDisabled: boolean;
}

export default function Notes({
  case_id,
  templates,
  notes,
  notesDisabled,
}: NotesDisplayProps) {
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

  const handlePreviousNote = () => {
    setCurrentNoteIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextNote = () => {
    setCurrentNoteIndex((prevIndex) =>
      Math.min(notes.length - 1, prevIndex + 1)
    );
  };

  return (
    <Card className="flex flex-col h-full relative">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Notes</CardTitle>
        <CreateNotes
          case_id={case_id}
          templates={templates}
          disabled={notesDisabled}
        />
      </CardHeader>
      <div className="flex flex-col h-full">
        {notes.length > 0 ? (
          <>
            <div className="bg-gray-100 p-4 rounded-lg flex-grow overflow-hidden flex flex-col">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-2">
                  {notes[currentNoteIndex].template?.title || "Generic Note"}
                </h3>
                <CopyButton
                  className="h-8 w-8"
                  text={notes[currentNoteIndex].content}
                />
              </div>
              <ScrollArea
                type="scroll"
                className="flex-grow max-h-[calc(100vh-23rem)]"
              >
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {notes[currentNoteIndex].status == "ready" ? (
                    notes[currentNoteIndex].content
                  ) : notes[currentNoteIndex].status == "processing" ? (
                    <ScribingEffect />
                  ) : (
                    "Error processing note"
                  )}
                </pre>
              </ScrollArea>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousNote}
                disabled={currentNoteIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
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
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground mb-4">
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
