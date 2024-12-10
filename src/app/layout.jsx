import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "@/components/navbar";
import theme from "@/theme";
import { Stack } from "@mui/material";
import Head from "next/head";

export const metadata = {
  title: "WhenWhere2Meet",
  description: "Meet at any time, any place!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title key="title">When and where to Meet</title>
        <meta
          key="description"
          name="description"
          content="Meet at any time, any place!"
        />
        <meta key="og-title" property="og:title" content="WhenWhere2Meet" />
        <meta
          key="og-description"
          property="og:description"
          content="Meet at any time, any place!"
        />
        <meta
          key="og-url"
          property="og:url"
          content="https://db-finalproject.jikuai.dev/og.png"
        />
        <meta
          key="twitter-title"
          name="twitter:title"
          content="WhenWhere2Meet"
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content="Meet at any time, any place!"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lighter_app" />
        <meta
          name="twitter:image"
          content="https://db-finalproject.jikuai.dev/og.png"
        />

        <link rel="canonical" href="https://db-finalproject.jikuai.dev" />
      </Head>
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
