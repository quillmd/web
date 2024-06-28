import BreadcrumbNav from "@/components/dashboard/breadcrumb-nav";
import CaseTitle from "@/components/dashboard/case/case-title";
import Inputs from "@/components/dashboard/case/inputs";
import Notes from "@/components/dashboard/case/notes";
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
  const textInput = transcripts.find(
    (transcript) => transcript.type == "freetext"
  );
  const notesDisabled =
    transcripts.find((transcript) => transcript.status == "ready") == undefined;
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-4.5rem)]">
      <BreadcrumbNav current_case={current_case} />
      <CaseTitle case_id={case_id} initial_title={current_case.title} />
      <div className="grid grid-cols-2 w-full flex-1 gap-2">
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
        />
      </div>
    </div>
  );
}
