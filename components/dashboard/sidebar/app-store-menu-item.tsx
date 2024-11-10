import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Smartphone } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Image from "next/image";

export default function AppStoreMenuItem() {
    return (
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Smartphone className="mr-2 h-4 w-4" />
            Get the iPhone app
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="p-0">
            <div className="p-4">
              <Image
                src="/app_store_qr_code.png"
                alt="App Store QR"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      )
}
