import { Box, Typography, useTheme } from "@mui/material";
import type { ReactNode } from "react";

interface TableScrollWrapperProps {
  children: ReactNode;
  showLeftFade: boolean;
  showRightFade: boolean;
  showHint?: boolean;
}

export default function TableScrollWrapper({
  children,
  showLeftFade,
  showRightFade,
  showHint = false,
}: TableScrollWrapperProps) {
  const theme = useTheme();
  const fadeColor =
    theme.palette.mode === "dark"
      ? theme.palette.background.paper
      : theme.palette.background.paper;

  return (
    <Box
      className="mrt-table-wrapper"
      sx={{
        position: "relative",
        width: "100%",
        minWidth: 0,
        borderRadius: { xs: 2, md: 3 },
        overflow: "hidden",
        border: 1,
        borderColor: "divider",
      }}
    >
      {children}

      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 28,
          pointerEvents: "none",
          opacity: showLeftFade ? 1 : 0,
          transition: "opacity 0.25s ease",
          background: `linear-gradient(to right, ${fadeColor}, transparent)`,
          zIndex: 2,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 28,
          pointerEvents: "none",
          opacity: showRightFade ? 1 : 0,
          transition: "opacity 0.25s ease",
          background: `linear-gradient(to left, ${fadeColor}, transparent)`,
          zIndex: 2,
        }}
      />

      {showHint && showRightFade && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            bottom: 6,
            right: 12,
            color: "text.secondary",
            opacity: 0.7,
            pointerEvents: "none",
            zIndex: 2,
            fontSize: "0.7rem",
          }}
        >
          Deslize para ver mais →
        </Typography>
      )}
    </Box>
  );
}
