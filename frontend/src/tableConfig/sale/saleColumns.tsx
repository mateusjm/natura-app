import type { MRT_ColumnDef } from "material-react-table";

const formatDateSafe = (value: any) => {
  if (!value) return "";
  const d = typeof value === "string" ? new Date(value) : new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR");
};

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const saleColumns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: "date",
    header: "Data",
    size: 100,
    Cell: ({ cell }) => formatDateSafe(cell.getValue()),
  },
  {
    accessorKey: "client.name",
    size: 230,
    header: "Nome do Cliente",
  },
  {
    accessorKey: "payment_method",
    size: 150,
    header: "Método de Pagamento",
    Cell: ({ cell }) => capitalize(cell.getValue() as string),
  },
  {
    accessorKey: "profit",
    size: 150,
    header: "Lucro",
    Cell: ({ row }) => {
      const totalPrice = Number(row.original.totalPrice || 0);
      const totalCost = Number(row.original.totalCost || 0);
      const profit = totalPrice - totalCost;

      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(profit);
    },
  },
  {
    accessorKey: "totalPrice",
    size: 150,
    header: "Valor Bruto",
    Cell: ({ cell }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(cell.getValue())),
  },
  {
    accessorKey: "status",
    header: "Status",
     size: 100,
    Cell: ({ cell }) => capitalize(cell.getValue() as string),
  },
  {
    accessorKey: "deadline",
    header: "Prazo de Pagamento",
    Cell: ({ cell }) => formatDateSafe(cell.getValue()),
  },
];
