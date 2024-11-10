import { Account } from "@/lib/account";
import { Badge } from "../ui/badge";
import { useAccount } from "../dashboard/account-provider";

export default function AccountStatusBadge({
}: {
}) {
  const {account} = useAccount()
  if (account.status == "active")
    return (
      <Badge className="w-full hover:cursor-default hover:bg-primary text-center items-center justify-center">{accountStatusText(account)}</Badge>
    );
  return (
    <Badge className="w-full hover:cursor-default hover:bg-primary text-center items-center justify-center">{accountStatusText(account)}</Badge>
  );
}

export function accountStatusText(account:Account){
  if (account.status == "active"){
    return "Squire Unlimited"
  }
  else if (account.status == "trial_ended") {
    return("Trial ended")
  }
  else {
    return(`Trial - ${10 - (account.note_count || 0)} notes remaining`)
  }
}