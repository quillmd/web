"use client";

import { Button } from "@/components/ui/button";
import { useAudioUpload } from "@/lib/useAudioUpload";
import { CircleX, LoaderCircle, UploadCloud } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function AudioUpload({ case_id }: { case_id: string }) {
  const { uploaderStatus, handleUpload } = useAudioUpload({ case_id });

  const buttonStates = {
    idle: {
      Icon: UploadCloud,
      text: "Upload",
    },
    uploading: {
      Icon: LoaderCircle,
      text: "Uploading",
    },
    error: {
      Icon: CircleX,
      text: "Error",
    },
  };

  const buttonState =
    uploaderStatus === "uploading"
      ? buttonStates.uploading
      : uploaderStatus === "error"
      ? buttonStates.error
      : buttonStates.idle;

  return (
    <HoverCard openDelay={250}>
    <HoverCardTrigger>
    <div>
      <input
        id="file-upload"
        type="file"
        accept="audio/*"
        onChange={handleUpload}
        className="hidden"
      />
      <Button
        className="w-36"
        variant="outline"
        onClick={() => document.getElementById("file-upload")?.click()}
        disabled={uploaderStatus === "uploading"}
      >
        <buttonState.Icon
          className={uploaderStatus === "uploading" ? "animate-spin" : ""}
          size={14}
        />
        &nbsp;
        {buttonState.text}
      </Button>
    </div>
    </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-1">
          <span>{`Upload audio for Quill to listen to`}</span>
          {/* <span className="text-xs text-muted-foreground">
            {`Useful for in-person conversations or dictation`}
          </span> */}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
