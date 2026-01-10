import type { ProductItem } from "./productItem";

export interface SaleProductItem {
  id?: number; 
  sale_id?: string; 
  product_item_id: string;
  quantity: number;
  price: number;
  product_item?: ProductItem; 
}
