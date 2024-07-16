import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { revalidateTranscripts } from "./transcript";

type RecorderStatus = "idle" | "recording" | "uploading" | "success" | "error";

type RecorderControls = {
  recorderStatus: RecorderStatus;
  startRecording: (type: string) => void;
  stopRecording: () => void;
};

export function useAudioRecorder({
  case_id,
  mode,
}: {
  case_id: string;
  mode: string;
}): RecorderControls {
  const authToken = getCookie("accessToken");
  const [recorderStatus, setRecorderStatus] = useState<RecorderStatus>("idle");
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordType, setRecordType] = useState<string | null>(null);

  const startRecording = async (type: string) => {
    const [stream, recorder] = await requestRecorder(mode);
    setStream(stream);
    setRecorder(recorder);
    setRecordType(type);
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
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => {
      track.addEventListener("ended", () => stopRecording());
    });
  }, [stream]);

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
    formData.append("type", recordType || "");
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

async function requestRecorder(
  mode: string
): Promise<[MediaStream, MediaRecorder]> {
  if (mode == "share") {
    const displayMediaOptions = {
      video: {
        displaySurface: "browser",
      },
      audio: true,
      preferCurrentTab: false,
      selfBrowserSurface: "exclude",
      systemAudio: "include",
      surfaceSwitching: "include",
      monitorTypeSurfaces: "exclude",
    };
    const audioContext = new AudioContext();
    const micStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const micAudioTrack = micStream.getAudioTracks()[0];
    const shareStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    const shareAudioTrack = shareStream.getAudioTracks()[0];
    const shareAudioStream = new MediaStream([shareAudioTrack]);
    const micAudioIn = audioContext.createMediaStreamSource(micStream);
    const shareAudioIn = audioContext.createMediaStreamSource(shareAudioStream);
    const dest = audioContext.createMediaStreamDestination();
    micAudioIn.connect(dest);
    shareAudioIn.connect(dest);
    const destStream = dest.stream;
    const destAudioTrack = destStream.getAudioTracks()[0];
    const finalAudioStream = new MediaStream([
      destAudioTrack,
      micAudioTrack,
      shareAudioTrack,
    ]);

    return [
      finalAudioStream,
      new MediaRecorder(finalAudioStream, { mimeType: "audio/webm" }),
    ];
  } else {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return [stream, new MediaRecorder(stream, { mimeType: "audio/webm" })];
  }
}
