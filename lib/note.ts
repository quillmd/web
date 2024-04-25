"use server";

import { DateTime } from "luxon";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Case } from "./case";
import { revalidateTag } from "next/cache";

export interface Note {
  id: number;
  type: string;
  content: string;
  version: number;
  inserted_at: string;
}

export async function getNotes({
  case_id
}: {
  case_id: Case["id"];
}): Promise<Note[]> {
  const tags = ["notes"];
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
      next:{tags}
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
  const tags = ["notes"];
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
      next:{tags}
    }
  );
  const note = await response.json();
  return note as Note;
}

export async function postNote({
  case_id,
  type,
}: {
  case_id: Case["id"];
  type: Note["type"];
}) {
  const tags = ["notes"];
  const data: Partial<Note> = {
    type,
  };
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }

  await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/notes`,
    {
      method: "POST",
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

export async function updateNote({
  case_id,
  note_id,
  type,
  content,
}: {
  case_id: Case["id"];
  note_id: Note["id"];
  type?: Note["type"];
  content?: Note["content"];
}) {
  const tags = ["notes"];
  const data: Partial<Note> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  if (type !== undefined) {
    data.type = type;
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
  const tags = ["notes"];
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
