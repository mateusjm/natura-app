import { useEffect, useState } from "react";
import productService from "@/services/productService";
import type { Product } from "@/types/product";

export function useProductController() {
  const [products, setProducts] = useState<Product[]>([]);

  // modal principal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // modal de exclusão
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  useEffect(() => {
    (async () => {
      const data = await productService.getAllWithStock();
      setProducts(data);
    })();
  }, []);

  // -------- Ações de criação/edição --------
  const openCreateModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = async (row: Product) => {
    const product = await productService.getById(row.id!);
    setEditingProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (product: Product) => {
    if (product.id) {
      await productService.update(product.id, product);
    } else {
      await productService.create(product);
    }
    
    const refreshed = await productService.getAllWithStock();
    setProducts(refreshed);

    closeModal();
  };

  // -------- Ações de exclusão --------
  const openDeleteModal = (row: Product) => {
    setDeletingProduct(row);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeletingProduct(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!deletingProduct) return;

    await productService.remove(deletingProduct.id!);

    setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
    closeDeleteModal();
  };

  return {
    products,
    // modal principal
    modalOpen,
    editingProduct,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,
    // modal de exclusão
    deleteModalOpen,
    deletingProduct,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
}
