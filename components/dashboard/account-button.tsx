"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "lucide-react";
import Nextlink from "next/link";
import { Button } from "../ui/button";

export default function AccountButton() {
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Nextlink href={"/account"}>
            <Button variant="outline" size="icon">
              <User />
            </Button>
          </Nextlink>
        </TooltipTrigger>
        <TooltipContent>
          <span>Account settings</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
