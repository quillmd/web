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

interface NotesDisplayProps {
  case_id: Case["id"];
  note: Note;
  extractedContent: string;
}

export default function NoteDisplay({
  case_id,
  note,
  extractedContent,
}: NotesDisplayProps) {
  const [selectedText, setSelectedText] = useState("");
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState<
    number | null
  >(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTextSelection = useCallback(
    (event: React.MouseEvent) => {
      const selection = window.getSelection();
      if (
        selection &&
        selection.toString().trim().length > 0 &&
        selection.toString() !== selectedText
      ) {
        setSelectedParagraphIndex(null);
        setSelectedText(selection.toString());
        setDropdownPosition({ x: event.clientX, y: event.clientY });
        setIsDropdownOpen(true);
      } else {
        setSelectedText("");
        setIsDropdownOpen(false);
      }
    },
    [selectedText]
  );

  const handleParagraphClick = useCallback(
    (event: React.MouseEvent<HTMLParagraphElement>, index: number) => {
      const selection = window.getSelection();
      if (!selection || selection?.toString().trim().length == 0) {
        setSelectedParagraphIndex(index);
        const paragraph = event.currentTarget;
        setSelectedText(paragraph.textContent || "");
        setDropdownPosition({ x: event.clientX, y: event.clientY });
        setIsDropdownOpen(true);
      }
    },
    []
  );

  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(selectedText);
    setIsDropdownOpen(false);
  }, [selectedText]);

  return (
    <>
      <div
        ref={contentRef}
        className="font-body whitespace-pre-wrap flex flex-col gap-4"
        onMouseUp={handleTextSelection}
      >
        {extractedContent.split("\n\n").map((paragraph, i) => (
          <p
            key={`note-paragraph-${i}`}
            className={`cursor-pointer transition-colors duration-200 ${
              i === selectedParagraphIndex && isDropdownOpen
                ? "bg-primary/20"
                : "hover:bg-primary/10"
            }`}
            onClick={(e) => handleParagraphClick(e, i)}
          >
            {paragraph}
          </p>
        ))}
      </div>
      <MagicEdit
        case_id={case_id}
        note={note}
        extractedContent={extractedContent}
        text_selection={selectedText}
      >
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <div
              style={{
                position: "fixed",
                left: `${dropdownPosition.x}px`,
                top: `${dropdownPosition.y}px`,
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={handleCopyText}>
              {`Copy ${
                selectedParagraphIndex !== null ? `Section` : `Selection`
              }`}
            </DropdownMenuItem>
            {/* <DialogTrigger asChild>
              <DropdownMenuItem>Magic Edit</DropdownMenuItem>
            </DialogTrigger> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </MagicEdit>
    </>
  );
}
