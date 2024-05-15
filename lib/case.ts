"use server";

import { DateTime } from "luxon";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface Case {
  id: number;
  title: string;
  inserted_at: string;
}

export type CasesGroupedByDate = {
  [date: string]: Case[];
};

export async function getCases(): Promise<Case[]> {
  const tags = ["cases"];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/cases`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    next: { tags },
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

export async function getCasesGroupedByDate(): Promise<CasesGroupedByDate> {
  const cases = await getCases();
  const groupedCases: CasesGroupedByDate = cases.reduce(
    (acc: CasesGroupedByDate, current_case: Case) => {
      const date: string = DateTime.fromISO(
        current_case.inserted_at
      ).toLocaleString(DateTime.DATE_SHORT);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(current_case);
      return acc;
    },
    {} as CasesGroupedByDate
  );
  return groupedCases;
}

export async function getCase({ id }: { id: Case["id"] }): Promise<Case> {
  const tags = [`case-${id}`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/cases/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      next: { tags },
    }
  );
  const data = await response.json();
  return data as Case;
}

export async function postCase({ title }: { title: Case["title"] }) {
  const tags = ["cases"];
  const data: Partial<Case> = {};
  data.title = title;
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/cases/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  const newCaseData = await response.json();
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
  return newCaseData as Case;
}

export async function updateCase({
  id,
  title,
}: {
  id: Case["id"];
  title: Case["title"];
}) {
  const tags = [`case-${id}`];
  const data: Partial<Case> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  data.title = title;
  await fetch(`${process.env.NEXT_PUBLIC_API}/api/cases/${id}`, {
    method: "PATCH",
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

export async function deleteCase({ id }: { id: Case["id"] }) {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  await fetch(`${process.env.NEXT_PUBLIC_API}/api/cases/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

export async function revalidateCase({ id }: { id: Case["id"] }) {
  const tags = [`case-${id}`, `notes-${id}`, `transcripts-${id}`];
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}

export async function revalidateCases() {
  const tags = [`cases`];
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}
