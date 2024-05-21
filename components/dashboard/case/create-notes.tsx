"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Case } from "@/lib/case";
import { Note, postNote } from "@/lib/note";

export default function CreateNotes({ case_id }: { case_id: Case["id"] }) {
  const createNote = (type: Note["type"]) => {
    postNote({ case_id, type }).then(() => {});
  };

  return (
    <DropdownMenu>
      <Button variant={"ghost"} asChild>
        <DropdownMenuTrigger>+ Create Note</DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent>
        <DropdownMenuLabel>Default templates</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => createNote("mdm")}>
          MDM
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => createNote("hp")}>
          H&P
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => createNote("soap")}>
          SOAP
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => createNote("instructions")}>
          Patient Instructions
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
