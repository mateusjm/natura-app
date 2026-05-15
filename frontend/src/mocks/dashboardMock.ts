import type { ProductItem } from "@/types/productItem";
import type { Sale } from "@/types/sale";

export const mockTotalSalesAmount = 28_450.75;
export const mockTotalSalesProfit = 11_230.5;
export const mockTotalStockValue = 45_680;

const mockClients = [
  { id: 1, name: "Maria Silva", phone: "(11) 98765-4321" },
  { id: 2, name: "Ana Costa", phone: "(21) 97654-3210" },
  { id: 3, name: "Juliana Santos", phone: "(31) 96543-2109" },
  { id: 4, name: "Fernanda Lima", phone: "(41) 95432-1098" },
  { id: 5, name: "Patrícia Oliveira", phone: "(51) 94321-0987" },
];

function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function createMockSale(
  id: string,
  clientIndex: number,
  totalPrice: number,
  deadlineDays: number,
): Sale {
  const client = mockClients[clientIndex];
  const totalCost = Math.round(totalPrice * 0.55 * 100) / 100;

  return {
    id,
    date: daysFromNow(-7),
    payment_method: "pix",
    deadline: daysFromNow(deadlineDays),
    totalPrice,
    totalCost,
    status: "pendente",
    client_id: String(client.id),
    client,
    items: [],
  };
}

export const mockPendingSales: Sale[] = [
  createMockSale("mock-pending-1", 0, 245.9, 5),
  createMockSale("mock-pending-2", 1, 189.5, 8),
  createMockSale("mock-pending-3", 2, 412, 12),
  createMockSale("mock-pending-4", 3, 98.75, 3),
];

export const mockOverdueSales: Sale[] = [
  createMockSale("mock-overdue-1", 4, 320, -12),
  createMockSale("mock-overdue-2", 0, 156.3, -5),
  createMockSale("mock-overdue-3", 1, 278.9, -18),
];

const mockProducts = [
  { id: 1, name: "Essencial Desodorante", base_price: 54.9 },
  { id: 2, name: "Chronos Hidratante", base_price: 89.9 },
  { id: 3, name: "Ekos Castanha Sabonete", base_price: 24.9 },
  { id: 4, name: "Kaiak Desodorante", base_price: 49.9 },
  { id: 5, name: "Tododia Hidratante", base_price: 32.9 },
];

function createMockProductItem(
  id: number,
  productIndex: number,
  quantity: number,
  validityDays: number,
): ProductItem {
  const product = mockProducts[productIndex];
  const validity = new Date();
  validity.setDate(validity.getDate() + validityDays);

  return {
    id,
    quantity,
    validity,
    entry_date: new Date(),
    cost: product.base_price * 0.6,
    product_id: product.id,
    product,
  };
}

export const mockExpiringItems: ProductItem[] = [
  createMockProductItem(1, 0, 8, 15),
  createMockProductItem(2, 1, 4, 22),
  createMockProductItem(3, 2, 12, 8),
  createMockProductItem(4, 3, 6, 28),
  createMockProductItem(5, 4, 10, 18),
];

const monthlyAmounts = [
  12_450, 18_200, 15_600, 22_100, 19_800, 24_500, 21_300, 17_900, 26_400,
  23_100, 20_700, 28_450,
];
const monthlyProfits = [
  5_200, 7_800, 6_100, 9_400, 8_200, 10_100, 8_900, 7_400, 11_200, 9_600, 8_500,
  11_230,
];

function monthsForPeriod(period: string): number {
  switch (period) {
    case "3m":
      return 3;
    case "6m":
      return 6;
    case "1y":
      return 12;
    case "all":
      return 12;
    default:
      return 2;
  }
}

export function formatMonthlyStatsForChart(
  stats: { month: string; totalSalesAmount: number; totalSalesProfit: number }[]
) {
  return stats.map((item) => {
    const [year, month] = item.month.split("-");
    return {
      ...item,
      month: `${month}/${year}`,
    };
  });
}

export function getMockMonthlyStatsFormatted(period: string) {
  return formatMonthlyStatsForChart(getMockMonthlyStats(period));
}

export function getMockMonthlyStats(period: string) {
  const count = monthsForPeriod(period);
  const now = new Date();
  const stats = [];

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const index =
      (date.getMonth() + date.getFullYear()) % monthlyAmounts.length;

    stats.push({
      month,
      totalSalesAmount: monthlyAmounts[index],
      totalSalesProfit: monthlyProfits[index],
    });
  }

  return stats;
}
