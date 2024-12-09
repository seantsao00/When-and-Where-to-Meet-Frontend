import { fetchNoAuth } from "@/auth";
import { List, Card, Box, Stack, Typography, ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";

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
  };
  return (
    <>
      <Stack spacing={1}>
        <Card sx={{ paddingX: "1.5rem", paddingY: "0.5rem" }}>
          <Typography variant="h3" textAlign="center">
            {meet.meetName}
          </Typography>
          <Typography variant="h6">{meet.meetDescription}</Typography>
          <List dense>
            <ListItemText
              primary={`Public meet: ${meet.isPublic ? "Yes" : "No"}`}
            />
            <ListItemText primary={`Holder: ${meet.holderId}`} />
            {meet.locationId && (
              <ListItemText primary={`Location: ${meet.locationId}`} />
            )}
          </List>
        </Card>
      </Stack>
      <Box></Box>
    </>
  );
}
