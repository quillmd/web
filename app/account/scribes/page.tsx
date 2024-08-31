import ScribeSelection from "@/components/account/scribe-selection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Account, getAccount } from "@/lib/account";
import { getScribes, Scribe } from "@/lib/scribe";

async function getData() {
  const promiseArray = [getAccount(), getScribes()];
  const results = await Promise.all(promiseArray);
  return {
    account: results[0] as Account,
    scribes: results[1] as Scribe[],
  };
}

export default async function AccountScribesePage() {
  const { account, scribes } = await getData();
  return (
    <Card className="h-[calc(100vh-4.5rem)]">
      <CardHeader>
        <CardTitle>Choose Your Squire</CardTitle>
        <CardDescription>
          Select a squire that best fits your note-taking needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScribeSelection preferred_scribe={account.scribe} scribes={scribes} />
      </CardContent>
    </Card>
  );
}
