"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Case } from "@/lib/case";
import { editNote, Note } from "@/lib/note";
import { DialogClose } from "@radix-ui/react-dialog";
import React, { useState } from "react";

interface MagicEditProps extends React.HTMLAttributes<HTMLElement> {
  case_id: Case["id"];
  note: Note;
  extractedContent?: string;
  text_selection?: string;
  children: React.ReactNode;
}

export default function MagicEdit({
  case_id,
  note,
  extractedContent,
  text_selection,
  children,
}: MagicEditProps) {
  const [editInstructions, setEditInstructions] = useState("");
  const hasTextSelection = text_selection?.length && text_selection?.length > 0;
  const formatSelection = () => {
    if (!text_selection || !extractedContent) return "";
  
    const startIndex = extractedContent.indexOf(text_selection);
    const endIndex = startIndex + text_selection.length;
  
    let formattedSelection = text_selection;
  
    if (startIndex > 0 && extractedContent[startIndex - 1] !== '\n') {
      formattedSelection = `...${formattedSelection}`;
    }
  
    if (endIndex < extractedContent.length && extractedContent[endIndex] !== '\n') {
      formattedSelection = `${formattedSelection}...`;
    }
  
    return formattedSelection;
  };

  const handleSubmitTextEdit = async () => {
    const instructions = hasTextSelection
      ? `${text_selection}\n\nPlease edit this part of the note in the following way:\n\n${editInstructions}`
      : editInstructions;
    await editNote({ case_id, note_id: note.id, instructions });
  };

  return (
    <Dialog>
      {children}
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Magic Edit</DialogTitle>
          <DialogDescription>
            {hasTextSelection
              ? "How should your Squire change this part of the note?"
              : "How should your Squire change this note?"}
          </DialogDescription>
        </DialogHeader>
        {hasTextSelection && (
          <pre className="max-h-96 border-l-2 pl-6 pr-2 italic overflow-auto font-mono whitespace-pre-wrap bg-background">
            {formatSelection()}
          </pre>
        )}
        <Textarea
          id="edit-instructions"
          value={editInstructions}
          onChange={(e) => setEditInstructions(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && handleSubmitTextEdit()}
          placeholder="Enter edit instructions"
          className="bg-background"
        />
        <DialogFooter>
          <DialogClose>
            <Button onClick={handleSubmitTextEdit}>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
