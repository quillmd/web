import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LinkIcon } from "lucide-react";
import Nextlink from "next/link";

interface CitationProps {
  index: number;
  citation: string;
  links: string[];
}

export function Citation({ index, citation, links }: CitationProps) {
  const firstLink = links[0] || "#";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Nextlink href={firstLink} className="align-super text-xs">
          [{index}]
        </Nextlink>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <p>{citation}</p>
        <div className="mt-2">
          {links.map((link, i) => (
            <Nextlink key={i} href={link} className="mr-2">
              <LinkIcon className="h-4 w-4 inline" />
            </Nextlink>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
