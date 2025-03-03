"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Note, postNote } from "@/lib/note";
import { Qa } from "@/lib/qa";
import { Scribe } from "@/lib/scribe";
import { Template } from "@/lib/template";
import { Transcript } from "@/lib/transcript";
import {
  Bolt,
  ChevronLeft,
  ChevronRight,
  Eclipse,
  FileSliders,
  LoaderCircle,
  ShieldHalf,
  Sparkles,
  Telescope,
  TriangleAlert,
} from "lucide-react";
import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import CopyButton from "../copy-button";
import Explore from "./explore";
import Inputs from "./inputs";
import NoteDisplay from "./note-display";
import NoteOptions from "./note-options";
import ScribingEffect from "./scribing-effect";

const scribeIconMapping = {
  Lancelot: Sparkles,
  Galahad: ShieldHalf,
  Percival: Eclipse,
} as const;

type ScribeName = keyof typeof scribeIconMapping;

interface NotesProps {
  case_id: string;
  templates: Template[];
  notes: Note[];
  transcripts: Transcript[];
  scribes: Scribe[];
  qas: Qa[];
}

export default function Notes({
  case_id,
  templates,
  notes,
  transcripts,
  scribes,
  qas,
}: NotesProps) {
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState("");

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

  const isNoteOutdated = useCallback(
    (note: Note | undefined) => {
      if (!note || transcripts.length === 0) return false;

      const noteDateTime = DateTime.fromISO(note.inserted_at);

      return transcripts
        .filter((transcript) => transcript.status == "ready")
        .some((transcript) => {
          const transcriptDateTime = DateTime.fromISO(transcript.updated_at);
          return transcriptDateTime > noteDateTime;
        });
    },
    [transcripts]
  );

  const isCurrentNoteOutdated = useMemo(
    () => isNoteOutdated(current_note),
    [isNoteOutdated, current_note]
  );

  const searchNoteByScribe = (
    template_id: Template["id"],
    scribe_id: Scribe["id"]
  ) => {
    const existingNoteIndex = notes.findIndex(
      (note) => note.scribe_id === scribe_id && note.template_id === template_id
    );
    if (existingNoteIndex !== -1) {
      const foundNote = notes[existingNoteIndex];
      if (!isNoteOutdated(foundNote)) {
        setCurrentNoteIndex(existingNoteIndex);
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const regenerateNote = async () => {
    await postNote({
      case_id,
      template_id: current_note.template_id,
      scribe_id: current_note.scribe_id,
    });
  };

  const extractNoteContent = (content: string) => {
    const startTag = "<completed_note>";
    const endTag = "</completed_note>";
    const startIndex = content.indexOf(startTag);
    const endIndex = content.lastIndexOf(endTag);
    const regex = /(\S.*\n)\n(Plan:)/g;
    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
      return content
        .slice(startIndex + startTag.length, endIndex)
        .trim()
        .replace(regex, "$1$2");
    }
    return content;
  };

  const disclaimer =
    "\n\nThe Squire clinical documentation tool was used in creating this documentation. Variations in content may occur, and healthcare providers must review and verify all information before making clinical decisions. ";
  const extractedContent = current_note?.content
    ? extractNoteContent(current_note.content) + disclaimer
    : "";

  const current_scribe = scribes.find(
    (scribe) => scribe.id == current_note?.scribe_id
  );

  return (
    <div className="grid grid-cols-4 gap-3">
      <Card
        className={`relative flex flex-col overflow-hidden h-full transition-all duration-300 ease-in-out ${
          sidebarVisible === "" ? "col-span-4" : "col-span-3"
        }`}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex flex-row gap-2 items-center">
            {notes.length > 0
              ? `${current_note.template?.title || "Generic Note"} ${
                  current_note.version != 1 ? `${current_note.version}` : ``
                }`
              : "Notes"}
            {isCurrentNoteOutdated && (
              <HoverCard openDelay={200}>
                <HoverCardTrigger>
                  <div className="flex flex-row items-center">
                    <Button
                      variant={"ghost"}
                      className="text-secondary font-body font-semibold text-base"
                      onClick={regenerateNote}
                    >
                      <TriangleAlert className="text-secondary mr-1" />
                      Regenerate note
                    </Button>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-base font-body font-normal">
                  {
                    "One or more inputs have been created or changed after this note was created. Regenerate the note include all current inputs."
                  }
                </HoverCardContent>
              </HoverCard>
            )}
          </CardTitle>

          <div className="flex gap-2">
            {current_note.status == "ready" && (
              <CopyButton
                className="w-24 bg-card gap-0"
                text={extractedContent}
              />
            )}
            <ToggleGroup
              className="gap-2"
              type="single"
              variant={"outline"}
              value={sidebarVisible}
              onValueChange={(value) => {
                setSidebarVisible(value);
              }}
            >
              <ToggleGroupItem
                value="inputs"
                aria-label="Toggle input sidebar"
                className="w-24"
              >
                <FileSliders className={"mr-1"} size={16} />
                {"Inputs"}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="options"
                aria-label="Toggle options sidebar"
                className="w-24"
              >
                <Bolt className={"mr-1"} size={16} />
                {"Options"}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="explore"
                aria-label="Toggle explore sidebar"
                className="w-24"
                disabled={qas.length === 0}
              >
                {qas.length === 0 ? (
                  <LoaderCircle size={16} className={`animate-spin mr-1`} />
                ) : (
                  <Telescope className={"mr-1"} size={16} />
                )}
                {"Explore"}
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>
        <div className="relative w-full p-2 px-6">
          <ScrollArea
            type="auto"
            className="p-2 border bg-background h-[calc(100vh-15.5rem)]"
          >
            {current_note.status == "ready" ? (
              <NoteDisplay
                case_id={case_id}
                note={current_note}
                extractedContent={extractedContent}
              />
            ) : current_note.status == "processing" ? (
              <ScribingEffect
                text={`Squire is scribing this note...`}
              />
            ) : current_note.status == "editing" ? (
              <ScribingEffect
                text={`Squire is editing this note...`}
              />
            ) : (
              "Error processing note"
            )}
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
      </Card>
      <div
        className={`transition-all duration-300 ease-in-out ${
          current_note && sidebarVisible === "options" ? "col-span-1" : "hidden"
        }`}
      >
        <NoteOptions
          case_id={case_id}
          current_note={current_note}
          current_scribe={current_scribe || scribes[0]}
          scribes={scribes}
          templates={templates}
          transcripts={transcripts}
          searchNoteByScribe={searchNoteByScribe}
        />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          current_note && sidebarVisible === "explore" ? "col-span-1" : "hidden"
        }`}
      >
        <Explore case_id={case_id} note_id={current_note.id} qas={qas || []} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          current_note && sidebarVisible === "inputs" ? "col-span-1" : "hidden"
        }`}
      >
        <Inputs case_id={case_id} transcripts={transcripts} />
      </div>
    </div>
  );
}
