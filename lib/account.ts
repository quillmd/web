"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

interface Subscription {
  plan_id: string;
  status: string;
}

export interface Account {
  id: string;
  email: string;
  subscription_exempt: boolean;
  subscription?: Subscription;
  note_count?: number;
}

export async function getAccount(): Promise<Account> {
  const tags = ["account"];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/account/`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    next: { tags },
  });
  const data = await response.json();
  return data as Account;
}

export async function cancelSubscription() {
  const tags = ["account"];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/account/subscription/cancel`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    next: { tags },
  });
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}

