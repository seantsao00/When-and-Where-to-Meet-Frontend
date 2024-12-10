"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function fetchWithAuth(url, options) {
  const usrId = await auth();
  if (usrId) {
    if (!options) options = {};
    if (!options.headers) options.headers = {};
    options.headers.Authorization = `Bearer ${usrId}`;
  }
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, options);
}

export async function fetchNoAuth(url, options) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, options);
}

export async function auth() {
  const cookieStore = await cookies();
  return cookieStore.get("usrid")?.value;
}

export async function signIn(_, formData) {
  const cookieStore = await cookies();
  const usrId = formData.get("usrid");
  // const response = await fetchNoAuth(`/api/usrs/${usrId}`);
  // if (response.status === 404) {
  //   return 'no such user';
  // }
  // if (!response.ok) {
  //   return 'unknown error';
  // }
  cookieStore.set("usrid", usrId);
  revalidatePath("/");
  return "success";
}

export async function signUp(_, formData) {
  const cookieStore = await cookies();
  const name = formData.get("usrname");
  const email = formData.get("usremail");
  const response = await fetchNoAuth("/api/usrs", {
    method: "POST",
    body: JSON.stringify({ name, email }),
  });
  if (!response.ok) return "error";
  const usrId = (await response.json()).usrId;
  cookieStore.set("usrid", usrId);
  revalidatePath("/");
  return "success";
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("usrid");
}
