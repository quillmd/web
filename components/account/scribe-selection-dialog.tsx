import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Account } from "@/lib/account";
import { getScribes } from "@/lib/scribe";
import ScribeSelection from "./scribe-selection";

export default async function ScribeSelectionDialog({
  account,
}: {
  account: Account;
}) {
  const scribes = await getScribes();
  return (
    <AlertDialog open={!account.scribe}>
      <AlertDialogContent className={"w-fit max-w-screen-xl"}>
        <AlertDialogHeader>
          <AlertDialogTitle>Choose Your Squire</AlertDialogTitle>
          <AlertDialogDescription>
            Select a Squire that matches your note writing style. You can change
            this selection anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScribeSelection scribes={scribes} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
