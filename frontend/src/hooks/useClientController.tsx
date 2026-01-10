import { useEffect, useState } from "react";
import clientService from "@/services/clientService";
import type { Client } from "@/types/client";

export function useClientController() {
  const [clients, setClients] = useState<Client[]>([]);

  // modal principal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // modal de exclusão
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);

  // -------- Buscar todos --------
  useEffect(() => {
    (async () => {
      const data = await clientService.getAll();
      setClients(data);
    })();
  }, []);

  // -------- Criação / Edição --------

  const openCreateModal = () => {
    setEditingClient(null);
    setModalOpen(true);
  };

  const openEditModal = async (row: Client) => {
    const client = await clientService.getById(row.id!);
    setEditingClient(client);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingClient(null);
  };

  const handleSubmit = async (client: Client) => {
    if (client.id) {
      const updated = await clientService.update(client.id, client);
      setClients((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
    } else {
      const created = await clientService.create(client);
      setClients((prev) => [...prev, created]);
    }

    closeModal();
  };

  // -------- Exclusão --------

  const openDeleteModal = (row: Client) => {
    setDeletingClient(row);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeletingClient(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!deletingClient) return;

    await clientService.remove(deletingClient.id!);

    setClients((prev) => prev.filter((c) => c.id !== deletingClient.id));
    closeDeleteModal();
  };

  return {
    clients,

    // modal principal
    modalOpen,
    editingClient,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSubmit,

    // modal de exclusão
    deleteModalOpen,
    deletingClient,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
}
