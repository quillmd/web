import BreadcrumbNav from "@/components/dashboard/breadcrumb-nav";
import AudioUpload from "@/components/dashboard/case/audio-upload";
import CaseTitle from "@/components/dashboard/case/case-title";
import CreateNotes from "@/components/dashboard/case/create-notes";
import FreetextInput from "@/components/dashboard/case/freetext-input";
import MicrophoneInput from "@/components/dashboard/case/microphone-input";
import NoteCard from "@/components/dashboard/case/note-card";
import ShareInput from "@/components/dashboard/case/share-input";
import TranscriptCard from "@/components/dashboard/case/transcript-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Case, getCase } from "@/lib/case";
import { Note, getNotes } from "@/lib/note";
import { Template, getTemplates } from "@/lib/template";
import { Transcript, getTranscripts } from "@/lib/transcript";

async function getData(case_id: string) {
  const promiseArray = [
    getCase({ id: case_id }),
    getNotes({ case_id: case_id }),
    getTranscripts({ case_id: case_id }),
    getTemplates(),
  ];
  const results = await Promise.all(promiseArray);
  return {
    current_case: results[0] as Case,
    notes: results[1] as Note[],
    transcripts: results[2] as Transcript[],
    templates: results[3] as Template[],
  };
}

export default async function CasePage({
  params: { case_id },
}: {
  params: { case_id: string };
}) {
  const { current_case, notes, transcripts, templates } = await getData(
    case_id
  );
  const freetextInput = transcripts.find(
    (transcript) => transcript.type == "freetext"
  );
  const notesDisabled =
    transcripts.find((transcript) => transcript.status == "ready") == undefined;
  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbNav current_case={current_case} />
      <CaseTitle
        case_id={case_id}
        initial_title={current_case.title}
      />
      <Tabs defaultValue="notes">
        <TabsList className="grid w-1/2 grid-cols-3 mb-4">
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="text">Text Input</TabsTrigger>
          <TabsTrigger value="audio">Audio Input</TabsTrigger>
        </TabsList>
        <TabsContent value="notes">
          <div className="flex flex-col gap-4">
            <div className="my-2 mx-auto">
              <CreateNotes
                case_id={case_id}
                templates={templates}
                disabled={notesDisabled}
              />
            </div>
            {notes.map((note) => (
              <NoteCard
                key={`note-${note.id}`}
                case_id={case_id}
                note={note}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="text">
          <div className="my-4">
            <FreetextInput
              case_id={case_id}
              transcript_id={freetextInput?.id}
              initial_content={freetextInput?.content}
            />
          </div>
        </TabsContent>
        <TabsContent value="audio">
          <div className="flex flex-col gap-4">
            <div className="w-full flex justify-center gap-4 my-2">
              <MicrophoneInput case_id={case_id}/>
              <ShareInput case_id={case_id}/>
              <AudioUpload case_id={case_id} />
            </div>
            {transcripts
              .filter((transcript) => transcript.type != "freetext")
              .map((transcript) => (
                <TranscriptCard
                  key={`transcript-${transcript.id}`}
                  transcript={transcript}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
