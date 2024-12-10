import { redirect } from "next/navigation";
import EditInfo from "./editinfo";
import { auth, fetchWithAuth } from "@/auth";

async function action(_, formData) {
  "use server";
  const usrName = formData.get("usrname");
  const usrEmail = formData.get("usremail");
  const usrId = await auth();
  const response = await fetchWithAuth(`/api/usrs/${usrId}`, {
    method: "PATCH",
    body: JSON.stringify({ usrName, usrEmail }),
  });
  if (!response.ok) {
    return "error";
  }
  redirect("/me");
}

export default async function Info() {
  //   const usrId = await auth();
  //   const response = await fetchWithAuth(`/api/usrs/${usrId}`);
  //   if (response.status === 403) {
  //     return <h1>Forbidden</h1>;
  //   }
  //   if (!response.ok)= 200) {
  //     return <h1>Something went wrong</h1>;
  //   }
  //   const usrData = await response.json();
  const usrData = {
    usrName: "Alice",
    usrEmail: "alice@bob.com",
  };
  return <EditInfo usrData={usrData} action={action} />;
}
