import { Box } from "@mui/material";
import PageTitle from "@/components/PageTitle/PageTitle";
import CreateButton from "@/components/Button/CreateButton";
import type { ReactNode } from "react";
import type { TypographyProps } from "@mui/material";

interface HeaderProps {
  title: string;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
  onCreate?: () => void;
  variant?: TypographyProps["variant"];
}

export default function Header({
  title,
  buttonLabel,
  onCreate,
  variant,
}: HeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        mt: 1
      }}
    >
      <PageTitle title={title} variant={variant} />
      {onCreate && (
        <CreateButton label={buttonLabel ?? "Criar"} onClick={onCreate} />
      )}
    </Box>
  );
}
