// components/Modal/SaleProductItemModal.tsx
import { useState, useEffect } from "react";
import BaseModal from "@/components/Modal/BaseModal";
import type { ProductItem } from "@/types/productItem";
import {
  Typography,
  TextField,
  Stack,
  Autocomplete,
  Button,
} from "@mui/material";
import productItemService from "@/services/productItemService";
import CurrencyInput from "@/components/Form/CurrencyInput";
import QuantityInput from "@/components/Form/QuantityInput";
import { useSale } from "@/contexts/saleContext";
import type { SaleProductItem } from "@/types/saleProductItem";

interface SaleProductItemModalProps {
  open: boolean;
  onClose: () => void;
  editItem?: SaleProductItem | null;
}

export default function SaleProductItemModal({
  open,
  onClose,
  editItem,
}: SaleProductItemModalProps) {
  const { saleItems, setSaleItems } = useSale();
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [selectedProductItem, setSelectedProductItem] =
    useState<ProductItem | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (open) {
      productItemService.getAll().then(setProductItems).catch(console.error);
    }
  }, [open]);

  useEffect(() => {
    if (editItem) {
      setSelectedProductItem(editItem.product_item ?? null);
      setQuantity(editItem.quantity);
      setPrice(Number(editItem.price) || 0);
    } else {
      setSelectedProductItem(null);
      setQuantity(null);
      setPrice(0);
    }
  }, [editItem]);

  useEffect(() => {
    if (editItem) return;

    if (selectedProductItem && quantity) {
      setPrice(Number(selectedProductItem.product.base_price) * quantity);
    } else {
      setPrice(0);
    }
  }, [selectedProductItem, quantity, editItem]);

  const formatOptionLabel = (item: ProductItem) => {
    const validity = new Date(item.validity).toLocaleDateString("pt-BR");
    return `${item.product.name} - ${validity}`;
  };
  const handleSave = () => {
    if (!selectedProductItem || !quantity || !price) return;

    const product_item = selectedProductItem;

    const newItem: SaleProductItem = {
      ...(editItem ? { id: editItem.id } : {}),
      sale_id: editItem?.sale_id,
      product_item_id: product_item.id.toString(),
      quantity,
      price,
      product_item,
    };

    if (editItem) {
      setSaleItems(saleItems.map((i) => (i.id === editItem.id ? newItem : i)));
    } else {
      setSaleItems([...saleItems, newItem]);
    }

    onClose();
    setSelectedProductItem(null);
    setQuantity(null);
    setPrice(0);
  };

  return (
    <BaseModal open={open} onClose={onClose} width="30%">
      <Typography variant="h6" mb={3} color="primary">
        {editItem ? "Editar Item" : "Adicionar Item"}
      </Typography>
      <Stack spacing={2}>
        <Autocomplete
          options={
            editItem
              ? productItems
              : productItems.filter(
                  (pi) =>
                    !saleItems.some(
                      (item) => item.product_item_id === pi.id.toString()
                    )
                )
          }
          getOptionLabel={formatOptionLabel}
          value={selectedProductItem}
          onChange={(_, value) => setSelectedProductItem(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Item"
              placeholder="Selecione o item"
            />
          )}
        />

        <QuantityInput
          value={quantity}
          onChange={setQuantity}
          max={selectedProductItem?.quantity}
        />
        <CurrencyInput
          label="Preço"
          value={price}
          onChange={(value) => setPrice(value ?? 0)}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button size="large" variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            size="large"
            variant="contained"
            onClick={handleSave}
            disabled={!selectedProductItem || !quantity || !price}
          >
            Salvar
          </Button>
        </Stack>
      </Stack>
    </BaseModal>
  );
}
