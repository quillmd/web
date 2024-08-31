"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteNote, Note, postNote } from "@/lib/note";
import { Scribe } from "@/lib/scribe";
import { Ellipsis, Sparkles, ShieldHalf, Eclipse } from "lucide-react";

const scribeIconMapping = {
    "Lancelot": Sparkles,
    "Galahad": ShieldHalf,
    "Percival": Eclipse
  } as const;
  
  type ScribeName = keyof typeof scribeIconMapping;

interface NoteOptionsProps {
  case_id: string;
  note: Note;
  scribes: Scribe[];
}

export default function NoteOptions({
  case_id,
  note,
  scribes,
}: NoteOptionsProps) {
  const handleDelete = async () => {
    await deleteNote({ case_id: case_id, note_id: note.id });
  };

  const createNote = (scribe_id: string) => {
    postNote({
      case_id: case_id,
      template_id: note.template_id,
      scribe_id,
    }).then(() => {});
  };
  const scribesWithIcons = scribes.map(scribe => ({
    ...scribe,
    icon: scribeIconMapping[scribe.name as ScribeName]
  }))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Change squire for this note</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {scribesWithIcons.map(
                (scribe) =>
                  scribe.id != note.scribe_id && (
                    <DropdownMenuItem
                      key={`rewrite-option-${scribe.id}`}
                      onClick={() => createNote(scribe.id)}
                    >
                        <div className="flex items-center gap-2">
                        <scribe.icon size={24}/>
                        <div className="flex flex-col">
                            <span className="font-bold">
                            {scribe.name}
                            </span>
                            <span className="font-light text-sm">
                            {`${scribe.short_description.charAt(0).toUpperCase() + scribe.short_description.slice(1).toLowerCase()}`}
                            </span>
                        </div>
                        </div>
                    </DropdownMenuItem>
                  )
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <span>Delete note</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
