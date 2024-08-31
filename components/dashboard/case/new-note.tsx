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
import { postNote } from "@/lib/note";
import { Template } from "@/lib/template";
import Nextlink from "next/link";
import { useAccount } from "../account-provider";
import { Scribe } from "@/lib/scribe";

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
  const createNote = (template_id: Template["id"], scribe_id?: Scribe["id"]) => {
    postNote({ case_id, template_id, scribe_id }).then(() => {});
  };
  const defaultTemplates = templates.filter(
    (template) => template.user_id == undefined
  );

  const customTemplates = templates.filter(
    (template) => template.user_id != undefined
  );

  return (
    <DropdownMenu>
      <Button
        className="w-36"
        disabled={disabled || account.status == "trial_ended"}
        asChild
      >
        <DropdownMenuTrigger>
          {account.status == "trial_ended" ? "Trial ended" : `+ New Note`}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
