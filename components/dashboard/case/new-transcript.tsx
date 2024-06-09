"use client";
import { Button } from "@/components/ui/button";
import { useAudioRecorder } from "@/lib/useAudioRecorder";
import { CircleX, LoaderCircle, Mic, Square } from "lucide-react";

interface NewTranscriptProps extends React.HTMLAttributes<HTMLElement> {
  case_id: number;
}

export default function NewTranscript({ case_id }: NewTranscriptProps) {
  const { startRecording, stopRecording, recorderStatus } = useAudioRecorder({
    case_id,
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
    <Button className="w-36" variant="outline" onClick={buttonState.onClick}>
      <buttonState.Icon
        className={recorderStatus == "uploading" ? "animate-spin" : ""}
        size={14}
      />
      &nbsp;
      {buttonState.text}
    </Button>
  );
}
