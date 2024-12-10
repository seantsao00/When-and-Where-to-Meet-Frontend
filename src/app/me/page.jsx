import { auth } from "@/auth";
import { fetchWithAuth } from "@/auth";
import { Card, Stack, Typography, List, ListItemText } from "@mui/material";

export default async function Info() {
  const usrId = await auth();
  //   const response = await fetchWithAuth(`/api/usrs/${usrId}`);
  //   if (response.status === 403) {
  //     return <h1>Forbidden</h1>;
  //   }
  //   if (!response.ok) {
  //     return <h1>Something went wrong</h1>;
  //   }
  //   const usrData = await response.json();
  const usrData = {
    usrName: "Alice",
    usrEmail: "alice@bob.com",
  };
  return (
    <>
      <Stack spacing={1}>
        <Card sx={{ paddingX: "1.5rem", paddingY: "0.5rem" }}>
          <Typography variant="h3" textAlign="center">
            User Info
          </Typography>
          <Typography variant="h6">{usrData.usrName}</Typography>
          <List dense>
            <ListItemText primary={`email: ${usrData.usrEmail}`} />
            <ListItemText primary={`user id: ${usrId}`} />
          </List>
        </Card>
      </Stack>
    </>
  );
}
