"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth";
import { LogOut } from "lucide-react";

export default function LogoutMenuItem() {
  return (
    <DropdownMenuItem
      onClick={() => logout().then(() => console.log("logged out"))}
    >
      <LogOut className="ml-0.5 mr-2 h-4 w-4" />
      Log out
    </DropdownMenuItem>
  );
}
