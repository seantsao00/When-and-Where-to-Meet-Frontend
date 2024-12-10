import { auth, fetchWithAuth } from "@/auth";
import MeetInfo from "@/components/meet/meet-info";
import TimeTable from "@/components/meet/time-table";
import { Stack, Typography } from "@mui/material";
import { revalidatePath } from "next/cache";

async function updateAvailabilitiesAction(meetId, _, formData) {
  "use server";
  try {
    const availabilitiesRaw = formData.get("newavailabilities");
    const availabilities = JSON.parse(availabilitiesRaw);
    // /meets/:meetId/availabilities/:usrId/multiple-time-segments
    const response = await fetchWithAuth(
      `/api/meets/${meetId}/availabilities`,
      {
        method: "POST",
        body: JSON.stringify(availabilities),
      },
    );
    if (!response.ok) return "Error";
    revalidatePath(`/${meetId}`);
    return "Success";
  } catch (e) {
    console.log(e);
    return "Error";
  }
}

export default async function Meet({ params }) {
  const meetId = (await params).meet;
  const usrId = await auth();

  const meetDetail = await fetchWithAuth(`/api/meets/${meetId}`);
  if (meetDetail.status === 403) {
    const res = await fetchWithAuth(`/api/meets/${meetId}/participate`, {
      method: "POST",
    });
    if (res.status === 403) {
      return <Typography variant="h3">You are not invited.</Typography>;
    }
    if (!res.ok) return <Typography variant="h3">Error</Typography>;
    revalidatePath(`/${meetId}`);
    return <Typography variant="h3">You are not invited.</Typography>;
  }
  if (meetDetail.status === 404) {
    return <Typography variant="h3">Meet not found</Typography>;
  }
  if (meetDetail.status === 500) {
    return <Typography variant="h3">Server error</Typography>;
  }
  const meet = await meetDetail.json();

  const locationOptions = await (
    await fetchWithAuth(`/api/meets/${meetId}/location-options`)
  ).json();
  const locations = locationOptions.items.map((item) => item.locationId);

  const res = await (
    await fetchWithAuth(`/api/meets/${meetId}/availabilities`)
  ).json();

  const myAvailabilities = [];
  const allAvailabilities = [];

  for (const data of res.items) {
    if (typeof data !== "object") continue;
    for (const ava of data.availabilities) {
      const time = ava.timeSegment.replace("T", " ").replace(".000Z", "");
      console.log(
        time,
        meet.startDate,
        meet.startTime,
        meet.endDate,
        meet.endTime,
      );
      allAvailabilities.push(time);
      if (data.usrId == usrId) myAvailabilities.push(time);
    }
  }

  return (
    <Stack direction="column" spacing={2}>
      <MeetInfo meet={meet} />
      <TimeTable
        meet={meet}
        initAllAvailabilities={allAvailabilities}
        initMyAvailabilities={myAvailabilities}
      />
    </Stack>
  );
}
