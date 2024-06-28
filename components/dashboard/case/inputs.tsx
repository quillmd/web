"use client";

import AddInput from "@/components/dashboard/case/add-input";
import TextInput from "@/components/dashboard/case/text-input";
import TranscriptCard from "@/components/dashboard/case/transcript-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Transcript } from "@/lib/transcript";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

interface InputsProps {
  case_id: string;
  transcripts: Transcript[];
  textInput?: Transcript;
}

export default function Inputs({ case_id, transcripts, textInput }:InputsProps) {
  const [showAudio, setShowAudio] = useState<boolean>(true);

  const audioTranscripts = transcripts.filter(
    (transcript) => transcript.type !== "freetext"
  );

  return (
    <Card className="flex flex-col h-full relative">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl">
            {showAudio ? "Audio Inputs" : "Text Input"}
          </CardTitle>
          <Button
            className="text-muted-foreground"
            variant="link"
            onClick={() => setShowAudio(!showAudio)}
          >
            {showAudio ? "Text Input" : "Audio Inputs"} <ArrowRight size={14} />
          </Button>
        </div>
        <AddInput case_id={case_id} />
      </CardHeader>
      {showAudio ? (
        <>
          {audioTranscripts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-muted-foreground mb-4">
                {`Click "Add Input" to get started`}
              </p>
            </div>
          ) : (
            audioTranscripts.map((transcript) => (
              <React.Fragment key={`transcript-${transcript.id}`}>
                <Separator />
                <TranscriptCard transcript={transcript} />
              </React.Fragment>
            ))
          )}
          <Separator />
        </>
      ) : (
        <TextInput
          case_id={case_id}
          transcript_id={textInput?.id}
          initial_content={textInput?.content}
        />
      )}
    </Card>
  );
};