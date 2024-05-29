"use client";
import { CircleUserRound } from "lucide-react";
import Nextlink from "next/link";
import { Button } from "../ui/button";

export default function AccountButton() {
  return (
    <Nextlink href={"/account"}>
      <Button variant={"ghost"} size={"icon"} className="text-lg font-semibold">
        <CircleUserRound />
      </Button>
    </Nextlink>
  );
}
