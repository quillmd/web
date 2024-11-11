"use client";
import { Button } from "@/components/ui/button";
import { Case } from "@/lib/case";
import { editNote, Note } from "@/lib/note";
import { useAccount } from "../account-provider";

const pronounsButtons = [
  { display: "She", gender: "female", pronouns: "she/her" },
  { display: "He", gender: "male", pronouns: "he/him" },
  { display: "They", gender: "nonbinary", pronouns: "they/them" },
];

interface PronounButtonProps {
  case_id: Case["id"];
  note_id: Note["id"];
}

export default function PronounButtons({
  case_id,
  note_id,
}: PronounButtonProps) {
  const { account } = useAccount();
  const handleChangePronouns = async (gender: string, pronouns: string) => {
    await editNote({
      case_id,
      note_id,
      instructions: `The patient is ${gender}. Change the patient's pronouns in this note to ${pronouns}`,
    });
  };
  return (
    <div className="grid grid-cols-3 w-full gap-2">
      {pronounsButtons.map((value) => (
        <Button
          key={`pronouns-button-${value.display.toLowerCase()}`}
          variant={"default"}
          onClick={() => handleChangePronouns(value.gender, value.pronouns)}
          disabled={account.status == "trial_ended"}
        >
          {value.display}
        </Button>
      ))}
    </div>
  );
}
