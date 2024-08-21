import SubscriptionPitch from "@/components/account/subscription-pitch";
import SubscriptionOverview from "@/components/account/subscription/subscription-overview";
import { Separator } from "@/components/ui/separator";
import { getAccount } from "@/lib/account";

export default async function SubscriptionPage() {
  const account = await getAccount();
  console.log(account)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Subscription</h3>
        <span className="text-sm text-muted-foreground">
          {account.subscription_exempt
            ? "Squire Unlimited activated"
            : account.subscription
            ? `Manage your Squire Unlimited subscription`
            : ``}
        </span>
      </div>
      <Separator />
      {account.status == "trial" || account.status == "trial_ended" ? (
        <SubscriptionPitch />
      ) : (
        <SubscriptionOverview exempt={account.subscription_exempt} />
      )}
    </div>
  );
}
