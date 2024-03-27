"use client";

import { updateNote } from "@/lib/note";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface NoteNameProps extends React.HTMLAttributes<HTMLElement> {
  noteId: string;
  name: string;
}

export default function NoteName({ className, noteId, name }: NoteNameProps) {
  const [inputState, setInputState] = useState(false);
  const [nameState, setNameState] = useState(name);
  const handleNameChange = async () => {
    await updateNote({ id: noteId, name: nameState });
    setInputState(false);
  };
  return (
    <div>
      {inputState ? (
        <div className="flex gap-2">
          <Input
            value={nameState}
            onChange={(e) => setNameState(e.target.value)}
          />{" "}
          <Button onClick={handleNameChange}>Save</Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <h2
            className={cn(
              "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
              className
            )}
          >
            {nameState}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setInputState(true)}
          >
            <Edit />
          </Button>
        </div>
      )}
    </div>
  );
}
