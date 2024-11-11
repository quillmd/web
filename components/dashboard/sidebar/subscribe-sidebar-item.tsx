import SubscriptionPricingContent from "@/components/account/subscription-pricing-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SubscribeSidebarItem() {
  return (
    <>
      <DialogTrigger asChild>
        <Button className="w-full" size="sm">
          Unlock Squire Unlimited
        </Button>
      </DialogTrigger>
      <DialogContent className="font-sans max-w-lg">
        <DialogHeader>
          <DialogTitle>Squire Unlimited</DialogTitle>
          <DialogDescription>
            Simple, fair pricing to access Squire and support our mission.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </>
  );
}
