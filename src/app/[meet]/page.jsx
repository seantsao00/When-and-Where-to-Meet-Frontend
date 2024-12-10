import { fetchWithAuth } from "@/auth";
import MeetInfo from "@/components/meet/meet-info";
import TimeTable from "@/components/meet/time-table";
import { Stack, Typography } from "@mui/material";
import { revalidatePath } from "next/cache";

export default async function Meet({ params }) {
  const meetId = (await params).meet;

  // const meetDetail = await fetchWithAuth(`/api/meets/${meetId}`);
  // if (meetDetail.status === 403) {
  //   const res = await fetchWithAuth(`/api/meets/${meetId}/participate`, {
  //     method: "POST",
  //   });
  //   if (res.status === 403) {
  //     return <Typography variant="h3">Forbidden</Typography>;
  //   }
  //   if (!res.ok) return <Typography variant="h3">Error</Typography>;
  //   revalidatePath(`/${meetId}`);
  //   return <Typography variant="h3">Forbidden</Typography>;
  // }
  // if (meetDetail.status === 404) {
  //   return <Typography variant="h3">Meet not found</Typography>;
  // }
  // if (meetDetail.status === 500) {
  //   return <Typography variant="h3">Server error</Typography>;
  // }
  // const meet = await meetDetail.json();
  // const meet = {
  //   meetName: "My Meet",
  //   meetDescription: "This is my meet",
  //   isPublic: true,
  //   holderId: "alice",
  //   locationId: "zoom",
  //   startDate: "2022-01-01",
  //   endDate: "2022-01-13",
  //   startTime: "00:00:00",
  //   endTime: "20:00:00",
  // };
  const meet = {
    meetName: "My Meet",
    meetDescription: "This is my meet",
    isPublic: true,
    holderId: "alice",
    locationId: "zoom",
    startDate: "2022-01-01",
    endDate: "2022-01-13",
    startTime: "00:00:00",
    endTime: "20:00:00",
    finalDecision: {
      locationId: 2,
      locationName: "OWO",
      locationAddress: "XDD",
      locationPrice: "150$",
      locationCapacity: "50 ppl",
      finalTime: "12",
    },
  };

  const allAvailabilities = [
    "2022-01-01 00:00:00",
    "2022-01-01 00:15:00",
    "2022-01-01 00:30:00",
    "2022-01-01 00:45:00",
    "2022-01-01 01:00:00",
    "2022-01-01 01:10:00",
    "2022-01-01 00:15:00",
    "2022-01-01 00:30:00",
  ];
  const myAvailabilities = ["2022-01-01 00:30:00", "2022-01-01 00:45:00"];

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
