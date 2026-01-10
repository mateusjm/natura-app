import Header from "@/components/Header";
import type { Sale } from "@/types/sale";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/Table/DataTable";
import saleService from "@/services/saleService";
import { saleColumns } from "@/tableConfig/sale/saleColumns";
import { useNavigate } from "react-router-dom";
import DeleteConfirmModal from "@/components/Modal/DeleteConfirmModal";

export default function SalePage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const navigate = useNavigate();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingSale, setDeletingSale] = useState<Sale | null>(null);

  useEffect(() => {
    saleService.getAll().then(setSales);
  }, []);

  const handleEdit = (saleId: string) => {
    navigate(`/vendas/adicionar/${saleId}`);
  };

  const openDeleteModal = (row: Sale) => {
    setDeletingSale(row);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeletingSale(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!deletingSale) return;

    await saleService.remove(deletingSale.id!);

    setSales((prev) => prev.filter((p) => p.id !== deletingSale.id));
    closeDeleteModal();
  };

  return (
    <Box>
      <Header
        title="Vendas"
        buttonLabel="Adicionar Venda"
        onCreate={() => navigate("/vendas/adicionar")}
      />
      <DataTable
        data={sales}
        columns={saleColumns}
        onEdit={(sale) => handleEdit(sale.id)}
        onDelete={openDeleteModal}
      />
      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemName="essa Venda"
      />
    </Box>
  );
}
