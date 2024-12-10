"use client";
import Link from "next/link";
import { Typography, Box } from "@mui/material";
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
            color="black"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {name}
          </Typography>
        ) : (
          <Link key={route} href={`/me/${route}`}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
            color="black"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {name}
          </Typography>
        ) : (
          <Link key={route} href={`/${meetId}/${route}`}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          UserInfo
        </Typography>
      </Link>
      {path === "/new-meet" ? (
        <Typography
          variant="h6"
          color="black"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          New Meet
        </Typography>
      ) : (
        <Link href={`/new-meet`}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
    serializedPath.at(1) !== "new-meet"
  )
    type = PathTypes.MEET;
  else type = PathTypes.HOME;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
      }}
    >
      <Link href="/">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
    </Box>
  );
}
