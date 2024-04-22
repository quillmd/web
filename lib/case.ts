"use server";

import { DateTime } from "luxon";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface Case {
  id: number;
  title: string;
  inserted_at: string;
}

export async function getCases(): Promise<Case[]> {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/cases`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  const cases = Object.values(data).sort(
    (a, b) =>
      //@ts-ignore
      DateTime.fromISO(b.inserted_at).toMillis() -
      //@ts-ignore
      DateTime.fromISO(a.inserted_at).toMillis()
  );
  return cases as Case[];
}

export async function getCase({ id }: { id: Case["id"] }): Promise<Case> {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${id}`,
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  const data = await response.json();
  return data as Case;
}

export async function updateCase({
  id,
  title,
}: {
  id: Case["id"];
  title: Case["title"];
}) {
  const data: Partial<Case> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  data.title = title;

  await fetch(`${process.env.NEXT_PUBLIC_API}/api//${id}`, {
    method: "patch",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export async function deleteCase({ id }: { id: Case["id"] }) {
  const data: Partial<Case> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  await fetch(`${process.env.NEXT_PUBLIC_API}/api//${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
