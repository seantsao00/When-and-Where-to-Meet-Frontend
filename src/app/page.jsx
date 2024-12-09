import React from "react";
import { auth } from "@/auth";
import { Login, Authed, Signup } from "@/components/home";

export default async function Home() {
  const userId = await auth();
  return userId ? (
    <Authed userId={userId} />
  ) : (
    <>
      <Login />
      <Signup />
    </>
  );
}
