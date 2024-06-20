"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Case } from "@/lib/case";
import { Note } from "@/lib/note";
import Nextlink from "next/link";

interface BreadcrumbNavProps {
  current_case?: Case;
  note?: Note;
}

export default function BreadcrumbNav({
  current_case,
  note,
}: BreadcrumbNavProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {current_case && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/cases/${current_case.id}`}>
                {`Case: ${current_case.title}`}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {note && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Nextlink href={`/case/${current_case?.id}/notes/${note.id}`}>
                  {`Note: ${note.template?.title || "Generic Note"} ${
                    note.version
                  }`}
                </Nextlink>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
