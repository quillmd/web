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
          <AlertDialogTitle>Choose Your Scribe</AlertDialogTitle>
          <AlertDialogDescription>
            Select a scribe that best fits your note-taking needs. You can
            switch at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScribeSelection scribes={scribes} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
