"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { signIn, signOut, signUp } from "@/auth";
import { useActionState } from "react";

export function Signup() {
  const [message, formAction, pending] = useActionState(signUp, null);
  return (
    <Box>
      <Typography variant="h3">Or sign up</Typography>
      <Box component="form" action={formAction} sx={{ marginTop: "2rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField name="usrname" label="User Name" variant="filled" />
          <TextField name="usremail" label="User Email" variant="filled" />
          <Button disabled={pending} type="submit">
            Sign Up
          </Button>
          {pending ? "please wait..." : message}
        </Box>
      </Box>
    </Box>
  );
}
export function Login() {
  const [message, formAction, pending] = useActionState(signIn, null);
  return (
    <Box>
      <Typography variant="h3">Please login first</Typography>
      <Box component="form" action={formAction} sx={{ marginTop: "2rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField name="usrid" label="User ID" variant="filled" />
          <Button disabled={pending} type="submit">
            Login
          </Button>
          {pending ? "please wait..." : message}
        </Box>
      </Box>
    </Box>
  );
}
export function Authed({ usrId }) {
  return (
    <Box>
      <Typography variant="h3">Hi {usrId}</Typography>
      <Box component="form" action={signOut}>
        <Button type="submit">Logout</Button>
      </Box>
    </Box>
  );
}
