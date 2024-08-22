import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Smartphone } from "lucide-react";
import Image from "next/image";

export default function AppStoreQrDialog() {
  return (
    <Dialog>
      <TooltipProvider delayDuration={250}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Smartphone />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span>Get the iPhone app</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scan the QR code to get the iPhone app</DialogTitle>
        </DialogHeader>
        <Image
          src={"/app_store_qr_code.png"}
          alt="App Store QR"
          width={400}
          height={400}
        />
      </DialogContent>
    </Dialog>
  );
}
