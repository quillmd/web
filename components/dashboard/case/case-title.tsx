"use client";
import { Input } from "@/components/ui/input";
import { updateCase } from "@/lib/case";
import { useDebounce } from "@/lib/useDebounce";
import { SetStateAction, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

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
    <header className="flex h-16 shrink-0 items-center gap-2 w-full">
    <div className="flex items-center gap-2 w-full">
      {/* <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" /> */}
      <Input
      value={title}
      onChange={handleChange}
      className="border-transparent text-2xl font-semibold tracking-tight transition-colors shadow-none hover:border-ring"
      placeholder="Case Title"
    />
    </div>
  </header>
  );
}
