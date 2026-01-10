import BaseModal from "@/components/Modal/BaseModal";
import { Box, Button, Typography } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  itemName,
}: Props) {
  return (
    <BaseModal open={open} onClose={onClose} width="35%">
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">Confirmar exclusão</Typography>
        <Typography>
          Tem certeza que deseja excluir{" "}
          <Typography component="span" color="primary.main">
            {itemName ?? "este item"}
          </Typography>
          ?
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={onConfirm} color="primary" variant="contained">
            Excluir
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
}
