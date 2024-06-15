"use client";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAudioRecorder } from "@/lib/useAudioRecorder";
import { CircleX, LoaderCircle, MonitorCheck, ScreenShare } from "lucide-react";

export default function ShareInput({ case_id }: { case_id: string }) {
  const { startRecording, recorderStatus } = useAudioRecorder({
    case_id,
    mode: "share",
  });
  const buttonStates = {
    recording: {
      Icon: MonitorCheck,
      text: "Sharing with Quill",
      onClick: () => null,
    },
    idle: {
      Icon: ScreenShare,
      text: "Share",
      onClick: () => startRecording(),
    },
    uploading: {
      Icon: LoaderCircle,
      text: "Submitting",
      onClick: () => null,
    },
    error: {
      Icon: CircleX,
      text: "Error",
      onClick: () => null,
    },
  };
  const buttonState =
    recorderStatus === "recording"
      ? buttonStates.recording
      : recorderStatus === "idle"
      ? buttonStates.idle
      : recorderStatus == "uploading"
      ? buttonStates.uploading
      : buttonStates.error;
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          className="w-36"
          variant="outline"
          onClick={buttonState.onClick}
        >
          <buttonState.Icon
            className={recorderStatus == "uploading" ? "animate-spin" : ""}
            size={14}
          />
          &nbsp;
          {buttonState.text}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-1">
          <span>{`Share your screen with Quill`}</span>
          <span className="text-xs text-muted-foreground">
            {`Useful for telehealth visits - Quill will listen to the conversation`}
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
