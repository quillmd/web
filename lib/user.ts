"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function validateUser() {
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
  if (!response.ok) {
    throw "Not logged in";
  }
}

export async function createUser(
  email: string,
  password: string,
  activation: string
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, activation }),
  });
  if (response.ok) {
    const data = await response.json();
    cookies().set({
      name: "accessToken",
      value: data.token,
    });
    redirect(`/home`);
  }
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const data = await response.json();
    cookies().set({
      name: "accessToken",
      value: data.token,
    });
    redirect(`/home`);
  }
}
