import { Stack, Avatar, Card, Typography } from "@mui/material";
import Link from "next/link";

async function People({ name, path, job }) {
  return (
    <Card sx={{ flex: "1 1 0", padding: "1rem" }}>
      <Stack direction="column" spacing={1} alignItems="center">
        <Avatar alt={name} src={path} sx={{ width: "30%", height: "auto" }} />
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1" textAlign="center">
          {job}
        </Typography>
      </Stack>
    </Card>
  );
}
export default async function About() {
  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="row" spacing={2}>
        <People
          name="Shao-Shun Tsao"
          path="/avatars/shaoshun.png"
          job="Backend Engineer, Project Manager"
        />
        <People
          name="Min-Yao Chang"
          path="/avatars/minyao.jpg"
          job="Data generation, Database optimization"
        />
        <People
          name="Tai-Ying Chen"
          path="/avatars/taiying.png"
          job="Frontend Engineer"
        />
      </Stack>
      <Typography variant="h3">Group 2</Typography>
      <Typography variant="h5">
        Github Link:{" "}
        <Link
          href="https://github.com/seantsao00/When-and-Where-to-Meet-Backend"
          target="_blank"
        >
          <b>Backend</b>
        </Link>
        ,{" "}
        <Link
          href="https://github.com/seantsao00/When-and-Where-to-Meet-Frontend"
          target="_blank"
        >
          <b>Frontend</b>
        </Link>
      </Typography>
    </Stack>
  );
}
