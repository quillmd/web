"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Note, postNote } from "@/lib/note";
import { Scribe } from "@/lib/scribe";
import { Template } from "@/lib/template";
import { Transcript } from "@/lib/transcript";
import { Eclipse, ShieldHalf, Sparkles } from "lucide-react";
import { useState } from "react";
import MagicEdit from "./magic-edit";
import NoteCompletion from "./note-completion";
import NoteDeleteButton from "./note-delete-button";
import PronounButtons from "./pronoun-buttons";

const scribeIconMapping = {
  Lancelot: Sparkles,
  Galahad: ShieldHalf,
  Percival: Eclipse,
} as const;

type ScribeName = keyof typeof scribeIconMapping;

interface NoteOptionsProps {
  case_id: string;
  current_note: Note;
  current_scribe: Scribe;
  scribes: Scribe[];
  templates: Template[];
  transcripts: Transcript[];
  searchNoteByScribe: (
    template_id: Template["id"],
    scribe_id: Scribe["id"]
  ) => boolean;
}

export default function NoteOptions({
  case_id,
  current_note,
  current_scribe,
  scribes,
  templates,
  transcripts,
  searchNoteByScribe,
}: NoteOptionsProps) {
  const [isNoteCompletionOpen, setIsNoteCompletionOpen] = useState(false);

  const createNote = (template_id: string, scribe_id: string) => {
    !searchNoteByScribe(template_id, scribe_id) &&
      postNote({
        case_id: case_id,
        template_id: template_id,
        scribe_id,
      }).then(() => {});
  };

  const openNoteCompletion = (template_id: string, scribe_id: string) => {
    !searchNoteByScribe(template_id, scribe_id) &&
      setIsNoteCompletionOpen(true);
  };
  const scribesWithIcons = scribes.map((scribe) => ({
    ...scribe,
    icon: scribeIconMapping[scribe.name as ScribeName],
  }));

  const defaultTemplates = templates.filter(
    (template) =>
      template.user_id == undefined && template.title !== "Note Completion"
  );

  const customTemplates = templates.filter(
    (template) => template.user_id != undefined
  );

  const noteCompletionTemplate = templates.find(
    (template) => template.title == "Note Completion"
  );

  return (
    <Card className="col-span-1 relative flex flex-col overflow-hidden h-[calc(100vh-7.5rem)]">
      <CardHeader>
        <div className="mx-auto flex gap-2 items-center justify-center">
          <CardTitle>{"Note Options"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-8 h-full">
        <div className="space-y-1">
          <Label>Template</Label>
          <Select
            value={current_note.template_id}
            defaultValue={current_note.template_id}
            disabled={!current_scribe}
            onValueChange={(template_id) => {
              console.log(noteCompletionTemplate?.id);
              if (template_id == noteCompletionTemplate?.id) {
                openNoteCompletion(template_id, current_scribe.id);
              } else if (
                current_scribe &&
                template_id !== noteCompletionTemplate?.id
              ) {
                createNote(template_id, current_note.scribe_id);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Default templates</SelectLabel>
                {defaultTemplates.map((template) => (
                  <SelectItem
                    key={`template-select-${template.id}`}
                    value={template.id}
                  >
                    {template.title}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Custom templates</SelectLabel>
                {customTemplates.map((template) => (
                  <SelectItem
                    key={`template-select-${template.id}`}
                    value={template.id}
                  >
                    {template.title}
                  </SelectItem>
                ))}
                <SelectItem
                  key={`template-select-create`}
                  value={"create"}
                >{`+ Create Custom Template`}</SelectItem>
              </SelectGroup>
              
              {noteCompletionTemplate && (
                <>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Special</SelectLabel>
                  <SelectItem
                    key={`template-select-${noteCompletionTemplate.id}`}
                    value={noteCompletionTemplate.id}
                  >
                    Note Completion
                  </SelectItem>
                </SelectGroup>
                </>
              )}
            </SelectContent>
          </Select>
          <Dialog
            open={isNoteCompletionOpen}
            onOpenChange={setIsNoteCompletionOpen}
          >
            {noteCompletionTemplate && (
              <NoteCompletion
                case_id={case_id}
                template_id={noteCompletionTemplate.id}
                scribe_id={current_scribe.id}
                transcript_id={
                  transcripts.find(
                    (transcript) => transcript.type == "note_for_completion"
                  )?.id
                }
                initial_content={
                  transcripts.find(
                    (transcript) => transcript.type == "note_for_completion"
                  )?.content
                }
              />
            )}
          </Dialog>
        </div>
        <div className="space-y-1">
          <Label>Change Squire</Label>
          <Select
            value={current_scribe?.id}
            disabled={!current_scribe}
            defaultValue={current_scribe?.id}
            onValueChange={(scribe_id) =>
              createNote(current_note.template_id, scribe_id)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a squire" />
            </SelectTrigger>
            <SelectContent>
              {scribesWithIcons.map((scribe) => (
                <SelectItem
                  key={`rewrite-select-${scribe.id}`}
                  value={scribe.id}
                >
                  <div className="flex flex-row gap-1 items-center">
                    <scribe.icon size={20} />
                    <span>{`${scribe.name} (${scribe.short_description})`}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Pronouns</Label>
          <PronounButtons case_id={case_id} note_id={current_note.id} />
        </div>
        <MagicEdit case_id={case_id} note={current_note}>
          <DialogTrigger asChild>
            <Button className="w-full" variant={"default"}>
              Magic Edit
            </Button>
          </DialogTrigger>
        </MagicEdit>
      </CardContent>
      <CardFooter>
        <NoteDeleteButton case_id={case_id} note_id={current_note.id} />
      </CardFooter>
    </Card>
  );
}
