import { Box } from "@mui/material";
import Header from "@/components/Header";
import ClientTable from "@/components/Table/ClientTable";
import ClientModal from "@/components/Modal/ClientModal";
import DeleteConfirmModal from "@/components/Modal/DeleteConfirmModal";
import { useClientController } from "@/hooks/useClientController";

export default function ClientPage() {
  const ctrl = useClientController();

  return (
    <Box>
      <Header
        title="Clientes"
        buttonLabel="Adicionar Cliente"
        onCreate={ctrl.openCreateModal}
      />
      <ClientTable
        clients={ctrl.clients}
        onEdit={ctrl.openEditModal}
        onDelete={ctrl.openDeleteModal}
      />
      <ClientModal
        open={ctrl.modalOpen}
        onClose={ctrl.closeModal}
        onSubmit={ctrl.handleSubmit}
        initialData={ctrl.editingClient ?? undefined}
      />
      <DeleteConfirmModal
        open={ctrl.deleteModalOpen}
        onClose={ctrl.closeDeleteModal}
        onConfirm={ctrl.confirmDelete}
        itemName={ctrl.deletingClient?.name}
      />
    </Box>
  );
}
