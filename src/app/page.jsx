import React from "react";
import { auth } from "@/auth";
import { Login, Authed, Signup } from "@/components/home";

export default async function Home() {
  const usrId = await auth();
  return usrId ? (
    <Authed usrId={usrId} />
  ) : (
    <>
      <Login />
      <Signup />
    </>
  );
}
