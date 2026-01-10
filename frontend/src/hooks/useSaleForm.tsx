import { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSale } from "@/contexts/saleContext";
import saleService from "@/services/saleService";
import saleProductItemService from "@/services/saleProductItemService";
import type { CreateSaleDTO } from "@/types/sale";
import type { SaleProductItem } from "@/types/saleProductItem";

type CreateSaleProductItemDTO = Omit<SaleProductItem, "id" | "productItem">;

export function useSaleForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    selectedClient,
    paymentMethod,
    status,
    date,
    deadline,
    saleItems,
    setSaleData,
  } = useSale();

  useEffect(() => {
    if (!id) return;

    const fetchSaleItemsWithProduct = async () => {
      try {
        setIsLoading(true);

        const sale = await saleService.getById(id);

        const formattedDate = sale.date?.split("T")[0] ?? "";
        const formattedDeadline = sale.deadline?.split("T")[0] ?? "";

        const fullItems: SaleProductItem[] = await Promise.all(
          sale.items.map(async (item) => {
            if (!item.id) return item;
            try {
              return await saleProductItemService.getById(item.id);
            } catch {
              return item;
            }
          })
        );

        setSaleData({
          selectedClient: sale.client,
          paymentMethod: sale.payment_method,
          status: sale.status,
          date: formattedDate,
          deadline: formattedDeadline,
          saleItems: fullItems,
        });
      } catch (e) {
        console.error("Erro ao carregar venda:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleItemsWithProduct();
  }, [id]);

  const handleSave = useCallback(async () => {
    if (!selectedClient || saleItems.length === 0) return;

    try {
      setIsSaving(true);
      const totalPrice = saleItems.reduce(
        (acc, item) => acc + Number(item.price || 0),
        0
      );

      const totalCost = saleItems.reduce(
        (acc, item) =>
          acc +
          Number(item.product_item?.cost || 0) * Number(item.quantity || 0),
        0
      );

      let saleId = id;

      if (!saleId) {
        const newSale = await saleService.create({
          client_id: String(selectedClient.id),
          payment_method: paymentMethod,
          status,
          date,
          deadline,
          totalPrice,
          totalCost,
        } as CreateSaleDTO);

        if (!newSale.id) throw new Error("Erro: id da venda não retornado");
        saleId = newSale.id;

      } else {
        await saleService.update(saleId, {
          client_id: String(selectedClient.id),
          payment_method: paymentMethod,
          status,
          date,
          deadline,
          totalPrice,
          totalCost,
        });
      }

      await Promise.all(
        saleItems.map(async (item) => {
          if (!item.id) {
            const newItem: CreateSaleProductItemDTO = {
              sale_id: saleId!,
              product_item_id: item.product_item_id,
              quantity: item.quantity,
              price: item.price,
            };
            await saleProductItemService.create(newItem);
          } else {
            await saleProductItemService.update(item.id, {
              product_item_id: item.product_item_id,
              quantity: item.quantity,
              price: item.price,
            });
          }
        })
      );

      navigate("/vendas");
    } catch (error) {
      console.error("Erro ao salvar venda", error);
    } finally {
      setIsSaving(false);
    }
  }, [
    selectedClient,
    saleItems,
    paymentMethod,
    status,
    date,
    deadline,
    id,
    navigate,
  ]);

  return { handleSave, isEditing: !!id, isLoading, isSaving };
}
