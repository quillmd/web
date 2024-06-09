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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Case } from "@/lib/case";
import { postNote } from "@/lib/note";
import { Template } from "@/lib/template";
import Nextlink from "next/link";

interface CreateNotesProps {
  case_id: Case["id"];
  templates: Template[];
  disabled: boolean;
}

export default function CreateNotes({
  case_id,
  templates,
  disabled,
}: CreateNotesProps) {
  const createNote = (template_id: Template["id"]) => {
    postNote({ case_id, template_id }).then(() => {});
  };
  const defaultTemplates = templates.filter(
    (template) => template.type == "default"
  );
  const customTemplates = templates.filter(
    (template) => template.type != "default"
  );

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-36"
              variant={"outline"}
              disabled={disabled}
              asChild
            >
              <DropdownMenuTrigger>
                {disabled ? `No ready inputs available` : `+ Create Note`}
              </DropdownMenuTrigger>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>
              {disabled ? `No ready inputs available` : `Create a new note`}
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        {defaultTemplates.length > 0 && (
          <>
            <DropdownMenuLabel>Default templates</DropdownMenuLabel>

            {defaultTemplates.map((template, i) => {
              return (
                <DropdownMenuItem
                  key={`default-template-option-${i}`}
                  onClick={() => createNote(template.id)}
                >
                  {template.title}
                </DropdownMenuItem>
              );
            })}
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
