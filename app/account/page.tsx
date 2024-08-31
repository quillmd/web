import DeleteAccount from "@/components/account/delete-account";
import ProfileForm from "@/components/account/profile-form";
import { Separator } from "@/components/ui/separator";
import { getAccount } from "@/lib/account";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AccountProfilePage() {
  const account = await getAccount();
  return (
    <Card className="h-[calc(100vh-4.5rem)]">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Review your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
      <ProfileForm account={account} />
      <DeleteAccount account={account} />
      </CardContent>
    </Card>
  );
}
