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
      onClick={handleCopyClick}
      aria-label="Copy"
    >
      {copied ? (
        <Check className={"mr-0.5"} size={16} />
      ) : (
        <Clipboard className={"mr-0.5"} size={16} />
      )}
      {"Copy"}
    </Button>
  );
}
