import { Typography, type TypographyProps } from "@mui/material";

interface PageTitleProps {
  title: string;
  variant?: TypographyProps["variant"];
}

export default function PageTitle({ title, variant = "h4" }: PageTitleProps) {
  return (
    <Typography variant={variant} component="h5" color="primary.main">
      {title}
    </Typography>
  );
}
