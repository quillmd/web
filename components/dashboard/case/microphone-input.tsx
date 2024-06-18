"use client";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAudioRecorder } from "@/lib/useAudioRecorder";
import { CircleX, LoaderCircle, Mic, Square } from "lucide-react";

export default function MicrophoneInput({ case_id }: { case_id: string }) {
  const { startRecording, stopRecording, recorderStatus } = useAudioRecorder({
    case_id,
    mode: "microphone",
  });
  const buttonStates = {
    recording: {
      Icon: Square,
      text: "Stop",
      onClick: () => stopRecording(),
    },
    idle: {
      Icon: Mic,
      text: "Listen",
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
    <HoverCard openDelay={250}>
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
          <span>{`Have Quill listen to your PC's microphone`}</span>
          <span className="text-xs text-muted-foreground">
            {`Useful for in-person conversations or dictation`}
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
