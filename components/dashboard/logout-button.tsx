"use client";
import { logout } from "@/lib/auth";
import { Button } from "../ui/button";

export default function LogoutButton() {
  return (
    <Button
      variant={"ghost"}
      className="text-lg font-semibold"
      onClick={() => logout().then(() => console.log("logged out"))}
    >
      Logout
    </Button>
  );
}
