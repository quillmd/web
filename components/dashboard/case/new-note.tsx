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
  const createNote = (template_id: Template["id"]) => {
    postNote({ case_id, template_id }).then(() => {});
  };
  const defaultTemplates = templates.filter(
    (template) => template.user_id == undefined
  );
  const conciseTemplates = defaultTemplates.filter((template) =>
    template.title.includes("(concise)")
  );
  const comprehensiveTemplates = defaultTemplates.filter((template) =>
    template.title.includes("(comprehensive)")
  );
  const otherTemplates = defaultTemplates.filter(
    (template) =>
      !template.title.includes("(concise)") &&
      !template.title.includes("(comprehensive)")
  );
  const customTemplates = templates.filter(
    (template) => template.user_id != undefined
  );

  return (
    <DropdownMenu>
      <Button
        className="w-36"
        variant={"outline"}
        disabled={disabled || account.status == "trial_ended"}
        asChild
      >
        <DropdownMenuTrigger>
          {account.status == "trial_ended" ? "Trial ended" : `+ New Note`}
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent>
        {conciseTemplates.length > 0 && (
          <>
            <DropdownMenuLabel>Default (concise)</DropdownMenuLabel>
            {conciseTemplates.map((template, i) => (
              <DropdownMenuItem
                key={`concise-template-option-${i}`}
                onClick={() => createNote(template.id)}
              >
                {template.title.replace(" (concise)", "")}
              </DropdownMenuItem>
            ))}
          </>
        )}

        {comprehensiveTemplates.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Default (comprehensive)</DropdownMenuLabel>
            {comprehensiveTemplates.map((template, i) => (
              <DropdownMenuItem
                key={`comprehensive-template-option-${i}`}
                onClick={() => createNote(template.id)}
              >
                {template.title.replace(" (comprehensive)", "")}
              </DropdownMenuItem>
            ))}
            {otherTemplates.map((template, i) => (
              <DropdownMenuItem
                key={`other-template-option-${i}`}
                onClick={() => createNote(template.id)}
              >
                {template.title}
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
              onClick={() => createNote(template.id)}
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
