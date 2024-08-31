import SubscriptionPitch from "@/components/account/subscription-pitch";
import SubscriptionOverview from "@/components/account/subscription/subscription-overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAccount } from "@/lib/account";

export default async function SubscriptionPage() {
  const account = await getAccount();

  return (
    <Card className="h-[calc(100vh-4.5rem)]">
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>
          {account.subscription_exempt
            ? "Squire Unlimited activated"
            : account.subscription
            ? `Manage your Squire Unlimited subscription`
            : ``}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {account.status == "trial" || account.status == "trial_ended" ? (
          <SubscriptionPitch />
        ) : (
          <SubscriptionOverview exempt={account.subscription_exempt} />
        )}
      </CardContent>
    </Card>
  );
}
