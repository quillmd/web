"use server";

import { DateTime } from "luxon";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface Note {
  id: string;
  user_id: number;
  name: string;
  transcript?: string;
  text?: string;
  status: string;
  created_at: string;
}

export async function getNotes(): Promise<Note[]> {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  const notes = Object.values(data).sort(
    (a, b) =>
      //@ts-ignore
      DateTime.fromISO(b.created_at).toMillis() -
      //@ts-ignore
      DateTime.fromISO(a.created_at).toMillis()
  );
  return notes as Note[];
}

export async function getNote(id: string): Promise<Note> {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notes/${id}`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const note = await response.json();
  return note as Note;
}

export async function updateNote({
  id,
  name,
  status,
  transcript,
  text,
}: {
  id: Note["id"];
  name?: Note["name"];
  status?: Note["status"];
  transcript?: Note["transcript"];
  text?: Note["text"];
}) {
  const data: Partial<Note> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  if (name !== undefined) {
    data.name = name;
  }
  if (status !== undefined) {
    data.status = status;
  }
  if (transcript !== undefined) {
    data.transcript = transcript;
  }
  if (text !== undefined) {
    data.text = text;
  }
  await fetch(`${process.env.NEXT_PUBLIC_API}/notes/${id}`, {
    method: "patch",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export async function deleteNote(id: Note["id"]) {
  const data: Partial<Note> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  await fetch(`${process.env.NEXT_PUBLIC_API}/notes/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
