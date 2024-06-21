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
import { cancelSubscription } from "@/lib/account";
import { Check } from "lucide-react";

export default function SubscriptionOverview({ exempt }: { exempt: boolean }) {
  const handleCancel = async () => {
    await cancelSubscription();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thanks for your subscription to Quill</CardTitle>
        <CardDescription>
          Your subscription gives you access to unlimited notes and helps
          support Quill.
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
        <form hidden={exempt} onSubmit={handleCancel}>
          <Button type="submit">Cancel Plan</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
