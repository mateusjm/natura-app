import type { MRT_ColumnDef } from "material-react-table";

export const productColumns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nome do Produto",
  },
  {
    accessorKey: "base_price",
    header: "Preço Base",
    Cell: ({ cell }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(cell.getValue<number>()),
  },
  {
    accessorKey: "totalQuantity",
    header: "Total de Unidades",
  },
];
