"use client";
import Link from "next/link";
import { Typography, Box, Stack } from "@mui/material";
import { usePathname } from "next/navigation";

const PathTypes = Object.freeze({
  ME: Symbol("me"),
  MEET: Symbol("meet"),
  HOME: Symbol("home"),
});

function MeList({ path }) {
  const routes = [
    ["", "UserInfo"],
    ["edit", "EditInfo"],
    ["list-meet-me", "ListMeetByMe"],
    ["list-meet-in", "ListMeetParticipated"],
  ];
  return (
    <>
      {routes.map(([route, name]) =>
        path === route ? (
          <Typography
            key={route}
            color="secondary"
            variant="h6"
            component="div"
          >
            {name}
          </Typography>
        ) : (
          <Link key={route} href={`/me/${route}`}>
            <Typography variant="h6" component="div">
              {name}
            </Typography>
          </Link>
        ),
      )}
    </>
  );
}
function MeetList({ meetId, path }) {
  const routes = [
    ["", "MeetInfo"],
    ["meet-edit", "EditMeet"],
  ];
  return (
    <>
      {routes.map(([route, name]) =>
        path === route ? (
          <Typography
            key={route}
            color="secondary"
            variant="h6"
            component="div"
          >
            {name}
          </Typography>
        ) : (
          <Link key={route} href={`/${meetId}/${route}`}>
            <Typography variant="h6" component="span">
              {name}
            </Typography>
          </Link>
        ),
      )}
    </>
  );
}
function HomeList({ path }) {
  return (
    <>
      <Link href={`/me`}>
        <Typography variant="h6" component="div">
          UserInfo
        </Typography>
      </Link>
      {path === "/new-meet" ? (
        <Typography variant="h6" color="secondary" component="div">
          New Meet
        </Typography>
      ) : (
        <Link href={`/new-meet`}>
          <Typography variant="h6" component="div">
            New Meet
          </Typography>
        </Link>
      )}
    </>
  );
}
export function Header({ usrId }) {
  const path = usePathname();
  const serializedPath = path.split("/");

  let type = PathTypes.HOME;
  if (serializedPath.at(1) === "me") type = PathTypes.ME;
  else if (
    serializedPath.at(1).length > 0 &&
    serializedPath.at(1) !== "new-meet" &&
    serializedPath.at(1) !== "about"
  )
    type = PathTypes.MEET;
  else type = PathTypes.HOME;
  return (
    <Stack direction="row" gap={1} sx={{ width: "100%" }}>
      <Link href="/">
        <Typography variant="h6" component="div">
          WhereWhen2meet
        </Typography>
      </Link>
      {type == PathTypes.HOME && usrId && <HomeList path={path} />}
      {type == PathTypes.ME && <MeList path={serializedPath.at(2) || ""} />}
      {type == PathTypes.MEET && (
        <MeetList
          meetId={serializedPath.at(1)}
          path={serializedPath.at(2) || ""}
        />
      )}
      {path === "/about" ? (
        <Typography
          variant="h6"
          color="secondary"
          component="div"
          marginLeft="auto"
        >
          About
        </Typography>
      ) : (
        <Link href={`/about`} style={{ marginLeft: "auto" }}>
          <Typography variant="h6" component="div">
            About
          </Typography>
        </Link>
      )}
    </Stack>
  );
}
