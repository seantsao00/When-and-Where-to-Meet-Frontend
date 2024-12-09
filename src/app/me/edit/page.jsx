import { redirect } from "next/navigation";
import EditInfo from "./editinfo";
import { auth, fetchWithAuth } from "@/auth";

async function action(_, formData) {
  "use server";
  const userName = formData.get("username");
  const userEmail = formData.get("useremail");
  const userId = await auth();
  const response = await fetchWithAuth(`/api/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ userName, userEmail }),
  });
  if (!response.ok) {
    return "error";
  }
  redirect("/me");
}

export default async function Info() {
  //   const userId = await auth();
  //   const response = await fetchWithAuth(`/api/users/${userId}`);
  //   if (response.status === 403) {
  //     return <h1>Forbidden</h1>;
  //   }
  //   if (!response.ok)= 200) {
  //     return <h1>Something went wrong</h1>;
  //   }
  //   const userData = await response.json();
  const userData = {
    userName: "Alice",
    userEmail: "alice@bob.com",
  };
  return <EditInfo userData={userData} action={action} />;
}
