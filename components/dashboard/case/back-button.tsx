"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant={"outline"}
      size="icon"
      type="button"
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </Button>
  );
}
