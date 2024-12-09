import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "@/components/navbar";
import theme from "@/theme";

export const metadata = {
  title: "WhereWhen2meet",
  description: "Where and when to meet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body style={{ margin: 0, height: "100vh", width: "100vw" }}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Navbar />
            <Box
              sx={{
                paddingX: "15%",
                paddingTop: "2%",
                width: "100%",
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
