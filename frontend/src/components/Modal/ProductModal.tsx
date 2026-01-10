import { useState, useEffect } from "react";
import { Typography, TextField, Button, Stack } from "@mui/material";
import type { Product } from "@/types/product";
import CurrencyInput from "@/components/Form/CurrencyInput";
import BaseModal from "@/components/Modal/BaseModal";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  initialData?: Product;
}

export default function ProductModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: ProductModalProps) {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [basePrice, setBasePrice] = useState<number | null>(
    initialData?.basePrice ?? null
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setBasePrice(initialData.basePrice);
    } else {
      setName("");
      setBasePrice(null);
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    onSubmit({
      id: initialData?.id ?? undefined,
      name,
      basePrice: basePrice ?? 0,
    });
    onClose();
  };

  return (
    <BaseModal open={open} onClose={onClose} width="30%">
      <Typography variant="h6" mb={3} color="primary">
        {initialData ? "Editar Produto" : "Adicionar Produto"}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <CurrencyInput
          label="Preço"
          value={basePrice}
          onChange={setBasePrice}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button size="large" variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={handleSubmit}
            disabled={!name || !basePrice}
          >
            Salvar
          </Button>
        </Stack>
      </Stack>
    </BaseModal>
  );
}
