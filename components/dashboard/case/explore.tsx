import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import type { Case } from "@/lib/case";
import type { Note } from "@/lib/note";
import { editNote } from "@/lib/note";
import { postQa, revalidateQas } from "@/lib/qa";
import NextLink from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface ExploreProps {
  qas: Qa[];
  case_id: Case["id"];
  note_id: Note["id"];
}

interface Qa {
  question: string;
  answer: string;
}

interface Citation {
  text: string;
  links: string[];
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

function ParsedCitationText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let idx = 0;
  let citationCount = 1;

  while (idx < text.length) {
    const markerStart = text.indexOf("^(", idx);
    if (markerStart === -1) {
      nodes.push(text.substring(idx));
      break;
    }

    if (markerStart > idx) {
      nodes.push(text.substring(idx, markerStart));
    }

    let markerEnd = markerStart + 2; // start after "^("
    let openParens = 1;
    while (markerEnd < text.length && openParens > 0) {
      const char = text[markerEnd];
      if (char === "(") {
        openParens++;
      } else if (char === ")") {
        openParens--;
      }
      markerEnd++;
    }

    if (openParens !== 0) {
      nodes.push(text.substring(markerStart));
      break;
    }

    const citationContent = text
      .substring(markerStart + 2, markerEnd - 1)
      .trim();

    const links: string[] = [];
    const linkRegex = /\[([^\]]+)\]/g;
    let match: RegExpExecArray | null;
    while ((match = linkRegex.exec(citationContent)) !== null) {
      links.push(match[1].trim());
    }

    const citationText = citationContent.replace(linkRegex, "").trim();

    const validLinks = links.filter((link) => isValidUrl(link));

    if (validLinks.length === 0) {
      nodes.push(citationText);
    } else {
      const citation: Citation = {
        text: citationText,
        links: validLinks,
      };

      nodes.push(
        <CitationMarker
          key={`citation-${citationCount}`}
          index={citationCount}
          citation={citation}
        />
      );
      citationCount++;
    }

    idx = markerEnd;
  }

  return <span>{nodes}</span>;
}

function CitationMarker({
  index,
  citation,
}: {
  index: number;
  citation: Citation;
}) {
  const firstLink = citation.links[0] || "#";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <NextLink
          href={firstLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:text-primary/80 transition-colors"
        >
          [{index}]
        </NextLink>
      </HoverCardTrigger>
      <HoverCardContent side="left" align="start" className="w-80 p-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{citation.text}</p>
          <div className="flex flex-wrap gap-2">
            {citation.links
              .filter((link) => link.toLowerCase() != "internet")
              .map(
                (link, idx) =>
                  idx === 0 && (
                    <NextLink
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-secondary hover:text-primary/80 underline transition-colors"
                    >
                      {"[link]"}
                    </NextLink>
                  )
              )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default function Explore({ qas, case_id, note_id }: ExploreProps) {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (qas.length > 0) {
      setOpenItem(`qa-0`);
    }
  }, [qas]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsSubmitting(true);
    try {
      await postQa({ case_id, note_id, question });
      setQuestion("");
      await revalidateQas({ case_id });
    } catch (error) {
      console.error("Error submitting question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Shift") {
      setIsShiftPressed(true);
    }
    if (e.key === "Enter" && !isShiftPressed) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Shift") {
      setIsShiftPressed(false);
    }
  };

  return (
    <Card className="col-span-1 flex flex-col overflow-hidden h-full">
      <CardHeader className="px-8 py-6">
        <div className="mx-auto flex gap-2 items-center justify-center">
          <CardTitle className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">Explore</div>
            <span className="text-sm text-muted-foreground text-center text-balance font-body">
              This is an experimental feature. Please verify all information
              independently before use.
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      <div className="relative flex-grow flex flex-col items-center gap-6">
        <ScrollArea
          type="auto"
          className="w-full h-[calc(100vh-22rem)] border-t"
        >
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
          >
            {qas.map((qa, i) => (
              <AccordionItem value={`qa-${i}`} key={`qa-key-${i}`}>
                <AccordionTrigger className="text-left font-body px-5">
                  {qa.question}
                </AccordionTrigger>
                <AccordionContent className="text-left font-body text-muted-foreground text-base px-4">
                  <ParsedCitationText text={qa.answer} />
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        const instructions = `Please update the note with the following information: "Q: ${qa.question} A: ${qa.answer}". Put this in the assessment or plan, whichever is most appropriate. Ensure the edit is not in q/a format, but follows the existing format of the note. Ensure that the update is entirely relevant to the patient case, and make it very brief without any explanation or citations.`;
                        try {
                          await editNote({ case_id, note_id, instructions });
                        } catch (err) {
                          console.error("Error editing note", err);
                        }
                      }}
                    >
                      Add to Note
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="w-full px-4 mb-4">
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Ask a question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            disabled={isSubmitting}
            className="flex-grow"
            rows={2}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Researching" : "Submit"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
