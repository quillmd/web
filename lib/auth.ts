"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface AuthResponse {
  token?: string;
  user_id?: string;
  error?: string;
}

export async function refreshToken(): Promise<AuthResponse> {
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    throw "Not Logged in";
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/refresh`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  if (response.ok) {
    cookies().set({
      name: "accessToken",
      value: data.token,
    });
    cookies().set({
      name: "userId",
      value: data.user_id,
    });
  } else {
    throw "Not logged in";
  }
  return data;
}

export async function requestAuth(email: string): Promise<AuthResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  return data;
}

export async function validateAuth(
  email: string,
  otp: string
): Promise<AuthResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });
  const data = await response.json();
  if (response.ok) {
    cookies().set({
      name: "accessToken",
      value: data.token,
    });
    cookies().set({
      name: "userId",
      value: data.user_id,
    });
  }
  return data;
}

export async function logout() {
  cookies().delete({
    name: "accessToken",
  });
  cookies().delete({
    name: "userId",
  });
  redirect(`/login`);
}
