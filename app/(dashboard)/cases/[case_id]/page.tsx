import CaseTitle from "@/components/dashboard/case/case-title";
import CreateNote from "@/components/dashboard/case/create-note";
import FreetextInput from "@/components/dashboard/case/freetext-input";
import NoteCard from "@/components/dashboard/case/note-card";
import TranscriptCard from "@/components/dashboard/case/transcript-card";
import { Case, getCase } from "@/lib/case";
import { Note, getNotes } from "@/lib/note";
import { Transcript, getTranscripts } from "@/lib/transcript";

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
    <div className="w-full flex flex-col gap-8">
      <CaseTitle
        case_id={parseInt(case_id)}
        initial_title={current_case.title}
      />
      <div className="grid grid-cols-3 grid-rows-2 gap-8">
        <div className="row-span-2">
          <span>Freetext input:</span>
          <div className="flex flex-col">
            <FreetextInput
              case_id={parseInt(case_id)}
              transcript_id={freetextInput?.id}
              initial_content={freetextInput?.content}
            />
          </div>
        </div>
        <div className="row-span-2">
          <span>Audio inputs:</span>
          <div className="flex flex-col">
            {transcripts
              .filter((transcript) => transcript.type != "freetext")
              .map((transcript) => (
                <div key={`transcript-${transcript.id}`} className="w-full">
                  <TranscriptCard transcript={transcript} />
                </div>
              ))}
          </div>
        </div>
        <div>
          <span>Create notes:</span>
          <CreateNote case_id={parseInt(case_id)} />
        </div>
        <div>
          <span>Notes:</span>
          <div className="flex">
            {notes.map((note) => (
              <NoteCard
                key={`note-${note.id}`}
                case_id={parseInt(case_id)}
                note={note}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
