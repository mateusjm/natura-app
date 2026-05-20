import { Box } from "@mui/material";
import type { ReactNode } from "react";
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <LandingHeader />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <LandingFooter />
    </Box>
  );
}
