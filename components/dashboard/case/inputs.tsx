import NewInput from "@/components/dashboard/case/new-input";
import TranscriptCard from "@/components/dashboard/case/transcript-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Transcript } from "@/lib/transcript";

interface InputsProps {
  case_id: string;
  transcripts: Transcript[];
}

export default function Inputs({ case_id, transcripts }: InputsProps) {
  return (
    <Card className="col-span-1 flex flex-col overflow-hidden h-[calc(100vh-7.5rem)]">
      <CardHeader className="px-8 py-6">
        <div className="mx-auto flex gap-2 items-center justify-center">
          <CardTitle className="text-xl">Inputs</CardTitle>
        </div>
      </CardHeader>
      <div className="relative flex-grow overflow-hidden flex flex-col items-center gap-6">
        <NewInput case_id={case_id} disabled={false}/>
        <ScrollArea
          type="auto"
          className="w-full h-[calc(100vh-19.5rem)] border-t"
        >
          {transcripts.map((transcript) => (
            <TranscriptCard
              key={`transcript-${transcript.id}`}
              case_id={case_id}
              transcript={transcript}
            />
          ))}
        </ScrollArea>
      </div>
    </Card>
  );
}
