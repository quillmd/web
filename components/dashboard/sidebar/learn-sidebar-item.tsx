import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BrainCircuit } from "lucide-react";
import Nextlink from "next/link";

export default function LearnSidebarItem() {
  return (
    <Nextlink href={"/learn"}>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <BrainCircuit />
          Learn Squire
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Nextlink>
  );
}
