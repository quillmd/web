"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Account, deleteAccount } from "@/lib/account";

export default function DeleteAccount({account} : {account: Account}) {

  const handleDelete = async () => {
    await deleteAccount();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Delete account</Button>
      </DialogTrigger>
      <DialogContent className="font-sans">
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>
            {
              "Are you sure you want to delete your account? All data accosiated with your account (cases, notes, etc) will be deleted and will not longer be accessible."
            }
          </DialogDescription>
        </DialogHeader>
        <Button onClick={handleDelete}>{`${
          account.subscription ? "Cancel subscription and " : ""
        }Delete account`}</Button>
      </DialogContent>
    </Dialog>
  );
}
