import NewAudio from "@/components/dashboard/case/new-audio";
import TextInput from "@/components/dashboard/case/text-input";
import TranscriptCard from "@/components/dashboard/case/transcript-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transcript } from "@/lib/transcript";

interface InputsProps {
  case_id: string;
  transcripts: Transcript[];
  textInput?: Transcript;
}

export default function Inputs({
  case_id,
  transcripts,
  textInput,
}: InputsProps) {
  const audioTranscripts = transcripts.filter(
    (transcript) => transcript.type !== "freetext"
  );

  return (
    <Tabs defaultValue="audio">
      <Card className="relative flex flex-col h-[calc(100vh-10rem)]">
        <CardHeader className="px-8 py-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="audio">
              <CardTitle className="text-xl">Audio Inputs</CardTitle>
            </TabsTrigger>
            <TabsTrigger value="text">
              <CardTitle className="text-xl">Text Input</CardTitle>
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value="audio">
          <div className="relative flex-grow overflow-hidden flex flex-col items-center gap-6">
            <NewAudio case_id={case_id} />
            <ScrollArea
              type="auto"
              className="w-full h-[calc(100vh-19.5rem)] border-t"
            >
              {audioTranscripts.map((transcript) => (
                <TranscriptCard
                  key={`transcript-${transcript.id}`}
                  transcript={transcript}
                />
              ))}
            </ScrollArea>
          </div>
        </TabsContent>
        <TabsContent value="text">
          <div className="mt-6">
            <TextInput
              case_id={case_id}
              transcript_id={textInput?.id}
              initial_content={textInput?.content}
            />
          </div>
        </TabsContent>
      </Card>
    </Tabs>
  );
}
