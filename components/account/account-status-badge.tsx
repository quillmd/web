import { Account } from "@/lib/account";
import { Badge } from "../ui/badge";

export default async function AccountStatusBadge({
  account,
}: {
  account: Account;
}) {
  if (account.status == "active")
    return (
      <Badge className="hover:cursor-default hover:bg-primary">Unlimited</Badge>
    );
  return (
    <Badge className="hover:cursor-default hover:bg-primary">{`Trial ${
      account.status == "trial_ended" ? "ended" : ""
    } - ${
      account.status == "trial_ended" ? 0 : 10 - (account.note_count || 0)
    } notes remaining`}</Badge>
  );
}
