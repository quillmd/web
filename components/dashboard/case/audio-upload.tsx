'use client';

import { useAudioUpload } from "@/lib/useAudioUpload";
import { Button } from "@/components/ui/button";

export default function AudioUpload({ case_id }: { case_id: number }) {
  const { uploaderStatus, handleFileChange, uploadAudio } = useAudioUpload({ case_id });

  return (
    <div>
      <input type="file" accept=".m4a" onChange={handleFileChange} />
      <Button onClick={uploadAudio} disabled={uploaderStatus === "uploading"}>
        {uploaderStatus === "uploading" ? "Uploading..." : "Upload Audio"}
      </Button>
    </div>
  );
}