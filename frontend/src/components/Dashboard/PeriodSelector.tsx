import { Box, Button } from "@mui/material";
import { usePeriod } from "@/contexts/periodContext";
import type { PeriodOption } from "@/contexts/periodContext";

const options: { label: string; value: PeriodOption }[] = [
  { label: "Último mês", value: "1m" },
  { label: "3 meses", value: "3m" },
  { label: "6 meses", value: "6m" },
  { label: "12 meses", value: "1y" },
];

export default function PeriodSelector() {
  const { period, setPeriod } = usePeriod();

  return (
    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant={period === opt.value ? "contained" : "outlined"}
          onClick={() => setPeriod(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </Box>
  );
}
