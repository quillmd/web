"use client";

import { Button } from "@/components/ui/button";
import { useAudioUpload } from "@/lib/useAudioUpload";
import { CircleX, LoaderCircle, UploadCloud } from "lucide-react";

export default function AudioUpload({ case_id }: { case_id: number }) {
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
    <div>
      <input
        id="file-upload"
        type="file"
        accept=".m4a"
        onChange={handleUpload}
        className="hidden"
      />
      <Button
        className="w-36 h-36"
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
  );
}
