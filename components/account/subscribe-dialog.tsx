"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCookie } from "cookies-next";
import { Check } from "lucide-react";
import { useAccount } from "../dashboard/account-provider";

export default function SubscribeDialog() {
  const authToken = getCookie("accessToken");
  const { account } = useAccount();
  return (
    <Dialog defaultOpen={account.status == "trial_ended"}>
      <DialogTrigger asChild>
        <Button>Unlock Unlimited</Button>
      </DialogTrigger>
      <DialogContent className="font-sans">
        <DialogHeader>
          <DialogTitle>Squire Unlimited</DialogTitle>
          <DialogDescription>
            Simple, fair pricing to access Squire and support our mission.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full grid grid-cols-3 items-center gap-4 py-1">
          <div className="flex justify-end items-baseline">
            <span className="text-5xl">$99</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <ul className="col-span-2 text-foreground">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 fill-black" />
              Unlimited notes
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 fill-black" />
              Most advanced analysis engine
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 fill-black" />
              Priority access during high traffic
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 fill-black" />
              First to use new features
            </li>
          </ul>
        </div>
        <form
          action={`${process.env.NEXT_PUBLIC_API}/api/account/subscription/subscribe`}
          method="post"
        >
          <input type="hidden" name="authorization" value={authToken} />
          <input type="hidden" name="plan_id" value={"squire-monthly"} />
          <Button className={"w-full"} size="lg">
            Subscribe
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
