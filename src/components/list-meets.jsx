import { auth, fetchWithAuth } from "@/auth";
import { Stack, Card, Typography } from "@mui/material";
import { RenderTable } from "./list-meets-client";

export default async function ListMeet({ title, type }) {
  const usrId = await auth();
  const response = await fetchWithAuth(`/api/meets/${type}/${usrId}`);
  if (!response.ok) {
    return <Typography variant="h3">Something went wrong</Typography>;
  }
  const data = await response.json();
  console.log(data);
  const rows = data.items;
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
