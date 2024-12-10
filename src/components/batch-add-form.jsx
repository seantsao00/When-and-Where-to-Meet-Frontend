"use client";

import { Chip, Box, Stack, TextField, Button, Typography } from "@mui/material";
import { useActionState, useEffect, useRef, useState } from "react";

export default function BatchAddForm({
  action,
  newElementText,
  newIdText,
  updateText,
  addText,
}) {
  const [locationsRaw, setLocationsRaw] = useState(JSON.stringify([]));
  const [locations, setLocations] = useState([]);
  const [input, setInput] = useState("");
  const [message, formAction, pending] = useActionState(action, null);

  const handleClick = (idx) => {
    const newLocations = locations.filter((_, i) => i !== idx);
    setLocations(newLocations);
    setLocationsRaw(JSON.stringify(newLocations || []));
  };

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Stack direction="column" spacing={1}>
          <Box>
            <Typography variant="body1">{newElementText}:</Typography>
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
            label={newIdText}
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
              setLocationsRaw(JSON.stringify([...locations, input]));
              setInput("");
            }}
          >
            {addText}
          </Button>
          <Box component="form" action={formAction}>
            <input type="hidden" value={locationsRaw} name="choices" />
            <Button type="submit" disabled={pending}>
              {updateText}
            </Button>
            {pending ? "please wait..." : message}
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
