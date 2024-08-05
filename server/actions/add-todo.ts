"use server";

import { revalidatePath } from "next/cache";

export default async function addTodo(formData: FormData) {
  const name = formData.get("name")?.toString();

  const res = await fetch(`${process.env.API_URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });

  revalidatePath("/");

  if (!res.ok) {
    throw new Error("Failed to add todo");
  }

  return res.json();
}
