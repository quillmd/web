"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Subscription {
  plan_id: string;
  status: string;
}

export interface Account {
  id: string;
  email: string;
  subscription?: Subscription;
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
  console.log(data);
  return data as Account;
}
