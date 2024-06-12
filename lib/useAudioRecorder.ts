import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { revalidateTranscripts } from "./transcript";

type RecorderStatus = "idle" | "recording" | "uploading" | "success" | "error";

type RecorderControls = {
  recorderStatus: RecorderStatus;
  startRecording: () => void;
  stopRecording: () => void;
};

export function useAudioRecorder({
  case_id,
}: {
  case_id: string;
}): RecorderControls {
  const authToken = getCookie("accessToken");
  const [recorderStatus, setRecorderStatus] = useState<RecorderStatus>("idle");
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startRecording = async () => {
    const [stream, recorder] = await requestRecorder();
    setStream(stream);
    setRecorder(recorder);
    recorder.start();
    setRecorderStatus("recording");
  };

  const stopRecording = () => {
    if (recorder && stream) {
      recorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    if (!recorder) return;

    const handleData = (e: BlobEvent) => {
      uploadAudio(e.data);
      recorder.removeEventListener("dataavailable", handleData);
      setRecorder(null);
    };

    recorder.addEventListener("dataavailable", handleData);

    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder]);

  const uploadAudio = async (audioBlob: Blob) => {
    const audio_file = new File([audioBlob], "audio.opus", {
      type: "audio/webm",
    });

    setRecorderStatus("uploading");
    const formData = new FormData();
    formData.append("file", audio_file, "audio.opus");
    formData.append("case_id", case_id.toString());
    await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/transcripts`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    await revalidateTranscripts({ case_id });
    setRecorderStatus("idle");
  };

  return { recorderStatus, startRecording, stopRecording };
}

async function requestRecorder(): Promise<[MediaStream, MediaRecorder]> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return [stream, new MediaRecorder(stream, { mimeType: "audio/webm" })];
}
