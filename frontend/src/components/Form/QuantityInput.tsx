import { TextField } from "@mui/material";

interface QuantityInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  max?: number;
}

export default function QuantityInput({
  value,
  onChange,
  max,
}: QuantityInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // permite apagar o input (string vazia)
    if (rawValue === "") {
      onChange(null);
      return;
    }

    const numberValue = Number(rawValue);
    if (!isNaN(numberValue)) {
      onChange(Math.min(numberValue, max ?? Infinity));
    }
  };

  return (
    <TextField
      label="Quantidade"
      type="text"
      value={value ?? ""}
      onChange={handleChange}
      helperText={max ? `Máximo disponível: ${max}` : ""}
      FormHelperTextProps={{ sx: { ml: 0.5, lineHeight: 1.3 } }}
    />
  );
}
