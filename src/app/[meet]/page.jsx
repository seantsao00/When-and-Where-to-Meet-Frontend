import MeetInfo from "@/components/meet/meet-info";
import TimeTable from "@/components/meet/time-table";
import { Stack } from "@mui/material";

export default async function Meet({ params }) {
  const meetId = (await params).meet;

  // const meetDetail = await fetchNoAuth(`/api/meets/${meetId}`);
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
    startDate: "2022-01-01",
    endDate: "2022-01-13",
    startTime: "00:00:00",
    endTime: "20:00:00",
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
