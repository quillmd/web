import CreateNotes from "@/components/dashboard/case/create-notes";
import FreetextInput from "@/components/dashboard/case/freetext-input";
import NoteCard from "@/components/dashboard/case/note-card";
import TranscriptCard from "@/components/dashboard/case/transcript-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Case, getCase } from "@/lib/case";
import { Note, getNotes } from "@/lib/note";
import { Transcript, getTranscripts } from "@/lib/transcript";
import BreadcrumbNav from "@/components/dashboard/breadcrumb-nav";
import CaseTitle from "@/components/dashboard/case/case-title";

async function getData(case_id: number) {
  const promiseArray = [
    getCase({ id: case_id }),
    getNotes({ case_id: case_id }),
    getTranscripts({ case_id: case_id }),
  ];
  const results = await Promise.all(promiseArray);
  return {
    current_case: results[0] as Case,
    notes: results[1] as Note[],
    transcripts: results[2] as Transcript[],
  };
}

export default async function CasePage({
  params: { case_id },
}: {
  params: { case_id: string };
}) {
  const { current_case, notes, transcripts } = await getData(parseInt(case_id));
  const freetextInput = transcripts.find(
    (transcript) => transcript.type == "freetext"
  );
  return (
    <div className="flex flex-col gap-2">
    <BreadcrumbNav current_case={current_case} /> 
    <CaseTitle
        case_id={parseInt(case_id)}
        initial_title={current_case.title}
      />
    <Tabs defaultValue="notes">
      <TabsList className="grid w-1/2 grid-cols-3 mb-2">
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="text">Text Input</TabsTrigger>
        <TabsTrigger value="audio">Audio Input</TabsTrigger>
      </TabsList>
      <TabsContent value="notes">
        <div className="flex flex-col gap-2">
          {notes.map((note) => (
            <NoteCard
              key={`note-${note.id}`}
              case_id={parseInt(case_id)}
              note={note}
            />
          ))}
          <CreateNotes case_id={parseInt(case_id)} />
        </div>
      </TabsContent>
      <TabsContent value="text">
        <FreetextInput
          case_id={parseInt(case_id)}
          transcript_id={freetextInput?.id}
          initial_content={freetextInput?.content}
        />
      </TabsContent>
      <TabsContent value="audio">
        <div className="flex flex-col gap-2">
          {transcripts
            .filter((transcript) => transcript.type != "freetext")
            .map((transcript) => (
              <div key={`transcript-${transcript.id}`} className="w-full">
                <TranscriptCard transcript={transcript} />
              </div>
            ))}
        </div>
      </TabsContent>
    </Tabs>
    </div>
  );
}
