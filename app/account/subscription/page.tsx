import SubscriptionOverview from "@/components/account/subscription/subscription-overview";
import { Separator } from "@/components/ui/separator";
import { getAccount } from "@/lib/account";

export default async function SubscriptionPage() {
  const account = await getAccount();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Subscription</h3>
        <span className="text-sm text-muted-foreground">
          {account.subscription_exempt
            ? "Squire Unlimited activated"
            : account.subscription
            ? `Manage your Squire Unlimited subscription`
            : `Subscribe to Squire Unlimited`}
        </span>
      </div>
      <Separator />
      {(account.subscription_exempt || account.subscription) && (
        <SubscriptionOverview exempt={account.subscription_exempt} />
      )}
    </div>
  );
}
