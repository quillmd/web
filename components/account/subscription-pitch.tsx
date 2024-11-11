"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
import SubscriptionPricingContent from "./subscription-pricing-content";

export default function SubscriptionPitch() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Squire Unlimited</CardTitle>
        <CardDescription>
          Simple, fair pricing to access Squire and support our mission.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly" className="relative">
              Yearly
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 px-1 py-0.5 text-xs"
              >
                Save $100
              </Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <SubscriptionPricingContent price="50" period="monthly" />
          </TabsContent>
          <TabsContent value="yearly">
            <SubscriptionPricingContent price="500" period="yearly" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
