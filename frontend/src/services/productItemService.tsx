import useHttp from "@/services/useHttp";
import type { CreateProductItemDTO, ProductItem } from "@/types/productItem";

const productItemService = {
  create: async (product: CreateProductItemDTO): Promise<ProductItem> => {
    try {
      const res = await useHttp.post("/product-item", product);
      return res.data;
    } catch (error) {
      console.log("Erro ao criar items do produto", error);
      throw error;
    }
  },

  getAll: async (): Promise<ProductItem[]> => {
    try {
      const res = await useHttp.get("/product-item");
      return res.data;
    } catch (error) {
      console.log("Erro ao obter produtos do estoque", error);
      throw error;
    }
  },

  getTotalStockValue: async (): Promise<number> => {
    try {
      const res = await useHttp.get("/product-item/total-stock-value");
      return res.data.totalStockValue;
    } catch (error) {
      console.log("Erro ao obter valor total do estoque", error);
      throw error;
    }
  },

  getById: async (id: string): Promise<ProductItem> => {
    try {
      const res = await useHttp.get(`/product-item/${id}`);
      return res.data;
    } catch (error) {
      console.log("Erro ao obter item do produto por ID", error);
      throw error;
    }
  },

  getExpiringItems: async (): Promise<ProductItem[]> => {
    try {
      const res = await useHttp.get(`/product-item/expiring`);
      return res.data;
    } catch (error) {
      console.log("Erro ao obter produtos próximos do vencimento", error);
      throw error;
    }
  },

  update: async (
    id: number,
    productItem: ProductItem
  ): Promise<ProductItem> => {
    try {
      const res = await useHttp.patch(`/product-item/${id}`, productItem);
      return res.data;
    } catch (error) {
      console.log("Erro ao editar produto", error);
      throw error;
    }
  },

  remove: async (id: number): Promise<void> => {
    try {
      await useHttp.delete(`/product-item/${id}`);
    } catch (error) {
      console.log("Erro ao remover produto", error);
      throw error;
    }
  },
};

export default productItemService;
