"use client";
import { Button, Box, TextField, Typography, Switch } from "@mui/material";
import { useActionState, useState } from "react";

function WithLabel({ title, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        alignItems: "center",
        marginLeft: "1rem",
      }}
    >
      <Typography variant="body1">
        <b>{title}: </b>
      </Typography>
      {children}
    </Box>
  );
}
export default function NewMeetForm({ action }) {
  const [message, formAction, pending] = useActionState(action, null);
  const [isPublic, setIsPublic] = useState(false);
  const today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
  return (
    <>
      <Box>
        <Typography variant="h2">Create New Meet</Typography>
        <Box component="form" action={formAction}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <input type="hidden" value={isPublic.toString()} name="ispublic" />
            <TextField
              name="meetname"
              label="Meet Name"
              variant="filled"
              defaultValue="New Meet"
              required
            />
            <TextField
              name="meetdescription"
              label="Meet Description"
              variant="filled"
            />
            <WithLabel title="Public meet">
              <Switch
                checked={isPublic}
                onChange={(event) => setIsPublic(event.target.checked)}
              />
            </WithLabel>
            <WithLabel title="Expected meet duration">
              <Box>
                <input
                  type="number"
                  name="durationhh"
                  required
                  defaultValue="1"
                  min="0"
                  style={{ width: "2rem" }}
                />
                hrs{" "}
                <input
                  type="number"
                  name="durationmm"
                  required
                  defaultValue="0"
                  style={{ width: "2rem" }}
                />
                mins
              </Box>
            </WithLabel>
            <WithLabel title="Start Time">
              <input
                type="time"
                name="starttime"
                step={60 * 15}
                required
                defaultValue="09:00"
              />
            </WithLabel>
            <WithLabel title="End Time">
              <input
                type="time"
                name="endtime"
                step={60 * 15}
                required
                defaultValue="16:00"
              />
            </WithLabel>
            <WithLabel title="Start Date">
              <input
                type="date"
                name="startdate"
                required
                defaultValue={today}
              />
            </WithLabel>
            <WithLabel title="End Date">
              <input type="date" name="enddate" required defaultValue={today} />
            </WithLabel>
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
