"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Subscription {
  plan_id: string;
  status: string;
}

type AccountStatus = "active" | "trial" | "trial_ended";

export interface Account {
  id: string;
  email: string;
  subscription_exempt: boolean;
  subscription?: Subscription;
  note_count?: number;
  status: AccountStatus;
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
  if (response.status > 299) {
    cookies().delete("accessToken");
    redirect(`/login`);
  }
  const data = await response.json();
  const accountStatus =
    data.subscription !== undefined || data.subscription_exempt
      ? "active"
      : data.note_count !== undefined && data.note_count < 10
      ? "trial"
      : "trial_ended";
  data.status = "trial";
  data.note_count = 4;
  return data as Account;
}

export async function cancelSubscription() {
  const tags = ["account"];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/account/subscription/cancel`,
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      next: { tags },
    }
  );
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}
