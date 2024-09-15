import CaseTitle from "@/components/dashboard/case/case-title";
import FirstSteps from "@/components/dashboard/case/first-steps";
import Notes from "@/components/dashboard/case/notes";
import { Account, getAccount } from "@/lib/account";
import { Case, getCase } from "@/lib/case";
import { Note, getNotes } from "@/lib/note";
import { Scribe, getScribes } from "@/lib/scribe";
import { Template, getTemplates } from "@/lib/template";
import { Transcript, getTranscripts } from "@/lib/transcript";

async function getData(case_id: string) {
  const promiseArray = [
    getAccount(),
    getCase({ id: case_id }),
    getNotes({ case_id: case_id }),
    getTranscripts({ case_id: case_id }),
    getTemplates(),
    getScribes(),
  ];
  const results = await Promise.all(promiseArray);
  return {
    account: results[0] as Account,
    current_case: results[1] as Case,
    notes: results[2] as Note[],
    transcripts: results[3] as Transcript[],
    templates: results[4] as Template[],
    scribes: results[5] as Scribe[],
  };
}

export default async function CasePage({
  params: { case_id },
}: {
  params: { case_id: string };
}) {
  const { account, current_case, notes, transcripts, templates, scribes } =
    await getData(case_id);
  const isFirstTranscriptReady =
    transcripts.find((transcript) => transcript.status == "ready") != undefined;
  const isFirstNoteReady =
    notes.find((note) => note.status == "ready") != undefined;
  return (
    <>
      {!isFirstTranscriptReady || !isFirstNoteReady ? (
        <FirstSteps
          className={"h-[calc(100vh-4.5rem)]"}
          account={account}
          case_id={current_case.id}
          case_title={current_case.title}
          transcripts={transcripts}
          notes={notes}
          templates={templates}
        />
      ) : (
        <div className="flex flex-col gap-3">
          <CaseTitle
            case_id={current_case.id}
            initial_title={current_case.title}
          />
          <Notes
            case_id={current_case.id}
            templates={templates}
            notes={notes}
            transcripts={transcripts}
            scribes={scribes}
          />
        </div>
      )}
    </>
  );
}
