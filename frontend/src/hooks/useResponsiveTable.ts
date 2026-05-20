import type { MRT_ColumnDef, MRT_RowData } from "material-react-table";
import { useMediaQuery, useTheme, type Theme } from "@mui/material";
import { useCallback, useMemo, useState } from "react";

export type TableColumnMeta = {
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  pinLeft?: boolean;
};

function getColumnId<T extends MRT_RowData>(col: MRT_ColumnDef<T>): string | undefined {
  if (col.id) return String(col.id);
  if (col.accessorKey) return String(col.accessorKey);
  return undefined;
}

function isIdColumn<T extends MRT_RowData>(col: MRT_ColumnDef<T>): boolean {
  const id = getColumnId(col);
  if (!id) return false;
  if (id === "id" || id.endsWith(".id")) return true;
  return col.header === "Id";
}

export function buildColumnVisibility<T extends MRT_RowData>(
  columns: MRT_ColumnDef<T>[],
  isMobile: boolean,
  isTablet: boolean
): Record<string, boolean> {
  const visibility: Record<string, boolean> = {};

  columns.forEach((col) => {
    const id = getColumnId(col);
    if (!id) return;

    const meta = col.meta as TableColumnMeta | undefined;

    if (meta?.hideOnMobile && isMobile) {
      visibility[id] = false;
      return;
    }
    if (meta?.hideOnTablet && isTablet) {
      visibility[id] = false;
      return;
    }
    if (isMobile && isIdColumn(col)) {
      visibility[id] = false;
    }
  });

  return visibility;
}

export function buildColumnPinning<T extends MRT_RowData>(
  columns: MRT_ColumnDef<T>[],
  hasActions: boolean
): { left: string[]; right: string[] } {
  const left: string[] = [];

  columns.forEach((col) => {
    const id = getColumnId(col);
    if (!id) return;
    const meta = col.meta as TableColumnMeta | undefined;
    if (meta?.pinLeft) left.push(id);
  });

  if (left.length === 0) {
    const nameCol = columns.find(
      (c) =>
        getColumnId(c)?.includes("name") ||
        c.header === "Nome" ||
        c.header === "Cliente" ||
        c.header === "Nome do Cliente"
    );
    const nameId = nameCol ? getColumnId(nameCol) : undefined;
    if (nameId) left.push(nameId);
  }

  return {
    left,
    right: hasActions ? ["actions"] : [],
  };
}

/** Mesma cor das demais células — o MRT usa background.default nas colunas fixas por padrão */
export function createPinnedCellProps(
  theme: Theme,
  extra?: {
    head?: object;
    body?: object;
  }
) {
  const bg = theme.palette.background.paper;
  const hoverBg = theme.palette.action.hover;

  const pinnedSx = {
    backgroundColor: bg,
    backgroundImage: "none",
    boxShadow: "none",
    opacity: 1,
  };

  return {
    muiTableHeadCellProps: ({
      column,
    }: {
      column: { getIsPinned: () => false | "left" | "right" };
    }) => ({
      sx: {
        backgroundColor: bg,
        fontWeight: 600,
        whiteSpace: "nowrap",
        ...(column.getIsPinned() ? pinnedSx : {}),
        ...extra?.head,
      },
    }),
    muiTableBodyCellProps: ({
      column,
    }: {
      column: { getIsPinned: () => false | "left" | "right" };
    }) => ({
      sx: {
        backgroundColor: bg,
        ...(column.getIsPinned() ? pinnedSx : {}),
        ...extra?.body,
      },
    }),
    muiTableBodyRowProps: {
      sx: {
        "&:hover .MuiTableCell-root": {
          backgroundColor: hoverBg,
        },
      },
    },
  };
}

export function getTableContainerSx(
  theme: Theme,
  maxHeight?: string | number,
  compact?: boolean
) {
  return {
    className: "mrt-scroll-area",
    sx: {
      maxHeight: maxHeight || "none",
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
      borderRadius: 0,
      boxShadow: "none",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      ...(compact && {
        "& .MuiTableCell-root": {
          px: { xs: 1, sm: 1.25 },
          py: { xs: 0.75, sm: 1 },
          fontSize: { xs: "0.8rem", sm: "0.85rem" },
        },
      }),
    },
  };
}

export function useScrollFadeHint() {
  const [fade, setFade] = useState({ left: false, right: false });

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setFade({
      left: el.scrollLeft > 8,
      right: el.scrollLeft < maxScroll - 8,
    });
  }, []);

  const checkOverflow = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setFade({
      left: el.scrollLeft > 8,
      right: maxScroll > 8 && el.scrollLeft < maxScroll - 8,
    });
  }, []);

  return { fade, onScroll, checkOverflow };
}

export function useResponsiveTable<T extends MRT_RowData>(
  columns: MRT_ColumnDef<T>[],
  options?: { hasActions?: boolean; compact?: boolean }
) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const columnVisibility = useMemo(
    () => buildColumnVisibility(columns, isMobile, isTablet),
    [columns, isMobile, isTablet]
  );

  const columnPinning = useMemo(
    () => buildColumnPinning(columns, options?.hasActions ?? false),
    [columns, options?.hasActions]
  );

  const layoutMode: "grid-no-grow" | "semantic" = isMobile
    ? "grid-no-grow"
    : "semantic";

  return {
    isMobile,
    isTablet,
    columnVisibility,
    columnPinning,
    layoutMode,
    compact: options?.compact ?? isMobile,
    theme,
  };
}
