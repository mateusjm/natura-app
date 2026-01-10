import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { MRT_ColumnDef } from "material-react-table";
import { MaterialReactTable } from "material-react-table";
import { useMemo } from "react";

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns?: MRT_ColumnDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  maxHeight?: string | number;
  showTotalPrice?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
  maxHeight,
  showTotalPrice = false,
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
          <>
            {onEdit && (
              <IconButton onClick={() => onEdit(row.original)}>
                <EditIcon />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                color="primary"
                onClick={() => onDelete(row.original)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </>
        ),
      });
    }

    return cols;
  }, [columns, onEdit, onDelete]);

  const totalPrice = useMemo(() => {
    if (!showTotalPrice) return 0;
    return data.reduce((acc, row: any) => acc + Number(row.price || 0), 0);
  }, [data, showTotalPrice]);

  return (
    <MaterialReactTable
      columns={finalColumns}
      data={data}
      enableColumnFilters
      enableGlobalFilter
      enableSorting
      enablePagination
      layoutMode="grid"
      enableStickyHeader
      muiTableContainerProps={{
        sx: {
          maxHeight: maxHeight || "none",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.paper,
          borderRadius: 0,     
          boxShadow: "none",    
        },
      }}
      muiTablePaperProps={{
        sx: {
          borderRadius: 5,
          boxShadow: "none",
          backgroundColor: theme.palette.background.paper,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          border: "none",     
        },
      }}
      muiTableHeadProps={{
        sx: { backgroundColor: theme.palette.background.paper },
      }}
      muiTableHeadCellProps={{
        sx: { backgroundColor: theme.palette.background.paper, fontWeight: "bold" },
      }}
      muiTableBodyProps={{
        sx: {
          flex: 1,
          overflowY: "auto",
          backgroundColor: theme.palette.background.paper,
        },
      }}
      muiTableBodyCellProps={{
        sx: { backgroundColor: theme.palette.background.paper },
      }}
      muiTopToolbarProps={{
        sx: { backgroundColor: theme.palette.background.paper },
      }}
      muiBottomToolbarProps={{
        sx: {
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
        },
      }}
      renderBottomToolbar={
        showTotalPrice
          ? () => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                  borderTop: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="subtitle1">
                  Total:{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalPrice)}
                </Typography>
              </Box>
            )
          : undefined
      }
    />
  );
}

