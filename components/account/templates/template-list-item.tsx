"use client";
import { Template } from "@/lib/template";
import { cn } from "@/lib/utils";
import Nextlink from "next/link";
import { usePathname } from "next/navigation";

export default function TemplateListItem({ template }: { template: Template }) {
  const pathname = usePathname();
  const regexTemplatesPathname = /\/templates\/(\d+)/;
  const selected =
    pathname.match(regexTemplatesPathname)?.[1] == `${template.id}`;

  return (
    <Nextlink href={`/account/templates/${template.id}`}>
      <button
        className={cn(
          "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent w-full",
          selected && "bg-muted"
        )}
      >
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{template.title}</div>
            </div>
            <div
              className={cn(
                "ml-auto text-xs",
                selected ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {/* {DateTime.fromISO(template.inserted_at).toLocaleString(
                DateTime.DATETIME_SHORT
              )} */}
            </div>
          </div>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          {template.instructions ?? template.examples?.[1]}
        </div>
      </button>
    </Nextlink>
  );
}
