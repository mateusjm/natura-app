import type { SaleProductItem } from "@/types/saleProductItem";

export interface Sale {
  id?: string;
  date: string;
  payment_method: "dinheiro" | "pix";
  deadline: string;
  totalPrice: number;
  totalCost: number;
  status: "pendente" | "pago" | "cancelada";
  client_id: string;
  client: {
    id: number;
    name: string;
    phone: string;
  };
  items: SaleProductItem[];
}

export interface CreateSaleDTO {
  client_id: string;
  payment_method: "dinheiro" | "pix";
  status: "pendente" | "pago" | "cancelada";
  date: string;
  deadline: string;
  totalPrice: number;
  totalCost: number;
}
