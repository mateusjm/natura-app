import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({ text = "Carregando..." }) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        backgroundColor: "background.default",
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
