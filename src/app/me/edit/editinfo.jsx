"use client";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useActionState } from "react";

export default function EditInfo({ usrData, action }) {
  const [message, formAction, pending] = useActionState(action, null);
  return (
    <>
      <Box>
        <Typography variant="h2">Update User Info</Typography>
        <Box component="form" action={formAction}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              name="usrname"
              label="User name"
              variant="filled"
              defaultValue={usrData.usrName}
            />
            <TextField
              name="usremail"
              label="User Email"
              variant="filled"
              defaultValue={usrData.usrEmail}
            />
            <Button type="submit" disabled={pending}>
              Update
            </Button>
            {pending ? "please wait..." : message}
          </Box>
        </Box>
      </Box>
    </>
  );
}
