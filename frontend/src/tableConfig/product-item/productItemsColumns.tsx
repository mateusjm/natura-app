import type { MRT_ColumnDef } from "material-react-table";

const formatDateSafe = (value: any) => {
  if (!value) return "";
  const d = typeof value === "string" ? new Date(value) : new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR");
};

export const productItemsColumns: MRT_ColumnDef<any>[] = [
  {
    header: "Id",
    accessorKey: "product.id",
    size: 60,
    accessorFn: (row) => row.product?.id ?? "",
  },
  {
    accessorKey: "entry_date",
    header: "Data de Entrada",
    Cell: ({ cell }) => formatDateSafe(cell.getValue() ?? ""),
  },
  {
    header: "Nome do Produto",
    accessorKey: "product.name",
    accessorFn: (row) => row.product?.name ?? "",
  },
  {
    accessorKey: "cost",
    header: "Custo",
    Cell: ({ cell }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(cell.getValue() ?? 0)),
  },
  {
    accessorKey: "quantity",
    header: "Unidades",
  },
  {
    accessorKey: "validity",
    header: "Validade",
    Cell: ({ cell }) => formatDateSafe(cell.getValue() ?? ""),
  },
];
