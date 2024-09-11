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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Case } from "@/lib/case";
import { Note } from "@/lib/note";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useState } from "react";

interface MagicEditProps extends React.HTMLAttributes<HTMLElement> {
  case_id: Case["id"];
  note: Note;
  text_selection?: string;
  children: React.ReactNode;
}

export default function MagicEdit({
  case_id,
  note,
  text_selection,
  children,
}: MagicEditProps) {
  const [editInstructions, setEditInstructions] = useState("");
  const formatSelection = () => {
    if (!text_selection) return "";
    
    const startIndex = note.content.indexOf(text_selection);
    const endIndex = startIndex + text_selection.length;
    
    let formattedSelection = text_selection;
    
    if (startIndex > 0) {
      formattedSelection = `...${formattedSelection}`;
    }
    
    if (endIndex < note.content.length) {
      formattedSelection = `${formattedSelection}...`;
    }
    
    return formattedSelection;
  };

  return (
    <Dialog>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Magic Edit</DialogTitle>
          <DialogDescription>
            {text_selection?.length
              ? "How should your Squire change this part of the note?"
              : "How should your Squire change this note?"}
          </DialogDescription>
        </DialogHeader>
        {text_selection?.length && (
            <ScrollArea type="auto" className="max-h-96">
                <blockquote className="border-l-2 pl-6 italic">{formatSelection()}</blockquote>
            </ScrollArea>
        )}
        <Textarea
          id="edit-instructions"
          value={editInstructions}
          onChange={(e) => setEditInstructions(e.target.value)}
          placeholder="Enter edit instructions"
        />
        <DialogFooter>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
