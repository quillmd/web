"use client";
import { Button } from "@/components/ui/button";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

function insertLineBreaks(markdown: string) {
  return markdown.replace(/:/g, ":\n");
}

interface NoteTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
}

export default function NoteText({ text }: NoteTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <Button
        className="absolute right-2"
        variant={"outline"}
        size={"icon"}
        onClick={handleCopyClick}
        aria-label="Copy"
      >
        {copied ? <Check /> : <Clipboard />}
      </Button>
      <Markdown
        components={{
          h1: ({ children }: { children?: React.ReactNode }) => (
            <p className="leading-7 [&:not(:first-child)]:mt-4">#{children}</p>
          ),
          h2: ({ children }: { children?: React.ReactNode }) => (
            <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
          ),
          h3: ({ children }: { children?: React.ReactNode }) => (
            <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
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
            align?:
              | "center"
              | "left"
              | "right"
              | "justify"
              | "char"
              | undefined;
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
            align?:
              | "center"
              | "left"
              | "right"
              | "justify"
              | "char"
              | undefined;
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
        {insertLineBreaks(text)}
      </Markdown>
    </div>
  );
}
