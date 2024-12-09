import { auth, fetchWithAuth } from "@/auth";
import NewMeetForm from "./new-meet-form";
import { redirect } from "next/navigation";

async function action(_, formData) {
  "use server";
  const meetName = formData.get("meetname");
  const meetDescription = formData.get("meetdescription");
  const isPublic = formData.get("ispublic");
  if (meetName === "New Meet") return 'You cannot use the name "New Meet"';
  const userId = await auth();
  const response = await fetchWithAuth(`/api/meets`, {
    method: "POST",
    body: JSON.stringify({ meetName, meetDescription, isPublic }),
  });
  if (!response.ok) {
    return "error";
  }
  const data = await response.json();
  redirect(`/${data.id}`);
}

export default async function Info() {
  return <NewMeetForm action={action} />;
}
