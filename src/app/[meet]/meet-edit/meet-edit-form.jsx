"use client";
import {
  Button,
  Box,
  TextField,
  Typography,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useActionState, useState } from "react";

export default function EditMeetForm({ meet, meetId, action }) {
  const [message, formAction, pending] = useActionState(action, null);
  const [isPublic, setIsPublic] = useState(meet.isPublic);
  return (
    <>
      <Box>
        <Box component="form" action={formAction}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <input type="hidden" value={isPublic} name="ispublic" />
            <input type="hidden" value={meetId} name="meetid" />
            <TextField
              name="meetname"
              label="Meet Name"
              variant="filled"
              required
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              <Typography component="span">Public Meet</Typography>
              <Switch
                checked={isPublic}
                onChange={(event) => setIsPublic(event.target.checked)}
              />
            </Box>
            <Button type="submit" disabled={pending}>
              Update meet description
            </Button>
            {pending ? "please wait..." : message}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export function MakeDecisonForm({ meet, meetId, action }) {
  const [message, formAction, pending] = useActionState(action, null);
  return (
    <>
      <Box>
        <Box component="form" action={formAction}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <input type="hidden" value={meetId} name="meetid" />
            <TextField
              name="finalplaceid"
              label="Final Place ID"
              variant="filled"
              required
            />
            <Box>
              <Typography variant="body1">
                <b>Final Time: </b>
              </Typography>
              <input type="datetime-local" name="finaltime" required />
            </Box>
            <Button type="submit" color="warning" disabled={pending}>
              Make final decision
            </Button>
            {pending ? "please wait..." : "ok"}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export function DeletePage({ meetId, action }) {
  const [message, formAction, pending] = useActionState(action, null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" color="warning" onClick={handleClickOpen}>
        Delete Meet
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Are you sure you want to delete this meet?</DialogTitle>
        <DialogContent sx={{ margin: "auto" }}>
          <Box component="form" action={formAction}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <input type="hidden" name="meetid" value={meetId} />
              <Button
                color="warning"
                disabled={pending}
                type="submit"
                sx={{ paddingX: "3rem" }}
              >
                Yes
              </Button>
              {pending ? "please wait..." : message}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export function TransferPage({ meetId, action }) {
  const [message, formAction, pending] = useActionState(action, null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" color="info" onClick={handleClickOpen}>
        Transfer Meet
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Are you sure you want to transfer this meet?</DialogTitle>
        <DialogContent sx={{ margin: "auto" }}>
          <Box component="form" action={formAction}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <input type="hidden" name="meetid" value={meetId} />
              <TextField
                name="newholderid"
                label="ID of the new holder"
                variant="filled"
                required
              />
              <Button
                color="warning"
                disabled={pending}
                type="submit"
                sx={{ paddingX: "3rem" }}
              >
                Yes
              </Button>
              {pending ? "please wait..." : message}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
