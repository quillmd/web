"use client";
import { Input } from "@/components/ui/input";
import { updateCase } from "@/lib/case";
import { useDebounce } from "@/lib/useDebounce";
import { SetStateAction, useState } from "react";

interface CaseTitleProps extends React.HTMLAttributes<HTMLElement> {
  case_id: string;
  initial_title: string;
}

export default function CaseTitle({ case_id, initial_title }: CaseTitleProps) {
  const [title, setTitle] = useState(initial_title);

  const debouncedSet = useDebounce(
    () => updateCase({ id: case_id, title: title }),
    1000
  );

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setTitle(e.target.value);
    debouncedSet();
  };
  return (
    <Input
      value={title}
      onChange={handleChange}
      className="text-2xl font-semibold tracking-tight transition-colors shadow-none border-hidden hover:border-solid"
      placeholder="Case Title"
    />
  );
}
