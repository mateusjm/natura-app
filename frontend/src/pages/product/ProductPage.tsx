import { Box } from "@mui/material";
import Header from "@/components/Header";
import ProductTable from "@/components/Table/ProductTable";
import ProductModal from "@/components/Modal/ProductModal";
import DeleteConfirmModal from "@/components/Modal/DeleteConfirmModal";
import { useProductController } from "@/hooks/useProductController";

export default function ProductPage() {
  const ctrl = useProductController();

  return (
    <Box>
      <Header
        title="Produtos"
        buttonLabel="Adicionar Produto"
        onCreate={ctrl.openCreateModal}
      />
      <ProductTable
        products={ctrl.products}
        onEdit={ctrl.openEditModal}
        onDelete={ctrl.openDeleteModal}
      />
      <ProductModal
        open={ctrl.modalOpen}
        onClose={ctrl.closeModal}
        onSubmit={ctrl.handleSubmit}
        initialData={ctrl.editingProduct ?? undefined}
      />
      <DeleteConfirmModal
        open={ctrl.deleteModalOpen}
        onClose={ctrl.closeDeleteModal}
        onConfirm={ctrl.confirmDelete}
        itemName={ctrl.deletingProduct?.name}
      />
    </Box>
  );
}
