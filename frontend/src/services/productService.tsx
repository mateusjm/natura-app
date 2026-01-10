import useHttp from "@/services/useHttp";
import type { Product } from "@/types/product";

const productService = {
  create: async (product: Product): Promise<Product> => {
    try {
      const payload: any = {
        ...product,
        base_price: product.basePrice,
      };

      delete payload.basePrice;

      const res = await useHttp.post("/product", payload);
      return res.data;
    } catch (error) {
      console.log("Erro ao criar produto", error);
      throw error;
    }
  },

  getAll: async (): Promise<Product[]> => {
    try {
      const res = await useHttp.get("/product");
      return res.data;
    } catch (error) {
      console.log("Erro ao obter produtos", error);
      throw error;
    }
  },

  getAllWithStock: async (): Promise<Product[]> => {
    try {
      const res = await useHttp.get("/product/stock");
      return res.data;
    } catch (error) {
      console.log("Erro ao obter o estoque do produto", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Product> => {
    try {
      const res = await useHttp.get(`/product/${id}`);
      const data = res.data;

      return {
        id: data.id,
        name: data.name,
        basePrice: Number(data.base_price),
      };
    } catch (error) {
      console.log("Erro ao obter produto por ID", error);
      throw error;
    }
  },

  update: async (id: number, product: Product): Promise<Product> => {
    try {
      const payload = {
        name: product.name,
        base_price: product.basePrice,
      };

      const res = await useHttp.patch(`/product/${id}`, payload);
      return res.data;
    } catch (error) {
      console.log("Erro ao editar produto", error);
      throw error;
    }
  },

  remove: async (id: number): Promise<void> => {
    try {
      await useHttp.delete(`/product/${id}`);
    } catch (error) {
      console.log("Erro ao remover produto", error);
      throw error;
    }
  },
};

export default productService;
