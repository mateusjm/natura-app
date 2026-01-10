import type { MRT_ColumnDef } from "material-react-table";
import { formatPhone } from "@/utils/phoneUtils";

export const clientColumns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "phone",
    header: "Celular",
    Cell: ({ cell }) => formatPhone(cell.getValue<string>()), 
  },
];
