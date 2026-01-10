import Header from "@/components/Header";
import { useState } from "react";
import { DataTable } from "@/components/Table/DataTable";
import { saleProductItemColumns } from "@/tableConfig/sale-product-item/saleProductItemColumns";
import { useSale } from "@/contexts/saleContext";
import SaleProductItemModal from "@/components/Modal/SaleProductItemModal";
import type { SaleProductItem } from "@/types/saleProductItem";
import saleProductItemService from "@/services/saleProductItemService";

export default function AddSaleItemComponent() {
  const [removedItems, setRemovedItems] = useState<SaleProductItem[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<SaleProductItem | null>(null);
  const { saleItems, setSaleItems } = useSale();

  const openCreateModal = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item: SaleProductItem) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (item: SaleProductItem) => {
    try {
      if (item.id) {
        await saleProductItemService.remove(item.id);
        setRemovedItems((prev) => [...prev, item]);
      }

      setSaleItems(saleItems.filter((i) => i.id !== item.id));
    } catch (error) {
      console.error("Erro ao remover item da venda:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  console.log(saleItems)

  return (
    <>
      <Header
        title="Tabela de Itens"
        buttonLabel="Adicionar Item"
        onCreate={openCreateModal}
      />
      <DataTable
        data={saleItems}
        columns={saleProductItemColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showTotalPrice
      />

      <SaleProductItemModal
        open={modalOpen}
        onClose={closeModal}
        editItem={editItem}
      />
    </>
  );
}
