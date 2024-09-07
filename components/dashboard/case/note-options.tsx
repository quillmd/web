"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Eclipse, ShieldHalf, Sparkles } from "lucide-react";
import NoteDeleteButton from "./note-delete-button";

const pronounsButtons = ["She", "He", "They"];

const scribeIconMapping = {
  Lancelot: Sparkles,
  Galahad: ShieldHalf,
  Percival: Eclipse,
} as const;

type ScribeName = keyof typeof scribeIconMapping;

interface NoteOptionsProps {
  case_id: string;
  current_note: Note;
  current_scribe?: Scribe;
  scribes: Scribe[];
  templates: Template[];
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
  searchNoteByScribe,
}: NoteOptionsProps) {
  const createNote = (template_id: string, scribe_id: string) => {
    !searchNoteByScribe(template_id, scribe_id) &&
      postNote({
        case_id: case_id,
        template_id: template_id,
        scribe_id,
      }).then(() => {});
  };
  const scribesWithIcons = scribes.map((scribe) => ({
    ...scribe,
    icon: scribeIconMapping[scribe.name as ScribeName],
  }));

  const defaultTemplates = templates.filter(
    (template) => template.user_id == undefined
  );

  const customTemplates = templates.filter(
    (template) => template.user_id != undefined
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
            onValueChange={(template_id) => current_scribe && createNote(template_id, current_note.scribe_id)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Default tempaltes</SelectLabel>
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
                <SelectLabel>Custom tempaltes</SelectLabel>
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
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Change Squire</Label>
          <Select
            value={current_scribe?.id}
            disabled={!current_scribe}
            defaultValue={current_scribe?.id}
            onValueChange={(scribe_id) => createNote(current_note.template_id, scribe_id)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              {scribesWithIcons.map((scribe) => (
                <SelectItem
                  key={`rewrite-select-${scribe.id}`}
                  value={scribe.id}
                >
                  <div className="flex flex-row gap-1">
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
          <div className="flex gap-2">
            {pronounsButtons.map((value) => (
              <Button key={`pronouns-button-${value.toLowerCase()}`} variant={"outline"}>{value}</Button>
            ))}
          </div>
        </div>
        <Button className="w-full" variant={"outline"}>Magic Edit</Button>
      </CardContent>
      <CardFooter>
        <NoteDeleteButton case_id={case_id} note_id={current_note.id} />
      </CardFooter>
    </Card>
  );
}
