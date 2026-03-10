import { Box } from "@mui/material";
import { DataTableSale } from "@/components/Table/DataTableSale";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pendingSalesColumns } from "@/tableConfig/home/pendingSalesColumns";
import type { Sale } from "@/types/sale";

interface SalesCardProps {
  fetchSales: () => Promise<Sale[]>; 
  maxRows?: number;
  maxHeight?: string | number;
}

export default function SalesCard({
  fetchSales,
  maxHeight = "310px",
}: SalesCardProps) {
  const [sales, setSales] = useState<Sale[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSales = async () => {
      try {
        const data = await fetchSales();
        setSales(data);
      } catch (error) {
        console.error("Erro ao carregar vendas:", error);
      }
    };

    loadSales();
  }, [fetchSales]);

  return (
    <Box
      sx={{
        width: "100%",
        height: maxHeight,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DataTableSale
        data={sales}
        columns={pendingSalesColumns} 
        maxHeight="100%"
        onRowClick={(row) => navigate(`/vendas/adicionar/${row.id}`)}
      />
    </Box>
  );
}
