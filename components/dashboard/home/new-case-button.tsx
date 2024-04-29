"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postCase } from "@/lib/case";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCaseButton() {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState("");
  const handleNewCase = async () => {
    const newCase = await postCase({title:newTitle});
    router.push(`/cases/${newCase.id}`);
  };

  return (
    <div className="flex flex-col max-w-md gap-2">
      <Input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New Case Title"
      ></Input>
      <Button onClick={handleNewCase}>Create New Case</Button>
    </div>
  );
}
