import { Box, Button, Stack } from "@mui/material";
import Header from "@/components/Header";
import { useSale } from "@/contexts/saleContext";
import AddSaleComponent from "@/components/Sale/AddSaleComponent";
import AddSaleItemComponent from "@/components/Sale/AddSaleItemComponent";
import { useSaleForm } from "@/hooks/useSaleForm";
import Loading from "@/components/Loading/Loading";

export default function AddSalePageContent() {
  const { selectedClient, saleItems } = useSale();
  const { handleSave, isEditing, isLoading, isSaving } = useSaleForm();

  if (isLoading) {
    return <Loading text="Carregando venda..." />;
  }

  return (
    <Box>
      <Header title={isEditing ? "Editar Venda" : "Adicionar Venda"} />

      <AddSaleComponent />
      <AddSaleItemComponent />

      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
        <Button variant="outlined" size="large" href="/vendas">
          Voltar
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          disabled={!selectedClient || saleItems.length === 0 || isSaving}
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </Stack>
    </Box>
  );
}
