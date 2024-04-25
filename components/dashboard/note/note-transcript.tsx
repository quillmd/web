"use client";
import Markdown from "react-markdown";

function convertTranscriptToMarkdown(transcript: string): string {
  const lines = transcript.split("\n");
  const markdown: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("Doctor:") || line.startsWith("Patient:")) {
      const [speaker, dialogue] = line.split(":");
      const formattedLine = `**${speaker}:** ${dialogue.trim()}`;
      markdown.push(formattedLine);

      if (i < lines.length - 1) {
        markdown.push("");
      }
    } else {
      markdown.push(line);
    }
  }

  return markdown.join("\n");
}

interface NoteTranscriptProps extends React.HTMLAttributes<HTMLElement> {
  transcript: string;
}

export default function NoteTranscript({ transcript }: NoteTranscriptProps) {
  return (
    <Markdown
      components={{
        h1: ({ children }: { children?: React.ReactNode }) => (
          <p className="leading-7 [&:not(:first-child)]:mt-4">#{children}</p>
        ),
        h2: ({ children }: { children?: React.ReactNode }) => (
          <span className="leading-7 [&:not(:first-child)]:mt-6">
            {children}
          </span>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
          <span className="leading-7 [&:not(:first-child)]:mt-6">
            {children}
          </span>
        ),
        p: ({ children }: { children?: React.ReactNode }) => (
          <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
        ),
        a: ({
          children,
          href,
        }: {
          children?: React.ReactNode;
          href?: string;
        }) => (
          <a
            href={href}
            className="font-medium text-primary underline underline-offset-4"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }: { children?: React.ReactNode }) => (
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            {children}
          </blockquote>
        ),
        ul: ({ children }: { children?: React.ReactNode }) => (
          <ul className="ml-6 list-disc ">{children}</ul>
        ),
        ol: ({ children }: { children?: React.ReactNode }) => (
          <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
        ),
        li: ({ children }: { children?: React.ReactNode }) => (
          <li>{children}</li>
        ),
        table: ({ children }: { children?: React.ReactNode }) => (
          <div className="my-6 w-full overflow-y-auto">{children}</div>
        ),
        th: ({
          children,
          align,
        }: {
          children?: React.ReactNode;
          align?: "center" | "left" | "right" | "justify" | "char" | undefined;
        }) => (
          <th
            className={`border px-4 py-2 text-left font-bold ${
              align === "center"
                ? "text-center"
                : align === "right"
                ? "text-right"
                : ""
            }`}
            align={align}
          >
            {children}
          </th>
        ),
        td: ({
          children,
          align,
        }: {
          children?: React.ReactNode;
          align?: "center" | "left" | "right" | "justify" | "char" | undefined;
        }) => (
          <td
            className={`border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right`}
            align={align}
          >
            {children}
          </td>
        ),
      }}
    >
      {convertTranscriptToMarkdown(transcript)}
    </Markdown>
  );
}
