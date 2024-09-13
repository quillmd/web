"use client";
import SubscribeDialog from "@/components/account/subscribe-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Account } from "@/lib/account";
import { Case, postCase } from "@/lib/case";
import { Note } from "@/lib/note";
import { Template } from "@/lib/template";
import { Transcript } from "@/lib/transcript";
import { cn } from "@/lib/utils";
import { Check, CircleX, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NewInput from "./new-input";
import NewNote from "./new-note";

interface FirstStepsProps extends React.HTMLAttributes<HTMLElement> {
  account: Account;
  case_id?: Case["id"];
  case_title: Case["title"];
  transcripts: Transcript[];
  notes: Note[];
  templates: Template[];
}

const renderStepIndicator = (step: number, status?: string) => {
  if (status == "processing") {
    return <LoaderCircle className="w-6 h-6 animate-spin" />;
  } else if (status == "ready") {
    return <Check className="w-6 h-6" />;
  } else if (status == "error") {
    return <CircleX className="w-8 h-8" />;
  }
  return step;
};

const renderInputText = (status?: string) => {
  if (status == "processing") {
    return "Processing input...";
  } else if (status == "ready") {
    return "Processing complete";
  } else if (status == "error") {
    return "There was an error with your input";
  }
  return "Add the first input";
};

const renderNoteText = (status?: string) => {
  if (status == "processing") {
    return "Processing note...";
  } else if (status == "ready") {
    return "Note complete";
  } else if (status == "error") {
    return "There was an error with your note";
  }
  return "Create a note";
};

export default function FirstSteps({
  account,
  case_id,
  case_title,
  transcripts,
  notes,
  templates,
  className,
}: FirstStepsProps) {
  const firstTranscript = transcripts?.[0];
  const firstNote = notes?.[0];

  const router = useRouter();
  const [newTitle, setNewTitle] = useState(case_title);
  const [loading, setLoading] = useState(false);

  const handleNewCase = async () => {
    setLoading(true);
    const newCase = await postCase({ title: newTitle });
    router.push(`/cases/${newCase.id}`);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleNewCase();
    }
  };

  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden justify-center",
        className
      )}
    >
      <div className="max-w-md mx-auto pb-48">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight font-heading">
            {account.status !== "trial_ended"
              ? "Create a case to get started"
              : "Get Squire Unlimited to continue"}
          </h1>
          {account.status !== "trial_ended" ? (
            <>
              <div className="flex items-center space-x-4 w-full">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full ${
                    case_id != undefined
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                  } flex items-center justify-center`}
                >
                  {renderStepIndicator(
                    1,
                    loading ? "processing" : case_id ? "ready" : ""
                  )}
                </div>
                <div className="flex-grow text-left">
                  <Input
                  className="bg-background"
                    disabled={case_id != undefined}
                    placeholder="Title this case"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <Button
                  className="w-36"
                  onClick={handleNewCase}
                  disabled={
                    newTitle.length == 0 || loading || case_id != undefined
                  }
                >
                  {case_id != undefined
                    ? "Case Created"
                    : !loading
                    ? "Create Case"
                    : "Loading"}
                </Button>
              </div>
              <div className="flex items-center space-x-4 w-full">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full ${
                    case_id == undefined?
                      "bg-muted text-muted-foreground"
                    : firstTranscript?.status == "ready"?
                    "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                  } flex items-center justify-center`}
                >
                  {renderStepIndicator(2, firstTranscript?.status)}
                </div>
                <div
                  className={`flex-grow text-left ${
                    (case_id == undefined ||
                      firstTranscript?.status == "ready") &&
                    "text-muted-foreground"
                  }`}
                >
                  <h2 className="text-lg font-semibold">
                    {renderInputText(firstTranscript?.status)}
                  </h2>
                </div>
                {case_id == undefined ? (
                  <Button className="w-36" disabled>{`+ Add Input`}</Button>
                ) : (
                  <NewInput
                    case_id={case_id}
                    disabled={
                      firstTranscript?.status === "ready" ||
                      case_id === undefined ||
                      firstTranscript?.status === "processing"
                    }
                  />
                )}
              </div>
              <div className="flex items-start space-x-4 w-full">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full ${
                    firstTranscript?.status === "ready"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } flex items-center justify-center`}
                >
                  {renderStepIndicator(3, firstNote?.status)}
                </div>
                <div
                  className={`flex-grow text-left ${
                    firstTranscript?.status != "ready" &&
                    "text-muted-foreground"
                  }`}
                >
                  <h2 className="text-lg font-semibold">
                    {renderNoteText(firstNote?.status)}
                  </h2>
                </div>
                {case_id == undefined ? (
                  <Button className="w-36" disabled>{`+ New Note`}</Button>
                ) : (
                  <NewNote
                    case_id={case_id}
                    templates={templates}
                    disabled={
                      firstTranscript?.status != "ready" ||
                      firstNote?.status == "processing"
                    }
                  />
                )}
              </div>
            </>
          ) : (
            <SubscribeDialog />
          )}
        </div>
      </div>
    </Card>
  );
}
