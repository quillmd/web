"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL } from "./api-config";

export interface Scribe {
  id: string;
  name: string;
  short_description: string;
  description: string;
}

export async function getScribe({ id }: { id: string }): Promise<Scribe> {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${API_URL}/api/scribes/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  return data as Scribe;
}

export async function getScribes(): Promise<Scribe[]> {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${API_URL}/api/scribes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  return data as Scribe[];
}

export async function setScribe({ id }: { id: string }) {
  const tags = [`account`];
  const data = { scribe_id: id };
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  await fetch(`${API_URL}/api/account/scribe`, {
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
