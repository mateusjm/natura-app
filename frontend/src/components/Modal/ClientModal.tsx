import { useState, useEffect } from "react";
import BaseModal from "@/components/Modal/BaseModal";
import { Typography, TextField, Button, Stack } from "@mui/material";
import type { Client } from "@/types/client";
import { cleanPhone, formatPhone } from "@/utils/phoneUtils";

interface ClientModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Client) => void;
  initialData?: Client;
}

export default function ClientModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: ClientModalProps) {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [phone, setPhone] = useState<string>(initialData?.phone || "");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhone(initialData.phone);
    } else {
      setName("");
      setPhone("");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    onSubmit({
      id: initialData?.id ?? undefined,
      name,
      phone,
    });
    onClose();
  };

  return (
    <BaseModal open={open} onClose={onClose} width="30%">
      <Typography variant="h6" mb={3} color="primary">
        {initialData ? "Editar Cliente" : "Adicionar Cliente"}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Celular"
          value={formatPhone(phone)}
          onChange={(e) => setPhone(cleanPhone(e.target.value))}
          fullWidth
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button size="large" variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={handleSubmit}
            disabled={!name && !phone}
          >
            Salvar
          </Button>
        </Stack>
      </Stack>
    </BaseModal>
  );
}
