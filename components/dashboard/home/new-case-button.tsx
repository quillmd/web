"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postCase } from "@/lib/case";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "../account-provider";

export default function NewCaseButton({ variant, ...props }: ButtonProps) {
  const { account } = useAccount();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const handleNewCase = async () => {
    const newCase = await postCase({ title: newTitle });
    router.push(`/cases/${newCase.id}`);
    setOpen(false);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleNewCase();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="focus-visible:ring-0"
          variant={variant}
          {...props}
          disabled={account.status == "trial_ended"}
        >
          + New Case
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Case</DialogTitle>
          <DialogDescription>Enter a title for this case</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Title
            </Label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <DialogFooter className="justify-end">
          <Button type="button" onClick={handleNewCase}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
