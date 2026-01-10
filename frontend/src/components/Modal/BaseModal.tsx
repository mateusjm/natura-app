import { Modal, Box } from "@mui/material";

const baseStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 8,
  boxShadow: 24,
  p: 5,
};

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
}

export default function BaseModal({
  open,
  onClose,
  children,
  width = "35%",
}: BaseModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...baseStyle, width }}>{children}</Box>
    </Modal>
  );
}
