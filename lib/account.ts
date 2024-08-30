"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL } from "./api-config";

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
  const response = await fetch(`${API_URL}/api/account/`, {
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
  data.status = accountStatus;
  return data as Account;
}

export async function cancelSubscription() {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(
    `${API_URL}/api/account/subscription/cancel`,
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
}

export async function deleteAccount() {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${API_URL}/api/account`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (response.status < 300) {
    cookies().delete({
      name: "accessToken",
    });
    cookies().delete({
      name: "userId",
    });
    redirect(`/login`);
  }
}
