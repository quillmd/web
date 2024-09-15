"use server";

import { DateTime } from "luxon";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Case } from "./case";
import { Template } from "./template";
import { API_URL } from "./api-config";
import { Scribe } from "./scribe";

export interface Note {
  id: string;
  template_id: Template["id"];
  scribe_id: Scribe["id"];
  content: string;
  status: string;
  version: number;
  template: Template;
  inserted_at: string;
  updated_at: string;
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
    `${API_URL}/api/cases/${case_id}/notes`,
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
    `${API_URL}/api/cases/${case_id}/notes/${note_id}`,
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
  scribe_id
}: {
  case_id: Case["id"];
  template_id: Template["id"];
  scribe_id?: Scribe["id"]
}) {
  const tags = [`notes-${case_id}`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const data: Partial<Note> = {
    template_id: template_id,
    scribe_id: scribe_id
  };

  await fetch(`${API_URL}/api/cases/${case_id}/notes`, {
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

export async function editNote({
  case_id,
  note_id,
  instructions,
}: {
  case_id: Case["id"];
  note_id: Note["id"];
  instructions: string;
}) {
  const tags = [`notes-${case_id}`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  await fetch(
    `${API_URL}/api/cases/${case_id}/notes/${note_id}/edit`,
    {
      method: "POST",
      body: JSON.stringify({instructions}),
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
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  await fetch(
    `${API_URL}/api/cases/${case_id}/notes/${note_id}`,
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
