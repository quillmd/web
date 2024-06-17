"use server";
import { cookies } from "next/headers";
import { ContactUsSchema, FeedbackSchema } from "./form-schema";

export async function contact(values: ContactUsSchema) {
  await fetch(`${process.env.NEXT_PUBLIC_API}/contact/message/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function feedback(values: FeedbackSchema) {
  const authToken = cookies().get("accessToken")?.value;
  await fetch(`${process.env.NEXT_PUBLIC_API}/contact/feedback/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
}
