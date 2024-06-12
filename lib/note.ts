"use server";

import { DateTime } from "luxon";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Case } from "./case";
import { Template } from "./template";

export interface Note {
  id: string;
  template_id: Template["id"];
  content: string;
  status: string;
  version: number;
  template: Template;
  inserted_at: string;
}

export async function getNotes({
  case_id,
}: {
  case_id: Case["id"];
}): Promise<Note[]> {
  const tags = [`notes-${case_id}`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/notes`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      next: { tags },
    }
  );
  const data = await response.json();
  const notes = Object.values(data).sort(
    (a, b) =>
      //@ts-ignore
      DateTime.fromISO(b.inserted_at).toMillis() -
      //@ts-ignore
      DateTime.fromISO(a.inserted_at).toMillis()
  );
  return notes as Note[];
}

export async function getNote({
  case_id,
  note_id,
}: {
  case_id: Case["id"];
  note_id: Note["id"];
}): Promise<Note> {
  const tags = [`notes-${case_id}`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/notes/${note_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      next: { tags },
    }
  );
  const note = await response.json();
  return note as Note;
}

export async function postNote({
  case_id,
  template_id,
}: {
  case_id: Case["id"];
  template_id: Template["id"];
}) {
  const tags = [`notes-${case_id}`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const data: Partial<Note> = {};
  if (template_id !== undefined) {
    data.template_id = template_id;
  }
  await fetch(`${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/notes`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}

export async function updateNote({
  case_id,
  note_id,
  content,
}: {
  case_id: Case["id"];
  note_id: Note["id"];
  content?: Note["content"];
}) {
  const tags = [`notes-${case_id}`];
  const data: Partial<Note> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  if (content !== undefined) {
    data.content = content;
  }
  await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/notes/${note_id}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}

export async function deleteNote({
  case_id,
  note_id,
}: {
  case_id: Case["id"];
  note_id: Note["id"];
}) {
  const tags = [`notes-${case_id}`];
  const data: Partial<Note> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/notes/${note_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}

export async function revalidateNotes({ case_id }: { case_id: Case["id"] }) {
  const tags = [`notes-${case_id}`];
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}
