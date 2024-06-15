import ProfileForm from "@/components/account/profile-form";
import { Separator } from "@/components/ui/separator";
import { refreshToken } from "@/lib/user";

export default async function AccountProfilePage() {
  const { email } = await refreshToken();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <span className="text-sm text-muted-foreground">
          Review your account information.
        </span>
      </div>
      <Separator />
      {email && <ProfileForm email={email} />}
    </div>
  );
}
