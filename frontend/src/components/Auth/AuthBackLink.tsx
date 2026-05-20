import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface AuthBackLinkProps {
  label?: string;
}

export default function AuthBackLink({ label = "Voltar ao início" }: AuthBackLinkProps) {
  return (
    <Button
      component={RouterLink}
      to="/"
      startIcon={<ArrowBackIcon />}
      color="inherit"
      sx={{
        position: "absolute",
        top: { xs: 16, sm: 24 },
        left: { xs: 16, sm: 24 },
        fontWeight: 500,
        color: "text.secondary",
        "&:hover": { color: "primary.main", bgcolor: "transparent" },
      }}
    >
      {label}
    </Button>
  );
}
