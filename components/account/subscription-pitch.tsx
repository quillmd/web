"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCookie } from "cookies-next";
import { Check } from "lucide-react";

export default function SubscriptionPitch() {
  const authToken = getCookie("accessToken");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Squire Unlimited</CardTitle>
        <CardDescription>
          Simple, fair pricing to access Squire and support our mission.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter>
        <form
          action={`${process.env.NEXT_PUBLIC_API}/api/account/subscription/subscribe`}
          method="post"
        >
          <input type="hidden" name="authorization" value={authToken} />
          <input type="hidden" name="plan_id" value={"squire-monthly"} />
          <Button size="lg">Subscribe</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
