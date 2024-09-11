import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Case } from "@/lib/case";
import { Note } from "@/lib/note";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useCallback, useRef, useState } from "react";
import MagicEdit from "./magic-edit";
import { useEffect } from "react";

interface NotesDisplayProps {
  case_id: Case["id"];
  note: Note;
}

export default function NoteDisplay({ case_id, note }: NotesDisplayProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState({
    text: '',
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 }
  });
  const isTextSelected = selection.text.trim().length > 0;

  const [editInstructions, setEditInstructions] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

  const handleTextSelection = useCallback((event: React.MouseEvent) => {
    if (isTextSelected) {
      setDropdownPosition({ x: event.clientX, y: event.clientY });
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [isTextSelected]);

  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(selection.text);
    setIsDropdownOpen(false);
  }, [selection.text]);

  useEffect(() => {
    const handleSelection = () => {
      const selObj = window.getSelection();
      if (!selObj || selObj?.rangeCount === 0) return;

      const range = selObj.getRangeAt(0);
      const startRect = range.getClientRects()[0];
      const endRect = range.getClientRects()[range.getClientRects().length - 1];

      if (!startRect || !endRect) return;

      setSelection({
        text: selObj.toString(),
        start: { x: startRect.left, y: startRect.top },
        end: { x: endRect.left, y: endRect.bottom }
      });
    };

    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, []);

 
  return (
    <div className="relative" onMouseUp={handleTextSelection}>
      <span>{note.content}</span>
      <MagicEdit case_id={case_id} note={note} text_selection={selection.text}>
        <DropdownMenu open={isDropdownOpen && isTextSelected} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <div
              style={{
                position: "fixed",
                left: `${dropdownPosition.x}px`,
                top: `${dropdownPosition.y}px`,
                transform: `translate()`
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              disabled={!isTextSelected}
              onSelect={handleCopyText}
            >
              Copy Selection
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem disabled={!isTextSelected}>
                Magic Edit
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </MagicEdit>
    </div>
  );
}
