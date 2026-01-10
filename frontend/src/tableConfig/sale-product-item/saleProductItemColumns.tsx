import type { MRT_ColumnDef } from "material-react-table";

const formatDateSafe = (value: any) => {
  if (!value) return "";
  const d = typeof value === "string" ? new Date(value) : new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR");
};

export const saleProductItemColumns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: "product_item.product.id",
    header: "Id",
  },
  {
    accessorKey: "product_item.product.name",
    header: "Nome do Item",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade de Itens",
  },
  {
    accessorKey: "totalCost",
    header: "Custo",
    Cell: ({ row }) => {
      const quantity = Number(row.original.quantity || 0);
      const cost = Number(row.original.product_item?.cost || 0);
      const totalCost = quantity * cost;

      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(totalCost);
    },
  },
  {
    accessorKey: "price",
    header: "Preço",
    Cell: ({ cell }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(cell.getValue())),
  },
  {
    accessorKey: "product_item.validity",
    header: "Validade do Lote",
    Cell: ({ cell }) => formatDateSafe(cell.getValue()),
  },
];
