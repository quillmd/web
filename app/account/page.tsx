import ProfileForm from "@/components/account/profile-form";
import { Separator } from "@/components/ui/separator";

export default function AccountProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <span className="text-sm text-muted-foreground">
          Edit your account information.
        </span>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
