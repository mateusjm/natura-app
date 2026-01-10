import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { MRT_ColumnDef } from "material-react-table";
import { MaterialReactTable } from "material-react-table";
import { useMemo } from "react";

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns?: MRT_ColumnDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onRowClick?: (row: any) => void;
  maxHeight?: string | number;
}

export function DataTableSale<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
  onRowClick,
  maxHeight,
}: DataTableProps<T>) {
  const theme = useTheme();

  const finalColumns = useMemo(() => {
    let cols = columns ? [...columns] : [];

    if (onEdit || onDelete) {
      cols.push({
        id: "actions",
        header: "Ações",
        enableSorting: false,
        enableColumnFilter: false,
        size: 120,
        muiTableBodyCellProps: { align: "center" },
        muiTableHeadCellProps: { align: "center" },
        Cell: ({ row }: any) => (
          <Box display="flex" justifyContent="center">
            {onEdit && (
              <IconButton size="small" onClick={() => onEdit(row.original)}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => onDelete(row.original)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ),
      });
    }

    return cols;
  }, [columns, onEdit, onDelete]);

  return (
    <MaterialReactTable
      columns={finalColumns}
      data={data}
      enableColumnFilters={false}
      enableGlobalFilter={false}
      enableSorting={false}
      enablePagination
      initialState={{ pagination: { pageSize: 3, pageIndex: 0 } }}
      enableTopToolbar={false}
      layoutMode="grid"
      // Container da tabela
      muiTableContainerProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          maxHeight: maxHeight || "100%",
          backgroundColor: theme.palette.background.paper,
        },
      }}
      // Paper principal da tabela
      muiTablePaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
          boxShadow: "none",
          backgroundColor: theme.palette.background.paper,
          flex: 1,
        },
      }}
      // Header da tabela
      muiTableHeadProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          fontWeight: "bold",
        },
      }}
      // Body da tabela
      muiTableBodyProps={{
        sx: {
          flex: 1,
          overflowY: "auto",
          backgroundColor: theme.palette.background.paper,
        },
      }}
      muiTableBodyCellProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
        },
      }}
      // Toolbar inferior com pagination
      muiBottomToolbarProps={{
        sx: {
          mt: "auto",
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
        },
      }}
      muiPaginationProps={{
        rowsPerPageOptions: [],
        showFirstButton: false,
        showLastButton: false,
      }}
      muiTableBodyRowProps={({ row }) => ({
        sx: {
          cursor: onRowClick ? "pointer" : "default",
          "&:hover": {
            backgroundColor: onRowClick
              ? "rgba(25, 118, 210, 0.08)"
              : "inherit",
          },
        },
        onClick: onRowClick ? () => onRowClick(row.original) : undefined,
      })}
    />
  );
}
