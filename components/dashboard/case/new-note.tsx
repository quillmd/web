"use client";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Case } from "@/lib/case";
import { postNote } from "@/lib/note";
import { Scribe } from "@/lib/scribe";
import { Template } from "@/lib/template";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Nextlink from "next/link";
import { useAccount } from "../account-provider";
import NoteCompletion from "./note-completion";

interface NewNoteProps {
  case_id: Case["id"];
  templates: Template[];
  disabled: boolean;
}

export default function NewNote({
  case_id,
  templates,
  disabled,
}: NewNoteProps) {
  const { account } = useAccount();
  const createNote = (
    template_id: Template["id"],
    scribe_id?: Scribe["id"]
  ) => {
    postNote({ case_id, template_id, scribe_id }).then(() => {});
  };
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
    <Dialog>
      <DropdownMenu modal={false}>
        <Button
          className="w-36"
          disabled={disabled || account.status == "trial_ended"}
          asChild
        >
          <DropdownMenuTrigger>
            {account.status == "trial_ended" ? "Daily limit reached" : `+ New Note`}
          </DropdownMenuTrigger>
        </Button>
        <DropdownMenuContent>
          {defaultTemplates.length > 0 && (
            <>
              <DropdownMenuLabel>Default</DropdownMenuLabel>
              {defaultTemplates.map((template, i) => (
                <DropdownMenuItem
                  key={`concise-template-option-${i}`}
                  onClick={() => createNote(template.id, account.scribe?.id)}
                >
                  {template.title.replace(" (concise)", "")}
                </DropdownMenuItem>
              ))}
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Custom templates</DropdownMenuLabel>
          {customTemplates.map((template, i) => {
            return (
              <DropdownMenuItem
                key={`custom-template-option-${i}`}
                onClick={() => createNote(template.id, account.scribe?.id)}
              >
                {template.title}
              </DropdownMenuItem>
            );
          })}
          <Nextlink href={"/account/templates"}>
            <DropdownMenuItem key={`custom-template-create`}>
              {`+ Create Custom Template`}
            </DropdownMenuItem>
          </Nextlink>
          {noteCompletionTemplate && account.scribe && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Special</DropdownMenuLabel>
              <DialogTrigger asChild>
                <DropdownMenuItem key={`note-completion`}>
                  Note Completion
                </DropdownMenuItem>
              </DialogTrigger>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {noteCompletionTemplate && account.scribe && (
        <NoteCompletion
          case_id={case_id}
          template_id={noteCompletionTemplate.id}
          scribe_id={account.scribe?.id}
        />
      )}
    </Dialog>
  );
}
