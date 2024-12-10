import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "@/components/navbar";
import theme from "@/theme";
import { Stack } from "@mui/material";

export const metadata = {
  title: "WhenWhere2Meet",
  description: "Meet at any time, any place!",
  openGraph: {
    title: "WhenWhere2Meet",
    description: "Meet at any time, any place!",
    url: "https://db-finalproject.jikuai.dev/og.png",
  },
  twitter: {
    title: "WhenWhere2Meet",
    description: "Meet at any time, any place!",
    card: "summary_large_image",
    site: "@lighter_app",
    image: "https://db-finalproject.jikuai.dev/og.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="m-0 h-screen w-screen">
        <ThemeProvider theme={theme}>
          <Stack
            direction="column"
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
          >
            <Navbar />
            <Box
              sx={{
                paddingX: "15%",
                paddingTop: "2%",
                width: "100%",
                paddingBottom: "2%",
              }}
            >
              {children}
            </Box>
          </Stack>
        </ThemeProvider>
      </body>
    </html>
  );
}
