import { Button } from "@mui/material";

interface CreateButtonProps {
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "success" | "error";
  size?: "small" | "medium" | "large";
}

export default function CreateButton({
  label,
  onClick,
  color = "primary",
  size = "large",
}: CreateButtonProps) {
  return (
    <Button
      size={size}
      variant="outlined"
      color={color}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
