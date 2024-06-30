"use client";
import { Button } from "@/components/ui/button";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

interface NoteTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
}

export default function CopyButton({ text, className }: NoteTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      className={className}
      variant={"outline"}
      size={"sm"}
      onClick={handleCopyClick}
      aria-label="Copy"
    >
      {"Copy"}
      {copied ? (
        <Check className={"ml-0.5"} size={16} />
      ) : (
        <Clipboard className={"ml-0.5"} size={16} />
      )}
    </Button>
  );
}
