import ScribeSelection from "@/components/account/scribe-selection";
import { Separator } from "@/components/ui/separator";
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
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">Scribes</h3>
        <span className="text-sm text-muted-foreground">
          Choose a scribe that matches your preferred note style
        </span>
      </div>
      <Separator />
      <ScribeSelection preferred_scribe={account.scribe} scribes={scribes} />
    </div>
  );
}
