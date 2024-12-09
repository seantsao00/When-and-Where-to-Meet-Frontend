"use client";
import { Button, Box, TextField, Typography, Switch } from "@mui/material";
import { useActionState, useState } from "react";

export default function NewMeetForm({ action }) {
  const [message, formAction, pending] = useActionState(action, null);
  const [isPublic, setIsPublic] = useState(false);
  return (
    <>
      <Box>
        <Typography variant="h2">Create New Meet</Typography>
        <Box component="form" action={formAction}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <input type="hidden" value={isPublic} name="ispublic" />
            <TextField
              name="meetname"
              label="Meet Name"
              variant="filled"
              defaultValue="New Meet"
            />
            <TextField
              name="meetdescription"
              label="Meet Description"
              variant="filled"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              <Typography variant="span">Public Meet</Typography>
              <Switch
                label="Public Meet"
                checked={isPublic}
                onChange={(event) => setIsPublic(event.target.checked)}
              />
            </Box>
            <Button type="submit" disabled={pending}>
              Create
            </Button>
            {pending ? "please wait..." : message}
          </Box>
        </Box>
      </Box>
    </>
  );
}
