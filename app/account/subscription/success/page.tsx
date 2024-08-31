import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SubscriptionSuccessPage() {
  return (
    <Card className="h-[calc(100vh-4.5rem)]">
      <CardHeader>
        <CardTitle>Success!</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium">
          Thank you for supporting Squire!
        </h3>
      </CardContent>
    </Card>
  );
}
