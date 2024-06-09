'use client';

import { useAudioUpload } from "@/lib/useAudioUpload";
import { Button } from "@/components/ui/button";
import { UploadCloud, LoaderCircle, CircleX } from "lucide-react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"  
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
      <HoverCard >
        <HoverCardTrigger asChild>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
            disabled={uploaderStatus === "uploading"}
          >
            {fileName ? fileName : "Choose .m4a File"}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <strong>Quill works with Zoom!</strong>
          <br /> 
          <br /> 
          1. Ask your patient if you can record your conversation so Quill can write your note
          <br /> 
          2. Press the record button on Zoom
          <br />
          3. Press "Record on this computer option"
          <br />
          4. When the meeting ends, Zoom will provide an .m4a audio file in the "Zoom" folder in Documents
          <br />
          5. Upload the .m4a file Zoom generated and watch the magic happen!
        </HoverCardContent>
      </HoverCard>
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