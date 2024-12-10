import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Header } from "./navbar-client";
import { auth } from "@/auth";

export default async function Navbar() {
  const usrId = await auth();
  return (
    <Box component="nav" sx={{ width: "100vw" }}>
      <AppBar position="sticky">
        <Toolbar>
          <Header usrId={usrId} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
