"use server";

import { DateTime } from "luxon";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL } from "./api-config";
import { Case } from "./case";
import { Note } from "./note";

export interface Qa {
  question: string;
  answer: string;
  inserted_at: string;
}

export async function getQas({
  case_id,
}: {
  case_id: Case["id"];
}): Promise<Qa[]> {
  const tags = [`qas-${case_id}`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${API_URL}/api/cases/${case_id}/qas`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    next: { tags },
  });
  const data = await response.json();
  const qas = Object.values(data).sort(
    (a, b) =>
      //@ts-ignore
      DateTime.fromISO(b.inserted_at).toMillis() -
      //@ts-ignore
      DateTime.fromISO(a.inserted_at).toMillis()
  );
  return qas as Qa[];
}

export async function postQa({
  case_id,
  note_id,
  question,
}: {
  case_id: Case["id"];
  note_id: Note["id"];
  question: string;
}) {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  await fetch(`${API_URL}/api/cases/${case_id}/notes/${note_id}/question`, {
    method: "POST",
    body: JSON.stringify({ question }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export async function revalidateQas({ case_id }: { case_id: Case["id"] }) {
  const tags = [`qas-${case_id}`];
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}
