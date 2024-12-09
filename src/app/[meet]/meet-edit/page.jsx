import { auth } from "@/auth";
import EditMeetForm, { DeletePage } from "./meet-edit-form";
import { redirect } from "next/navigation";
import { Box } from "@mui/material";

async function action(_, formData) {
  "use server";
  const meetId = formData.get("meetid");
  const meetName = formData.get("meetname");
  const meetDescription = formData.get("meetdescription");
  const isPublic = formData.get("ispublic");
  const userId = await auth();
  // const response = await fetchWithAuth(`/api/meets/${userId}`, {
  //   method: "PATCH",
  //   body: JSON.stringify({ meetName, meetDescription, isPublic }),
  // });
  // if (!response.ok) {
  //   return "error";
  // }
  redirect(`/${meetId}`);
}

async function deletePage(_, formData) {
  "use server";
  const meetId = formData.get("meetid");
  const response = await fetchWithAuth(`/api/meets/${meetId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    return "error";
  }
  redirect(`/`);
}

export default async function Meet({ params }) {
  const meetId = (await params).meet;
  //   const meetDetail = await fetchWithAuth(`/api/meets/${meetId}`);
  //   if (meetDetail.status === 404) {
  //     return <Typography variant="h3">Meet not found</Typography>;
  //   }
  //   if (meetDetail.status === 500) {
  //     return <Typography variant="h3">Server error</Typography>;
  //   }
  //   const meet = await meetDetail.json();
  const meet = {
    meetName: "My Meet",
    meetDescription: "This is my meet",
    isPublic: true,
    holderId: "alice",
    locationId: "zoom",
  };
  return (
    <>
      <EditMeetForm meet={meet} meetId={meetId} action={action} />
      <Box sx={{ marginTop: "0.5rem" }} />
      <DeletePage action={deletePage} meetId={meetId} />
    </>
  );
}
