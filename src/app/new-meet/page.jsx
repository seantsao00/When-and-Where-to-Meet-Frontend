import { auth, fetchWithAuth } from "@/auth";
import NewMeetForm from "./new-meet-form";
import { redirect } from "next/navigation";

async function action(_, formData) {
  "use server";
  const meetName = formData.get("meetname");
  const meetDescription = formData.get("meetdescription");
  const startTime = formData.get("starttime");
  const endTime = formData.get("endtime");
  const startDate = formData.get("startdate");
  const endDate = formData.get("enddate");
  const duration = formData.get("duration");
  const isPublic = formData.get("ispublic") == "true";
  for (const w of [
    meetName,
    startTime,
    endTime,
    startDate,
    endDate,
    duration,
  ]) {
    if (w === "") return "No empty fields allowed";
  }

  if (new Date(startTime).getTime() >= new Date(endTime).getTime())
    return "End time must be after start time";
  if (new Date(startDate).getTime() > new Date(endDate).getTime())
    return "End date must be after start date";
  if (new Date(startTime).getTime() % (60 * 15 * 1000))
    return "Start time must be a multiple of 15 minutes";
  if (new Date(endTime).getTime() % (60 * 15 * 1000))
    return "End time must be a multiple of 15 minutes";
  if (meetName === "New Meet") return 'You cannot use the name "New Meet"';

  const usrId = await auth();
  const response = await fetchWithAuth(`/api/meets`, {
    method: "POST",
    body: JSON.stringify({
      meetName,
      meetDescription,
      isPublic,
      duration,
      startTime,
      endTime,
      startDate,
      endDate,
    }),
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
