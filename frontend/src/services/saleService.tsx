import {
  getMockMonthlyStats,
  mockOverdueSales,
  mockPendingSales,
  mockTotalSalesAmount,
  mockTotalSalesProfit,
} from "@/mocks/dashboardMock";
import useHttp from "@/services/useHttp";
import { withDashboardMock } from "@/utils/withDashboardMock";
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

  getTotalSalesAmount: async (period: string = "1m") =>
    withDashboardMock(
      async () => {
        const res = await useHttp.get(
          `/sale/total-sales-amount?period=${period}`
        );
        return res.data;
      },
      { totalSalesAmount: mockTotalSalesAmount }
    ),

  getTotalSalesProfit: async (period: string = "1m") =>
    withDashboardMock(
      async () => {
        const res = await useHttp.get(
          `/sale/total-sales-profit?period=${period}`
        );
        return res.data;
      },
      { totalSalesProfit: mockTotalSalesProfit }
    ),

  getMonthlyStats: async (period: string = "1m") =>
    withDashboardMock(
      async () => {
        const res = await useHttp.get(`/sale/monthly-stats?period=${period}`);
        return res.data;
      },
      getMockMonthlyStats(period)
    ),

  getPendingSales: async (limit: number = 10): Promise<Sale[]> =>
    withDashboardMock(
      async () => {
        const res = await useHttp.get(`/sale/pending?limit=${limit}`);
        return res.data;
      },
      mockPendingSales.slice(0, limit)
    ),

  getPendingOverdueSales: async (limit: number = 10): Promise<Sale[]> =>
    withDashboardMock(
      async () => {
        const res = await useHttp.get(`/sale/overdue?limit=${limit}`);
        return res.data;
      },
      mockOverdueSales.slice(0, limit)
    ),
};

export default saleService;
