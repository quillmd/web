"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAudioRecorder } from "@/lib/useAudioRecorder";
import { useAudioUpload } from "@/lib/useAudioUpload";
import {
  CircleHelp,
  CircleX,
  LoaderCircle,
  Mic,
  ScreenShare,
  Square,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";

interface NewAudioProps {
  case_id: string;
}

export default function NewAudio({ case_id }: NewAudioProps) {
  const {
    startRecording: startMicRecording,
    stopRecording: stopMicRecording,
    recorderStatus: micStatus,
  } = useAudioRecorder({
    case_id,
    mode: "microphone",
  });

  const {
    startRecording: startShareRecording,
    stopRecording: stopShareRecording,
    recorderStatus: shareStatus,
  } = useAudioRecorder({
    case_id,
    mode: "share",
  });

  const { uploaderStatus, handleUpload } = useAudioUpload({ case_id });

  const activeInput =
    micStatus != "idle"
      ? "microphone"
      : shareStatus != "idle"
      ? "share"
      : uploaderStatus != "idle"
      ? "upload"
      : null;

  const handleMicrophoneClick = () => {
    startMicRecording();
  };

  const handleShareClick = () => {
    startShareRecording();
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload")?.click();
  };

  const handleStopRecording = () => {
    if (activeInput === "microphone") {
      stopMicRecording();
    } else if (activeInput === "share") {
      stopShareRecording();
    }
  };

  const getButtonContent = () => {
    switch (activeInput) {
      case "microphone":
        return {
          Icon:
            micStatus === "recording"
              ? Square
              : micStatus === "uploading"
              ? LoaderCircle
              : CircleX,
          text:
            micStatus === "recording"
              ? "Stop"
              : micStatus === "uploading"
              ? "Submitting"
              : "Error",
          onClick: micStatus === "recording" ? handleStopRecording : () => {},
        };
      case "share":
        return {
          Icon:
            shareStatus === "recording"
              ? Square
              : shareStatus === "uploading"
              ? LoaderCircle
              : CircleX,
          text:
            shareStatus === "recording"
              ? "Stop Sharing"
              : shareStatus === "uploading"
              ? "Submitting"
              : "Error",
          onClick: shareStatus === "recording" ? handleStopRecording : () => {},
        };
      case "upload":
        return {
          Icon:
            uploaderStatus === "uploading"
              ? LoaderCircle
              : uploaderStatus === "error"
              ? CircleX
              : UploadCloud,
          text:
            uploaderStatus === "uploading"
              ? "Uploading"
              : uploaderStatus === "error"
              ? "Error"
              : "Upload",
          onClick: handleUploadClick,
        };
      default:
        return null;
    }
  };

  const buttonContent = getButtonContent();

  return (
    <>
      <input
        id="file-upload"
        type="file"
        accept="audio/*"
        onChange={(e) => {
          handleUpload(e);
        }}
        className="hidden"
      />
      {activeInput ? (
        <Button
          className="w-36"
          variant="outline"
          onClick={buttonContent?.onClick}
        >
          {buttonContent && (
            <>
              <buttonContent.Icon
                className={
                  buttonContent.text === "Submitting" ? "animate-spin" : ""
                }
                size={14}
              />
              &nbsp;
              {buttonContent.text}
            </>
          )}
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-36">
              + New Audio
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <HoverCard openDelay={500}>
              <DropdownMenuItem onClick={handleMicrophoneClick}>
                <Mic className="w-4 h-4 mr-2" />
                <span>Microphone</span>
                <DropdownMenuShortcut>
                  <HoverCardTrigger>
                    <CircleHelp size={14} />
                  </HoverCardTrigger>
                </DropdownMenuShortcut>
              </DropdownMenuItem>

              <HoverCardContent side="right" sideOffset={15}>
                <div className="flex flex-col gap-1">
                  <span>{`Have Quill listen to your PC's microphone`}</span>
                  <span className="text-xs text-muted-foreground">
                    {`Useful for in-person conversations or dictation`}
                  </span>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={500}>
              <DropdownMenuItem onClick={handleShareClick}>
                <ScreenShare className="w-4 h-4 mr-2" />
                <span>Share Screen</span>
                <DropdownMenuShortcut>
                  <HoverCardTrigger>
                    <CircleHelp size={14} />
                  </HoverCardTrigger>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <HoverCardContent side="right" align="start" sideOffset={15}>
                <div className="flex flex-col gap-1">
                  <span>{`Share your screen with Quill`}</span>
                  <span className="text-xs text-muted-foreground">
                    {`Useful for telehealth visits - Quill will listen to the conversation`}
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <Image
                    src="/share-steps.png"
                    alt="Share steps"
                    width={400}
                    height={361}
                  />
                  <span className="text-xs text-muted-foreground">
                    {`1. Select only the telehealth app tab`}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {`2. Make sure that audio is shared`}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {`3. Click "Share" to start`}
                  </span>
                </div>
              </HoverCardContent>
            </HoverCard>
            <HoverCard openDelay={500}>
              <DropdownMenuItem onClick={handleUploadClick}>
                <UploadCloud className="w-4 h-4 mr-2" />
                <span>Upload Audio</span>
                <DropdownMenuShortcut>
                  <HoverCardTrigger>
                    <CircleHelp size={14} />
                  </HoverCardTrigger>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <HoverCardContent side="right" sideOffset={15}>
                <div className="flex flex-col gap-1">
                  <span>{`Upload audio for Quill to listen to`}</span>
                </div>
              </HoverCardContent>
            </HoverCard>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
