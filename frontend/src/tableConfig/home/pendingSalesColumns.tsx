import type { MRT_ColumnDef } from "material-react-table";
import type { Sale } from "@/types/sale";

export const pendingSalesColumns: MRT_ColumnDef<Sale>[] = [
  {
    header: "Cliente",
    accessorKey: "client.name",
    size: 70,
  },
  {
    header: "Valor",
    accessorKey: "totalPrice",
    size: 45,
    Cell: ({ cell }) =>
      Number(cell.getValue<number>()).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    header: "Data",
    accessorKey: "deadline",
    size: 45,
    Cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>());
      return date.toLocaleDateString("pt-BR");
    },
  },
];
