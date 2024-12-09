import { auth } from "@/auth";
import { fetchWithAuth } from "@/auth";
import { Card, Stack, Typography, List, ListItemText } from "@mui/material";

export default async function Info() {
  const userId = await auth();
  //   const response = await fetchWithAuth(`/api/users/${userId}`);
  //   if (response.status === 403) {
  //     return <h1>Forbidden</h1>;
  //   }
  //   if (!response.ok) {
  //     return <h1>Something went wrong</h1>;
  //   }
  //   const userData = await response.json();
  const userData = {
    userName: "Alice",
    userEmail: "alice@bob.com",
  };
  return (
    <>
      <Stack spacing={1}>
        <Card sx={{ paddingX: "1.5rem", paddingY: "0.5rem" }}>
          <Typography variant="h3" textAlign="center">
            User Info
          </Typography>
          <Typography variant="h6">{userData.userName}</Typography>
          <List dense>
            <ListItemText primary={`email: ${userData.userEmail}`} />
            <ListItemText primary={`user id: ${userId}`} />
          </List>
        </Card>
      </Stack>
    </>
  );
}
