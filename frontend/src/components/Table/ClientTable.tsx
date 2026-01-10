import { DataTable } from "@/components/Table/DataTable";
import { clientColumns } from "@/tableConfig/client/clientColumns";
import type { Client } from "@/types/client";

interface Props {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export default function ClientTable({ clients, onEdit, onDelete }: Props) {
  return (
    <DataTable
      data={clients}
      columns={clientColumns}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
