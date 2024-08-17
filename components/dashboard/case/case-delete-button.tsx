"use client";
import { Button } from "@/components/ui/button";
import { deleteCase } from "@/lib/case";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface CaseDeleteButtonProps {
  case_id: string;
  next_case_id?: string;
}

export default function CaseDeleteButton({
  case_id,
  next_case_id,
}: CaseDeleteButtonProps) {
  const router = useRouter();

  const handleDelete = () => {
    deleteCase({ id: case_id }).then(async () => {
      router.push(next_case_id ? `/cases/${next_case_id}` : "/home");
    });
  };

  return (
    <Button
      className="hover:text-destructive-foreground hover:bg-destructive/90"
      variant="ghost"
      size="icon"
      onClick={handleDelete}
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
