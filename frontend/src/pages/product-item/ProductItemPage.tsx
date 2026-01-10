import { Box } from "@mui/material";
import ProductItemTable from "@/components/Table/ProductItemTable";
import ProductItemModal from "@/components/Modal/ProductItem/ProductItemModal";
import AddProductItemModal from "@/components/Modal/ProductItem/AddProductItemModal";
import DeleteConfirmModal from "@/components/Modal/DeleteConfirmModal";
import Header from "@/components/Header";
import { useProductItemController } from "@/hooks/useProductItemController";

export default function ProductItemPage() {
  const ctrl = useProductItemController();

  const itemName = ctrl.deletingProductItem
    ? `${ctrl.deletingProductItem.quantity}x ${ctrl.deletingProductItem.product.name}`
    : undefined;

  return (
    <Box>
      <Header
        title="Estoque"
        buttonLabel="Adicionar Estoque"
        onCreate={ctrl.openCreateModal}
      />
      <ProductItemTable
        productsItems={ctrl.productItems}
        onDelete={ctrl.openDeleteModal}
        /* onEdit={ctrl.openEditModal}  */
      />
      <ProductItemModal
        open={ctrl.modalOpen}
        onClose={ctrl.closeModal}
        addMultipleItems={ctrl.addMultipleItems}
      />
      <AddProductItemModal
        open={ctrl.editModalOpen}
        onClose={ctrl.closeEditModal}
        onSubmit={ctrl.handleEditSubmit}
        item={ctrl.editingItem}
      />
      <DeleteConfirmModal
        open={ctrl.deleteModalOpen}
        onClose={ctrl.closeDeleteModal}
        onConfirm={ctrl.confirmDelete}
        itemName={itemName}
      />
    </Box>
  );
}
