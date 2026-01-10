import { DataTableSale } from "@/components/Table/DataTableSale";
import productItemService from "@/services/productItemService";
import { expiringStockColumns } from "@/tableConfig/home/expiringStockColumns";
import type { ProductItem } from "@/types/productItem";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function ExpiringStockCard() {
  const [expiringItems, setExpiringItems] = useState<ProductItem[]>([]);

  useEffect(() => {
    const loadExpiringItems = async () => {
      try {
        const data = await productItemService.getExpiringItems();
        setExpiringItems(data);
      } catch (error) {
        console.error(
          "Erro ao carregar produtos próximos do vencimento:",
          error
        );
      }
    };

    loadExpiringItems();
  }, []);

  console.log(expiringItems);

  return (
    <Box
      sx={{
        width: "100%",
        height: "310px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DataTableSale
        data={expiringItems}
        columns={expiringStockColumns}
        maxHeight="100%"
      />
    </Box>
  );
}
