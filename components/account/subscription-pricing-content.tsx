import { getCookie } from "cookies-next";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

interface SubscriptionPricingContentProps {
  price: string;
  period: string;
}
export default function SubscriptionPricingContent({
  price,
  period,
}: SubscriptionPricingContentProps) {
  const authToken = getCookie("accessToken");
  return (
    <>
      <div className="w-full grid grid-cols-3 items-center gap-4 py-1">
        <div className="flex justify-end items-baseline">
          <span className="text-5xl">${price}</span>
          <span className="text-muted-foreground">
            /{period == "monthly" ? "mo" : "yr"}
          </span>
        </div>
        <ul className="col-span-2 text-foreground">
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            Unlimited notes
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            Most advanced analysis engine
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            Priority access during high traffic
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            First to use new features
          </li>
        </ul>
      </div>
      <form
        action={`${process.env.NEXT_PUBLIC_API}/api/account/subscription/subscribe`}
        method="post"
      >
        <input type="hidden" name="authorization" value={authToken} />
        <input type="hidden" name="plan_id" value={`squire-${period}`} />
        <Button className="w-full mt-4" size="lg">
          Unlock Squire Unlimited
        </Button>
      </form>
    </>
  );
}
