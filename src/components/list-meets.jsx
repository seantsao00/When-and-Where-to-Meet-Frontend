import { auth } from "@/auth";
import { Stack, Card, Typography } from "@mui/material";
import { RenderTable } from "./list-meets-client";

export default async function ListMeet({ title, type }) {
  const userId = await auth();
  //   const response = await fetchWithAuth(`/api/users/${userId}/${type}`);
  //   if (!response.ok) {
  //     return <Typography variant="h3">Something went wrong</Typography>;
  //   }
  //   const data = await response.json();
  //   const rows = data.items;
  const rows = [
    { meetId: 1, meetName: "Alice" },
    { meetId: 2, meetName: "Bob" },
    { meetId: 3, meetName: "Caroline" },
  ];
  return (
    <Stack spacing={1}>
      <Card sx={{ paddingX: "1.5rem", paddingY: "0.5rem" }}>
        <Typography variant="h3" textAlign="center">
          {title}
        </Typography>
      </Card>
      <RenderTable rows={rows} />
    </Stack>
  );
}
