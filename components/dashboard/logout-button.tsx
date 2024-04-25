"use client";
import { logout } from "@/lib/user";
import { Button } from "../ui/button";

export default function LogoutButton() {
  return (
    <Button
      variant={"outline"}
      className="text-lg font-semibold"
      size={"lg"}
      onClick={() => logout().then(() => console.log("logged out"))}
    >
      Logout
    </Button>
  );
}
