"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface Template {
  id: number;
  type: string;
  title: string;
  instructions: string;
  examples: string[];
  inserted_at: string;
}

export async function getTemplates(): Promise<Template[]> {
  const tags = [`templates`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/templates`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    next: { tags },
  });
  const data = await response.json();
  return data as Template[];
}

export async function getTemplate({
  template_id,
}: {
  template_id: Template["id"];
}): Promise<Template> {
  const tags = [`templates`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/templates/${template_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      next: { tags },
    }
  );
  const template = await response.json();
  return template as Template;
}

export async function postTemplate({
  title,
  instructions,
  examples,
}: {
  title: Template["title"];
  instructions: Template["instructions"];
  examples: Template["examples"];
}) {
  const tags = [`templates`];
  const data: Partial<Template> = {
    title,
    instructions,
    examples,
  };
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }

  await fetch(`${process.env.NEXT_PUBLIC_API}/api/templates/`, {
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

export async function updateTemplate({
  template_id,
  title,
  instructions,
  examples,
}: {
  template_id: Template["id"];
  title?: Template["title"];
  instructions?: Template["instructions"];
  examples?: Template["examples"];
}) {
  const tags = [`templates`];
  const data: Partial<Template> = {};
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  if (title !== undefined) {
    data.title = title;
  }
  if (instructions !== undefined) {
    data.instructions = instructions;
  }
  if (examples !== undefined) {
    data.examples = examples;
  }
  await fetch(`${process.env.NEXT_PUBLIC_API}/api/templates/${template_id}`, {
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

export async function deleteTemplate({
  template_id,
}: {
  template_id: Template["id"];
}) {
  const tags = [`templates`];
  const authToken = cookies().get("accessToken")?.value;
  if (!authToken) {
    redirect(`/login`);
  }
  await fetch(`${process.env.NEXT_PUBLIC_API}/api/templates/${template_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}

export async function revalidateTemplates() {
  const tags = [`templates`];
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}
