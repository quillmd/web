"use client";
import { Button } from "@/components/ui/button";
import { Case } from "@/lib/case";
import { Note, postNote } from "@/lib/note";
import { useState } from "react";

export default function CreateNote({ case_id }: { case_id: Case["id"] }) {
  const [isLoading, setisLoading] = useState(false);

  const createNote = (type: Note["type"]) => {
    setisLoading(true);
    postNote({ case_id, type }).then(() => setisLoading(false));
  };

  return (
    <div className="flex justify-around">
      <Button disabled={isLoading} onClick={() => createNote("hp")}>
        {isLoading ? "Loading" : "Create H&P"}
      </Button>
      <Button disabled={isLoading} onClick={() => createNote("soap")}>
        {isLoading ? "Loading" : "Create SOAP"}
      </Button>
    </div>
  );
}
