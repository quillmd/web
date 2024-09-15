"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { logout } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function LogoutButton() {
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
          className="bg-card"
            variant="outline"
            size="icon"
            onClick={() => logout().then(() => console.log("logged out"))}
          >
            <LogOut />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Log out</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
