import { useEffect, useState } from "react";
import type { ProductItem } from "@/types/productItem";
import productItemService from "@/services/productItemService";

export function useProductItemController() {
  const [productItems, setProductItems] = useState<ProductItem[]>([]);

  // modal de múltiplos itens
  const [modalOpen, setModalOpen] = useState(false);

  // modal de edição individual
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductItem | null>(null);

  // modal de delete
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingProductItem, setDeletingProductItem] =
    useState<ProductItem | null>(null);

  // Buscar dados
  useEffect(() => {
    async function fetchData() {
      const data = await productItemService.getAll();
      setProductItems(data);
    }
    fetchData();
  }, []);

  // CREATE múltiplos
  const openCreateModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // EDIT individual
  const openEditModal = (item: ProductItem) => {
    const normalizedItem: ProductItem = {
      ...item,
      cost: Number(item.cost),
      quantity: Number(item.quantity),
      product: {
        ...item.product,
        base_price: Number(item.product.base_price),
      },
    };

    setEditingItem(normalizedItem);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingItem(null);
    setEditModalOpen(false);
  };

  const handleEditSubmit = async (updated: ProductItem) => {
    await productItemService.update(updated.id!, updated);
    setProductItems((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );

    closeEditModal();
  };

  const openDeleteModal = (item: ProductItem) => {
    setDeletingProductItem(item);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeletingProductItem(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!deletingProductItem) return;

    await productItemService.remove(deletingProductItem.id!);

    setProductItems((prev) =>
      prev.filter((p) => p.id !== deletingProductItem.id)
    );

    closeDeleteModal();
  };

  const addMultipleItems = (items: ProductItem[]) => {
    setProductItems((prev) => [...prev, ...items]);
  };

  return {
    productItems,

    // create
    modalOpen,
    openCreateModal,
    closeModal,

    // edit
    editModalOpen,
    editingItem,
    openEditModal,
    closeEditModal,
    handleEditSubmit,

    // delete
    deleteModalOpen,
    deletingProductItem,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,

    addMultipleItems,
  };
}
