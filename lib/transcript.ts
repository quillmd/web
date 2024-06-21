"use server";

import { DateTime } from "luxon";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Case } from "./case";

export interface Transcript {
  id: string;
  type: string;
  status: string;
  description: string;
  content: string;
  inserted_at: string;
}

export async function getTranscripts({
  case_id,
}: {
  case_id: Case["id"];
}): Promise<Transcript[]> {
  const tags = [`transcripts-${case_id}`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/transcripts`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      next: { tags },
    }
  );
  const data = await response.json();
  const transcripts = Object.values(data).sort(
    (a, b) =>
      //@ts-ignore
      DateTime.fromISO(b.inserted_at).toMillis() -
      //@ts-ignore
      DateTime.fromISO(a.inserted_at).toMillis()
  );
  return transcripts as Transcript[];
}

export async function getTranscript({
  case_id,
  transcript_id,
}: {
  case_id: Case["id"];
  transcript_id: Transcript["id"];
}): Promise<Transcript> {
  const tags = [`transcripts-${case_id}`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/transcripts/${transcript_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      next: { tags },
    }
  );
  const transcript = await response.json();
  return transcript as Transcript;
}

export async function postTranscript({
  case_id,
  type,
  status,
  description,
  content,
}: {
  case_id: Case["id"];
  type: Transcript["type"];
  status: Transcript["status"];
  description: Transcript["description"];
  content: Transcript["content"];
}) {
  const tags = [`transcripts-${case_id}`];
  const data: Partial<Transcript> = {
    type,
    status,
    description,
    content,
  };
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }

  await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/transcripts`,
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

export async function updateTranscript({
  case_id,
  transcript_id,
  description,
  content,
}: {
  case_id: Case["id"];
  transcript_id: Transcript["id"];
  description?: Transcript["description"];
  content?: Transcript["content"];
}) {
  const tags = [`transcripts-${case_id}`];
  const data: Partial<Transcript> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  if (description !== undefined) {
    data.description = description;
  }
  if (content !== undefined) {
    data.content = content;
  }
  await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/transcripts/${transcript_id}`,
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

export async function deleteTranscript({
  case_id,
  transcript_id,
}: {
  case_id: Case["id"];
  transcript_id: Transcript["id"];
}) {
  const tags = [`transcripts-${case_id}`];
  const data: Partial<Transcript> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${case_id}/transcripts/${transcript_id}`,
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

export async function revalidateTranscripts({
  case_id,
}: {
  case_id: Case["id"];
}) {
  const tags = [`transcripts-${case_id}`];
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}
