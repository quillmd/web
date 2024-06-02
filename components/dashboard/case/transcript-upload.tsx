"use client";
import { Input } from "@/components/ui/input";
import { useAudioUpload } from "@/lib/useAudioUpload";

interface NewTranscriptProps extends React.HTMLAttributes<HTMLElement> {
  case_id: number;
}

export default function TranscriptUpload({ case_id }: NewTranscriptProps) {
  const { uploadStatus, startUpload } = useAudioUpload({
    case_id,
  });

  return <div>{uploadStatus}<Input disabled={uploadStatus!="idle"} type="file" onChange={startUpload} /></div>;
}
