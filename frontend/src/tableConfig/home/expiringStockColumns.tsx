import type { MRT_ColumnDef } from "material-react-table";
import type { ProductItem } from "@/types/productItem";

export const expiringStockColumns: MRT_ColumnDef<ProductItem>[] = [
  {
    header: "Produto",
    accessorKey: "product.name",
  },
  {
    header: "Quantidade",
    accessorKey: "quantity",
  },
  {
    header: "Validade",
    accessorKey: "validity",
    Cell: ({ cell }) =>
      new Date(cell.getValue<string>()).toLocaleDateString("pt-BR"),
  },
];
