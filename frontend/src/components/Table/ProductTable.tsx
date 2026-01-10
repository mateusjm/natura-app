import { DataTable } from "@/components/Table/DataTable";
import { productColumns } from "@/tableConfig/product/productColumns";
import type { Product } from "@/types/product";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <DataTable
      data={products}
      columns={productColumns}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
