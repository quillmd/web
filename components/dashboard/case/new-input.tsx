"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
import { Case } from "@/lib/case";
import { useAudioRecorder } from "@/lib/useAudioRecorder";
import { useAudioUpload } from "@/lib/useAudioUpload";
import { cn } from "@/lib/utils";
import {
  AudioLines,
  CircleHelp,
  CircleX,
  ClipboardType,
  LoaderCircle,
  MessagesSquare,
  Mic,
  ScreenShare,
  Square,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import { useAccount } from "../account-provider";
import TextInput from "./text-input";

interface NewInputProps {
  case_id: Case["id"];
  disabled: boolean;
  idle_text: string;
}
const Overlay = () => (
  <div className="fixed h-screen w-screen z-50">
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
  </div>
);

export default function NewInput({
  case_id,
  disabled,
  idle_text,
}: NewInputProps) {
  const { account } = useAccount();
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
    shareStatus != "idle"
      ? "share"
      : micStatus != "idle"
      ? "microphone"
      : uploaderStatus != "idle"
      ? "upload"
      : null;

  const handleInterviewClick = () => {
    startMicRecording("interview");
  };

  const handleNarrationClick = () => {
    startMicRecording("narration");
  };

  const handleShareClick = () => {
    startShareRecording("interview");
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
              ? AudioLines
              : micStatus === "uploading"
              ? LoaderCircle
              : CircleX,
          text:
            micStatus === "recording"
              ? "Listening"
              : micStatus === "uploading"
              ? "Submitting"
              : "Error",
          hoverText: micStatus === "recording" ? "Stop" : null,
          HoverIcon: Square,
          onClick: micStatus === "recording" ? handleStopRecording : () => {},
        };
      case "share":
        return {
          Icon:
            shareStatus === "recording"
              ? AudioLines
              : shareStatus === "uploading"
              ? LoaderCircle
              : CircleX,
          text:
            shareStatus === "recording"
              ? "Listening"
              : shareStatus === "uploading"
              ? "Submitting"
              : "Error",
          hoverText: shareStatus === "recording" ? "Stop Sharing" : null,
          HoverIcon: Square,
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
          HoverIcon: Square,
          onClick: handleUploadClick,
        };
      default:
        return null;
    }
  };

  const buttonContent = getButtonContent();

  return (
    <>
      {activeInput && <Overlay />}
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
        <Button className="w-36 group z-50" onClick={buttonContent?.onClick}>
          {buttonContent && (
            <>
              <buttonContent.Icon
                className={cn(
                  buttonContent.hoverText
                    ? "inline group-hover:hidden"
                    : "inline",
                  buttonContent.text === "Listening"
                    ? "animate-pulse"
                    : buttonContent.text === "Submitting"
                    ? "animate-spin"
                    : ""
                )}
                size={14}
              />
              <buttonContent.HoverIcon
                className={
                  buttonContent.hoverText
                    ? "hidden group-hover:inline"
                    : "hidden"
                }
                size={14}
              />
              &nbsp;
              <span
                className={
                  buttonContent.hoverText
                    ? "inline group-hover:hidden"
                    : "inline"
                }
              >
                {buttonContent.text}
              </span>
              <span
                className={
                  buttonContent.hoverText
                    ? "hidden group-hover:inline"
                    : "hidden"
                }
              >
                {buttonContent.hoverText}
              </span>
            </>
          )}
        </Button>
      ) : (
        <Dialog>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-36"
                disabled={account.status == "trial_ended" || disabled}
              >
                {account.status == "trial_ended" ? "Daily limit reached" : idle_text}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <HoverCard openDelay={200}>
                <DropdownMenuItem onClick={handleNarrationClick}>
                  <Mic className="w-4 h-4 mr-2" />
                  <span>Narration</span>
                  <DropdownMenuShortcut>
                    <HoverCardTrigger>
                      <CircleHelp size={14} />
                    </HoverCardTrigger>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>

                <HoverCardContent side="left" sideOffset={140}>
                  <div className="flex flex-col gap-1">
                    <span>{`Tell Squire about the patient using your PC's microphone`}</span>
                    <span className="text-xs text-muted-foreground">
                      {`Click 'Allow' when prompted.`}
                    </span>
                  </div>
                  <div className="flex flex-col mt-2">
                    <Image
                      src="/allow-microphone.png"
                      alt="Allow microphone"
                      width={400}
                      height={361}
                    />
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard openDelay={200}>
                <DropdownMenuItem onClick={handleInterviewClick}>
                  <MessagesSquare className="w-4 h-4 mr-2" />
                  <span>Interview</span>
                  <DropdownMenuShortcut>
                    <HoverCardTrigger>
                      <CircleHelp size={14} />
                    </HoverCardTrigger>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>

                <HoverCardContent side="left" sideOffset={140}>
                  <div className="flex flex-col gap-1">
                    <span>{`Squire will listen to the interview using your PC's microphone`}</span>
                    <span className="text-xs text-muted-foreground">
                      {`Position microphone to hear all speakers. Click 'Allow' when prompted.`}
                    </span>
                  </div>
                  <div className="flex flex-col mt-2">
                    <Image
                      src="/allow-microphone.png"
                      alt="Allow microphone"
                      width={400}
                      height={361}
                    />
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard openDelay={200}>
                <DropdownMenuItem onClick={handleShareClick}>
                  <ScreenShare className="w-4 h-4 mr-2" />
                  <span>Telehealth</span>
                  <DropdownMenuShortcut>
                    <HoverCardTrigger>
                      <CircleHelp size={14} />
                    </HoverCardTrigger>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <HoverCardContent side="left" align="start" sideOffset={140}>
                  <div className="flex flex-col gap-1">
                    <span>{`Share your screen with Squire and it will listen to the interview`}</span>
                    <span className="text-xs text-muted-foreground">
                      {`Squire will only listen to the conversation and does not record your screen`}
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
              <HoverCard openDelay={200}>
                <DropdownMenuItem onClick={handleUploadClick}>
                  <UploadCloud className="w-4 h-4 mr-2" />
                  <span>Upload</span>
                  <DropdownMenuShortcut>
                    <HoverCardTrigger>
                      <CircleHelp size={14} />
                    </HoverCardTrigger>
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <HoverCardContent side="left" sideOffset={140}>
                  <div className="flex flex-col gap-1">
                    <span>{`Upload an audio file for Squire to listen to`}</span>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <HoverCard openDelay={200}>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <ClipboardType className="w-4 h-4 mr-2" />
                    <span>Text</span>
                    <DropdownMenuShortcut>
                      <HoverCardTrigger>
                        <CircleHelp size={14} />
                      </HoverCardTrigger>
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DialogTrigger>
                <HoverCardContent side="left" sideOffset={140}>
                  <div className="flex flex-col gap-1">
                    <span>{`Free text input of information you want your Squire to know`}</span>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </DropdownMenuContent>
          </DropdownMenu>
          <TextInput case_id={case_id} />
        </Dialog>
      )}
    </>
  );
}
