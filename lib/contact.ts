"use server";
import { cookies } from "next/headers";
import { ContactUsSchema, FeedbackSchema } from "./form-schema";
import { API_URL } from "./api-config";

export async function contact(values: ContactUsSchema) {
  await fetch(`${API_URL}/contact/message/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function feedback(values: FeedbackSchema) {
  const authToken = cookies().get("accessToken")?.value;
  await fetch(`${API_URL}/contact/feedback/`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
}
