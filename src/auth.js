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
  if (options && options.body) {
    if (!options.headers) options.headers = {};
    options.headers["Content-Type"] = "application/json";
  }
  if (process.env.NODE_ENV === "development") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${url.replace("/api", "")}`,
      options,
    );
    console.log(res);
    return res;
  }
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, options);
}

export async function fetchNoAuth(url, options) {
  if (options && options.body) {
    if (!options.headers) options.headers = {};
    options.headers["Content-Type"] = "application/json";
  }
  if (process.env.NODE_ENV === "development") {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${url.replace("/api", "")}`,
      options,
    );
  }
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, options);
}

export async function auth() {
  const cookieStore = await cookies();
  return cookieStore.get("usrid")?.value;
}

export async function signIn(_, formData) {
  const cookieStore = await cookies();
  const usrId = formData.get("usrid");
  const response = await fetchNoAuth(`/api/usrs/${usrId}`);
  console.log(response);
  if (response.status === 404) {
    return "no such user";
  }
  if (!response.ok && response.status !== 403) {
    return "unknown error";
  }
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
  const body = await response.json();
  const usrId = body.usrId;
  console.log(response);
  console.log(body);
  console.log(usrId);
  cookieStore.set("usrid", usrId);
  revalidatePath("/");
  return "success";
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("usrid");
}
