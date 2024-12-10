import { auth, fetchWithAuth } from "@/auth";
import EditMeetForm, {
  DeletePage,
  MakeDecisonForm,
  TransferPage,
} from "./meet-edit-form";
import { redirect } from "next/navigation";
import { Box, Divider, Stack, Typography } from "@mui/material";
import ListLocations from "./list-locations";
import BestDecisions from "./list-best-decisions";

async function action(_, formData) {
  "use server";
  const meetId = formData.get("meetid");
  const meetName = formData.get("meetname");
  const meetDescription = formData.get("meetdescription");
  const isPublic = formData.get("ispublic");
  const response = await fetchWithAuth(`/api/meets/${meetId}`, {
    method: "PATCH",
    body: JSON.stringify({ meetName, meetDescription, isPublic }),
  });
  if (!response.ok) {
    return "error";
  }
  redirect(`/${meetId}`);
}
async function makeDecisionAction(_, formData) {
  "use server";
  const meetId = formData.get("meetid");
  const finalPlaceId = formData.get("finalplaceid");
  const finalTime = formData.get("finaltime").replace("T", " ");
  const response = await fetchWithAuth(`/api/meets/${meetId}/final-decision`, {
    method: "POST",
    body: JSON.stringify({ meetId, finalPlaceId, finalTime }),
  });
  if (!response.ok) {
    return "error";
  }
  redirect(`/${meetId}`);
}
async function transferAction(_, formData) {
  "use server";
  const meetId = formData.get("meetid");
  const newHolderId = formData.get("newholderid");
  const response = await fetchWithAuth(`/api/meets/${meetId}/transfer`, {
    method: "POST",
    body: JSON.stringify({ newHolderId }),
  });
  if (!response.ok) {
    return "error";
  }
  redirect(`/${meetId}`);
}

async function deletePageAction(_, formData) {
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
  const meetDetail = await fetchWithAuth(`/api/meets/${meetId}`);
  if (meetDetail.status === 404) {
    return <Typography variant="h3">Meet not found</Typography>;
  }
  if (meetDetail.status === 500) {
    return <Typography variant="h3">Server error</Typography>;
  }
  if (meetDetail.status === 403) {
    redirect(`/${meetId}`);
  }
  const meet = await meetDetail.json();
  const usrId = await auth();
  if (meet.holderId !== usrId)
    return (
      <Typography variant="h3">Only meet holder can edit meet!</Typography>
    );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h2">Update Meet Info</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "2rem",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "50%",
          }}
        >
          <EditMeetForm meet={meet} meetId={meetId} action={action} />
          <Stack direction="row" spacing={2}>
            <DeletePage action={deletePageAction} meetId={meetId} />
            <TransferPage action={transferAction} meetId={meetId} />
          </Stack>
          <Divider />
          <BestDecisions meetId={meetId} />
          <Divider />
          <MakeDecisonForm
            meet={meet}
            meetId={meetId}
            action={makeDecisionAction}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <ListLocations meetId={meetId}></ListLocations>
        </Box>
      </Box>
    </Box>
  );
}
