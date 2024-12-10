"use server";
import { Stack, Card, Typography, List, ListItemText } from "@mui/material";

export default async function MeetInfo({ meet }) {
  return (
    <Card sx={{ paddingX: "1.5rem", paddingY: "0.5rem" }}>
      <Stack spacing={1} direction="column" alignItems="center">
        <Typography variant="h5" textAlign="center">
          {meet.meetName}
        </Typography>
        <Typography variant="h6" textAlign="center">
          {meet.meetDescription}
        </Typography>
        <Stack spacing={1} direction="row" justifyContent="space-between">
          <Typography variant="body1">
            <b>Public meet:</b> {meet.isPublic ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1">
            <b>Holder: </b> {meet.holderId}
          </Typography>
          <Typography variant="body1">
            <b>Meet duration: </b> {meet.duration}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
