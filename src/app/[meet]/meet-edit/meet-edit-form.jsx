"use client";
import { Button, Box, TextField, Typography, Switch } from "@mui/material";
import { useActionState, useState } from "react";

export default function EditMeetForm({ meet, meetId, action }) {
  const [message, formAction, pending] = useActionState(action, null);
  const [isPublic, setIsPublic] = useState(meet.isPublic);
  return (
    <>
      <Box>
        <Typography variant="h2">Update Meet Info</Typography>
        <Box component="form" action={formAction}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <input type="hidden" value={isPublic} name="ispublic" />
            <input type="hidden" value={meetId} name="meetid" />
            <TextField
              name="meetname"
              label="Meet Name"
              variant="filled"
              defaultValue={meet.meetName}
            />
            <TextField
              name="meetdescription"
              label="Meet Description"
              variant="filled"
              defaultValue={meet.meetDescription}
            />
            <TextField
              label="Holder"
              variant="filled"
              disabled
              defaultValue={meet.holderId}
            />
            <TextField
              label="Location"
              variant="filled"
              disabled
              defaultValue={meet.locationId}
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
              Update
            </Button>
            {pending ? "please wait..." : message}
          </Box>
        </Box>
      </Box>
    </>
  );
}
