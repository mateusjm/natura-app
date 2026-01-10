import { DataTable } from "@/components/Table/DataTable";
import { productItemsColumns } from "@/tableConfig/product-item/productItemsColumns";
import type { ProductItem } from "@/types/productItem";

interface Props {
  productsItems: ProductItem[];
  onDelete: (product: ProductItem) => void;
  /* onEdit: (product: ProductItem) => void;  */
}

export default function ProductItemTable({
  productsItems,
  onDelete,
 /*  onEdit, */
}: Props) {
  return (
    <DataTable
      data={productsItems}
      columns={productItemsColumns}
      onDelete={onDelete}
      /* onEdit={onEdit}  */
    />
  );
}
