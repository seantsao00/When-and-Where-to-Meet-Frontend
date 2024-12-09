"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function fetchWithAuth(url, options) {
  const userId = await auth();
  if (options && userId) {
    if (!options.headers) options.headers = {};
    options.headers.Authorization = `Bearer ${userId}`;
  }
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, options);
}

export async function fetchNoAuth(url, options) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, options);
}

export async function auth() {
  const cookieStore = await cookies();
  return cookieStore.get("userid")?.value;
}

export async function signIn(_, formData) {
  const cookieStore = await cookies();
  // const response = await fetchNoAuth("/api/users", {
  //   method: "GET",
  //   body: JSON.stringify({ email: formData.get("useremail") }),
  // });
  // if (response.status === 404) {
  //   return 'no such user';
  // }
  // if (!response.ok) {
  //   return 'unknown error';
  // }
  cookieStore.set("userid", formData.get("userid"));
  revalidatePath("/");
  return "success";
}

export async function signUp(_, formData) {
  const cookieStore = await cookies();
  const name = formData.get("username");
  const email = formData.get("useremail");
  const response = await fetchNoAuth("/api/users", {
    method: "POST",
    body: JSON.stringify({ name, email }),
  });
  if (!response.ok) return "error";
  const userId = (await response.json()).userId;
  cookieStore.set("userid", userId);
  revalidatePath("/");
  return "success";
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("userid");
}
