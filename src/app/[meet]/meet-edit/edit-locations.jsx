"use client";

import { Chip, Box, Stack, TextField, Button, Typography } from "@mui/material";
import { useActionState, useEffect, useRef, useState } from "react";

export default function LocationAdder({ meetId, action }) {
  const [locationsRaw, setLocationsRaw] = useState(
    JSON.stringify({ locationIds: [] }),
  );
  const [locations, setLocations] = useState([]);
  const [input, setInput] = useState("");
  const [message, formAction, pending] = useActionState(
    action.bind(null, meetId),
    null,
  );

  const handleClick = (idx) => {
    const newLocations = locations.filter((_, i) => i !== idx);
    setLocations(newLocations);
    setLocationsRaw(JSON.stringify({ locationIds: newLocations }));
  };

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Stack direction="column" spacing={1}>
          <Box>
            <Typography variant="body1">New Location to be added:</Typography>
            <Stack direction="row" spacing={1}>
              {locations.map((locationId, idx) => (
                <Chip
                  label={locationId}
                  key={idx}
                  onClick={handleClick.bind(null, idx)}
                />
              ))}
            </Stack>
          </Box>
          <TextField
            label="New location ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            type="button"
            onClick={() => {
              if (!input) return;
              setLocations([...locations, input]);
              setLocationsRaw(
                JSON.stringify({ locationIds: [...locations, input] }),
              );
              setInput("");
            }}
          >
            Add location
          </Button>
          <Box component="form" action={formAction}>
            <input type="hidden" value={locationsRaw} name="locations" />
            <Button type="submit" disabled={pending}>
              Update added locations
            </Button>
            {pending ? "please wait..." : message}
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
