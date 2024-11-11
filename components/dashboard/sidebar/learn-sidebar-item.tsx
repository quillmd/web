import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BrainCircuit } from "lucide-react";
import Nextlink from "next/link";

export default function LearnSidebarItem({ active }: { active: boolean }) {
  return (
    <Nextlink href={"/learn"}>
      <SidebarMenuItem
        className={
          active ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
        }
      >
        <SidebarMenuButton>
          <BrainCircuit />
          Learn Squire
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Nextlink>
  );
}
