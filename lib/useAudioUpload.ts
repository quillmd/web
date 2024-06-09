import { getCookie } from "cookies-next";
import { useState } from "react";
import { revalidateTranscripts } from "./transcript";

type UploaderStatus = "idle" | "uploading" | "success" | "error";

type UploaderControls = {
  uploaderStatus: UploaderStatus;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useAudioUpload({
  case_id,
}: {
  case_id: number;
}): UploaderControls {
  const authToken = getCookie("accessToken");
  const [uploaderStatus, setUploaderStatus] = useState<UploaderStatus>("idle");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploaderStatus("uploading");
      const formData = new FormData();
      formData.append("file", e.target.files[0], e.target.files[0].name);
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
      return;
    }
  };

  return { uploaderStatus, handleUpload };
}
