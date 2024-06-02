import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { revalidateTranscripts } from "./transcript";

type UploadStatus = "idle" | "uploading" | "success" | "error";

type RecorderControls = {
  uploadStatus: UploadStatus;
  startUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useAudioUpload({
  case_id,
}: {
  case_id: number;
}): RecorderControls {
  const authToken = getCookie("accessToken");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");

  const startUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const audioBlob = e.target.files?.[0];
    if (audioBlob) {
      const audio_file = new File([audioBlob], "audio.m4a", {
        type: "audio/mp4",
      });

      setUploadStatus("uploading");
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
      setUploadStatus("idle");
    }
  };

  return { uploadStatus, startUpload };
}
