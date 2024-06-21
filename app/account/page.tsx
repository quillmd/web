import ProfileForm from "@/components/account/profile-form";
import { Separator } from "@/components/ui/separator";
import { getAccount } from "@/lib/account";

export default async function AccountProfilePage() {
  const account = await getAccount();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <span className="text-sm text-muted-foreground">
          Review your account information.
        </span>
      </div>
      <Separator />
      <ProfileForm email={account.email} />
    </div>
  );
}
