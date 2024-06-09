import { useState } from "react";
import { revalidateTranscripts } from "./transcript";
import { getCookie } from 'cookies-next';

type UploaderStatus = "idle" | "uploading" | "success" | "error";

type UploaderControls = {
  uploaderStatus: UploaderStatus;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadAudio: () => void;
};

export function useAudioUpload({ case_id }: { case_id: number }): UploaderControls {
  const authToken = getCookie("accessToken");
  const [uploaderStatus, setUploaderStatus] = useState<UploaderStatus>("idle");
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudioFile(e.target.files[0]);
    }
  };

  const uploadAudio = async () => {
    if (!audioFile) return;

    setUploaderStatus("uploading");
    const formData = new FormData();
    formData.append("file", audioFile, "audio.m4a");
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
    setUploaderStatus("idle");
    setAudioFile(null);
  };

  return { uploaderStatus, handleFileChange, uploadAudio };
}