import CaseTitle from "@/components/dashboard/case/case-title";
import Inputs from "@/components/dashboard/case/inputs";
import Notes from "@/components/dashboard/case/notes";
import { Case, getCase } from "@/lib/case";
import { Note, getNotes } from "@/lib/note";
import { getScribes } from "@/lib/scribe";
import { Template, getTemplates } from "@/lib/template";
import { Transcript, getTranscripts } from "@/lib/transcript";
import { Scribe } from "@/lib/scribe";

async function getData(case_id: string) {
  const promiseArray = [
    getCase({ id: case_id }),
    getNotes({ case_id: case_id }),
    getTranscripts({ case_id: case_id }),
    getTemplates(),
    getScribes()
  ];
  const results = await Promise.all(promiseArray);
  return {
    current_case: results[0] as Case,
    notes: results[1] as Note[],
    transcripts: results[2] as Transcript[],
    templates: results[3] as Template[],
    scribes: results[4] as Scribe[]
  };
}

export default async function CasePage({
  params: { case_id },
}: {
  params: { case_id: string };
}) {
  const { current_case, notes, transcripts, templates, scribes } = await getData(
    case_id
  );
  const textInput = transcripts.find(
    (transcript) => transcript.type == "freetext"
  );
  const notesDisabled =
    transcripts.find((transcript) => transcript.status == "ready") == undefined;
  return (
    <div className="flex flex-col gap-3">
      <CaseTitle case_id={case_id} initial_title={current_case.title} />
      <div className="grid flex-1 w-full grid-cols-2 gap-2">
        <Inputs
          case_id={case_id}
          transcripts={transcripts}
          textInput={textInput}
        />

        <Notes
          case_id={case_id}
          templates={templates}
          notes={notes}
          notesDisabled={notesDisabled}
          transcripts={transcripts}
          scribes={scribes}
        />
      </div>
    </div>
  );
}
