import useHttp from "@/services/useHttp";
import type { Sale, CreateSaleDTO } from "@/types/sale";
export type UpdateSaleDTO = Partial<CreateSaleDTO>;

const saleService = {
  create: async (sale: CreateSaleDTO): Promise<Sale> => {
    try {
      const res = await useHttp.post("/sale", sale);
      return res.data;
    } catch (error) {
      console.log("Erro ao criar venda", error);
      throw error;
    }
  },

  getAll: async (): Promise<Sale[]> => {
    try {
      const res = await useHttp.get("/sale");
      return res.data;
    } catch (error) {
      console.log("Erro ao obter vendas", error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Sale> => {
    try {
      const res = await useHttp.get(`/sale/${id}`);
      return res.data;
    } catch (error) {
      console.log("Erro ao obter venda por ID", error);
      throw error;
    }
  },

  update: async (id: string, sale: UpdateSaleDTO): Promise<Sale> => {
    try {
      const res = await useHttp.patch(`/sale/${id}`, sale);
      return res.data;
    } catch (error) {
      console.log("Erro ao editar venda", error);
      throw error;
    }
  },

  remove: async (id: string): Promise<void> => {
    try {
      await useHttp.delete(`/sale/${id}`);
    } catch (error) {
      console.log("Erro ao remover venda", error);
      throw error;
    }
  },

  getTotalSalesAmount: async (period: string = "1m") => {
    const res = await useHttp.get(`/sale/total-sales-amount?period=${period}`);
    return res.data;
  },

  getTotalSalesProfit: async (period: string = "1m") => {
    const res = await useHttp.get(`/sale/total-sales-profit?period=${period}`);
    return res.data;
  },

  getMonthlyStats: async (period: string = "1m") => {
    const res = await useHttp.get(`/sale/monthly-stats?period=${period}`);
    return res.data;
  },

  getPendingSales: async (limit: number = 10): Promise<Sale[]> => {
    try {
      const res = await useHttp.get(`/sale/pending?limit=${limit}`);
      return res.data;
    } catch (error) {
      console.log("Erro ao obter vendas pendentes", error);
      throw error;
    }
  },

  getPendingOverdueSales: async (limit: number = 10): Promise<Sale[]> => {
    try {
      const res = await useHttp.get(`/sale/overdue?limit=${limit}`);
      return res.data;
    } catch (error) {
      console.log("Erro ao obter vendas pendentes vencidas", error);
      throw error;
    }
  },
};

export default saleService;
