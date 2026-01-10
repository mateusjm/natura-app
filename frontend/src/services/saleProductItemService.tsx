import useHttp from "@/services/useHttp";
import type { SaleProductItem } from "@/types/saleProductItem";

const saleProductItemService = {
  create: async (
    saleProductItem: SaleProductItem
  ): Promise<SaleProductItem> => {
    try {
      const res = await useHttp.post("/sale-product-item", saleProductItem);
      return res.data;
    } catch (error) {
      console.log("Erro ao criar items da venda", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<SaleProductItem> => {
    try {
      const res = await useHttp.get(`/sale-product-item/${id}`);
      return res.data;
    } catch (error) {
      console.log("Erro ao obter item da venda por ID", error);
      throw error;
    }
  },

  update: async (
    id: number,
    saleProductItem: SaleProductItem
  ): Promise<SaleProductItem> => {
    try {
      const res = await useHttp.patch(
        `/sale-product-item/${id}`,
        saleProductItem
      );
      return res.data;
    } catch (error) {
      console.log("Erro ao editar items da venda", error);
      throw error;
    }
  },

  remove: async (id: number): Promise<void> => {
    try {
      await useHttp.delete(`/sale-product-item/${id}`);
    } catch (error) {
      console.log("Erro ao remover itens da venda", error);
      throw error;
    }
  },
};

export default saleProductItemService;
