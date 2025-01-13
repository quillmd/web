"use client";
import { Button } from "@/components/ui/button";
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
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { postCase } from "@/lib/case";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "../account-provider";

export default function NewCaseButton() {
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
        <SidebarMenuButton
          className="focus-visible:ring-0 bg-secondary text-secondary-foreground"
          disabled={account.status == "trial_ended"}
        >
          {account.status == "trial_ended" ? "Daily limit reached" : `+ New Patient`}
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Patient</DialogTitle>
          <DialogDescription>Enter a name for this encounter</DialogDescription>
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
