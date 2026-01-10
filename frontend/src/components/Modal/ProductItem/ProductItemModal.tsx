import BaseModal from "@/components/Modal/BaseModal";
import { DataTable } from "@/components/Table/DataTable";
import productItemService from "@/services/productItemService";
import { productItemsColumns } from "@/tableConfig/product-item/productItemsColumns";
import type { ProductItem } from "@/types/productItem";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import AddProductItemModal from "./AddProductItemModal";

interface ProductItemModalProps {
  open: boolean;
  onClose: () => void;
  addMultipleItems: (items: ProductItem[]) => void;
}

export default function ProductItemModal({
  open,
  onClose,
  addMultipleItems,
}: ProductItemModalProps) {
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddItem = (item: ProductItem) => {
    if (editItem) {
      setProductItems((prev) =>
        prev.map((pi) => (pi === editItem ? item : pi))
      );
      setEditItem(null);
    } else {
      setProductItems((prev) => [...prev, item]);
    }
  };

  const handleEdit = (item: ProductItem) => {
    setEditItem(item);
    setCreateModalOpen(true);
  };

  const handleDelete = (item: ProductItem) => {
    setProductItems((prev) => prev.filter((pi) => pi !== item));
  };

  const handleSaveAll = async () => {
    if (productItems.length === 0) return;
    setLoading(true);

    try {
      for (const item of productItems) {
        const payload = {
          product_id: item.product_id,
          quantity: item.quantity,
          cost: item.cost,
          validity: item.validity.toISOString(),
          entry_date: item.entry_date.toISOString(),
        };

        console.log("Payload enviado:", payload);

        const created = await productItemService.create(payload);
        addMultipleItems([created]);
      }

      handleClose();
    } catch (error) {
      console.error("Erro ao criar itens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setProductItems([]);
    setEditItem(null);
    setCreateModalOpen(false);
    onClose();
  };

  return (
    <BaseModal open={open} onClose={handleClose} width="85%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="end"
        mb={2}
      >
        <Typography variant="h5" color="primary">
          Tabela de Itens
        </Typography>
        <Button
          size="large"
          variant="outlined"
          onClick={() => {
            setEditItem(null);
            setCreateModalOpen(true);
          }}
        >
          Adicionar Item
        </Button>
      </Box>
      <DataTable
        data={productItems}
        columns={productItemsColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        maxHeight="50vh"
      />
      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
        <Button
          size="large"
          variant="outlined"
          onClick={handleClose}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={handleSaveAll}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </Stack>
      <AddProductItemModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleAddItem}
        item={editItem}
      />
    </BaseModal>
  );
}
