"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeMenuItem() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <DropdownMenuItem
      onClick={() => setTheme(resolvedTheme == "light" ? "dark" : "light")}
    >
      {resolvedTheme === "light" ? (
        <Moon className="mr-2 h-4 w-4" />
      ) : (
        <Sun className="mr-2 h-4 w-4" />
      )}
      {resolvedTheme === "light" ? "Dark Mode" : "Light Mode"}
    </DropdownMenuItem>
  );
}
