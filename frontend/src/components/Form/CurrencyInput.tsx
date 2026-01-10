import { TextField } from "@mui/material";
import type { ChangeEvent } from "react";

interface CurrencyInputProps {
  label: string;
  value: number | null; 
  onChange: (value: number | null) => void;
  fullWidth?: boolean;
}

export default function CurrencyInput({
  label,
  value,
  onChange,
  fullWidth = true,
}: CurrencyInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    
    if (raw === "") {
      onChange(null);
      return;
    }

    const numericValue = Number(raw) / 100;
    onChange(numericValue);
  };

  const displayValue =
    value === null
      ? ""
      : value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

  return (
    <TextField
      label={label}
      value={displayValue}
      onChange={handleChange}
      fullWidth={fullWidth}
      type="text"
    />
  );
}
