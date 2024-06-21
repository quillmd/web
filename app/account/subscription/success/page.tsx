import { Separator } from "@/components/ui/separator";

export default async function SubscriptionSuccessPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Success!</h3>
      </div>
      <Separator />
      <h3 className="text-lg font-medium">Thank you for supporting Quill!</h3>
    </div>
  );
}
