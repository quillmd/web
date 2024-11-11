import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import Nextlink from "next/link";

export default function AccountMenuItem() {
  return (
    <Nextlink href={"/account"}>
      <DropdownMenuItem>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </DropdownMenuItem>
    </Nextlink>
  );
}
