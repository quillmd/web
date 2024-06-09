'use client';

import { useAudioUpload } from "@/lib/useAudioUpload";
import { Button } from "@/components/ui/button";
import { UploadCloud, LoaderCircle, CircleX } from "lucide-react";
import { useState } from "react";

export default function AudioUpload({ case_id }: { case_id: number }) {
  const { uploaderStatus, handleFileChange, uploadAudio } = useAudioUpload({ case_id });
  const [fileName, setFileName] = useState("");

  const buttonStates = {
    idle: {
      Icon: UploadCloud,
      text: "Upload Audio",
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      handleFileChange(event);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        id="file-upload"
        type="file"
        accept=".m4a"
        onChange={handleFileSelect}
        className="hidden"
      />
      <Button
        className="w-full"
        variant="outline"
        onClick={() => document.getElementById("file-upload")?.click()}
        disabled={uploaderStatus === "uploading"}
      >
        {fileName ? fileName : "Choose .mp4 File"}
      </Button>
      <Button
        className="w-full"
        onClick={uploadAudio}
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