import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";

interface DashboardCardProps {
  title: React.ReactNode;
  children: React.ReactNode;
  sx?: any;
}

export default function DashboardCard({
  title,
  children,
  sx,
}: DashboardCardProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 5,
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: "none",
        ...sx,
      }}
    >
      <Typography
        fontWeight="bold"
        variant="h6"
        gutterBottom
        mb={2}
        sx={{
          color: theme.palette.mode === "dark" ? "#EC6B20" : "#555",
        }}
      >
        {title}
      </Typography>

      <CardContent
        sx={{
          p: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          color: "text.secondary",
        }}
      >
        <Box sx={{ flex: 1 }}>{children}</Box>
      </CardContent>
    </Card>
  );
}
