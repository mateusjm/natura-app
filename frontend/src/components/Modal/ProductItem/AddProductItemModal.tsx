import { useEffect, useState } from "react";
import BaseModal from "@/components/Modal/BaseModal";
import {
  TextField,
  Button,
  Stack,
  Autocomplete,
  Typography,
} from "@mui/material";
import CurrencyInput from "@/components/Form/CurrencyInput";
import productService from "@/services/productService";
import type { Product } from "@/types/product";
import { formatDateLocal, parseLocalDate } from "@/utils/dateUtils";

interface AddProductItemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: any) => void;
  item?: any;
}

export default function AddProductItemModal({
  open,
  onClose,
  onSubmit,
  item,
}: AddProductItemModalProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [validity, setValidity] = useState<string>("");
  const [entryDate, setEntryDate] = useState<string>("");
  const [cost, setCost] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (open) {
      productService.getAll().then(setProducts).catch(console.error);
      setEntryDate(formatDateLocal(new Date()));
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      if (item) {
        setQuantity(item.quantity ?? null);
        setValidity(
          item.validity ? formatDateLocal(new Date(item.validity)) : ""
        );
        setEntryDate(
          item.entry_date ? formatDateLocal(new Date(item.entry_date)) : ""
        );
        setCost(item.cost ?? null);
        setSelectedProduct(item.product ?? null);
      } else {
        setQuantity(null);
        setValidity("");
        setEntryDate(formatDateLocal(new Date()));
        setCost(null);
        setSelectedProduct(null);
      }
    }
  }, [open, item]);

  const resetForm = () => {
    setQuantity(null);
    setValidity("");
    setEntryDate(formatDateLocal(new Date()));
    setCost(null);
    setSelectedProduct(null);
  };

  const handleSubmit = () => {
    if (!selectedProduct) return;

    onSubmit({
      ...item,
      quantity,
      validity: validity ? parseLocalDate(validity) : null,
      entry_date: entryDate ? parseLocalDate(entryDate) : null,
      cost,
      product_id: selectedProduct.id,
      product: selectedProduct,
    });

    if (!item) {
      resetForm();
      return;
    }

    onClose();
  };

  return (
    <BaseModal open={open} onClose={onClose} width="30%">
      <Stack spacing={2}>
        <Typography variant="h6" mb={3} color="primary">
          {item ? "Editar Item" : "Adicionar Item"}
        </Typography>
        <Autocomplete
          options={products}
          getOptionLabel={(option) => option.name}
          value={selectedProduct}
          onChange={(_, value) => setSelectedProduct(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Produto"
              placeholder="Selecione o produto"
            />
          )}
        />
        <TextField
          label="Quantidade"
          type="text"
          value={quantity ?? ""}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <CurrencyInput label="Custo" value={cost} onChange={setCost} />
        <TextField
          label="Data de Entrada"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
        />
        <TextField
          label="Validade"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit} disabled={!cost}>
          {item ? "Salvar" : "Adicionar"}
        </Button>
      </Stack>
    </BaseModal>
  );
}
