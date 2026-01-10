export interface ProductItem {
  id?: number;
  quantity: number;
  validity: Date;
  entry_date: Date;
  cost: number;
  product_id: number;
  product: {
    id: number;
    name: string;
    base_price: number;
  };
}

export interface CreateProductItemDTO {
  product_id: number;
  quantity: number;
  validity: string;
  entry_date: string;
  cost: number;
}
