import { usePeriod } from "@/contexts/periodContext";
import saleService from "@/services/saleService";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyStat {
  month: string;
  totalSalesAmount: number;
  totalSalesProfit: number;
}

export default function MonthlySalesChart() {
  const theme = useTheme();
  const { period } = usePeriod();
  const [data, setData] = useState<MonthlyStat[]>([]);

  useEffect(() => {
    const loadMonthlyStats = async () => {
      try {
        const stats = await saleService.getMonthlyStats(period);

        const formattedData = stats.map((item: MonthlyStat) => {
          const [year, month] = item.month.split("-");
          return {
            ...item,
            month: `${month}/${year}`,
          };
        });

        setData(formattedData);
      } catch (error) {
        console.error("Erro ao carregar estatísticas mensais:", error);
        setData([]);
      }
    };

    loadMonthlyStats();
  }, [period]);

  if (data.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 310,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: theme.palette.text.secondary }}
        >
          Você ainda não possui vendas!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: 310 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          barGap={6}
          barCategoryGap="25%"
        >
          <CartesianGrid stroke={theme.palette.divider} strokeDasharray="4 4" />

          <XAxis
            dataKey="month"
            tick={{ fill: theme.palette.text.secondary }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: theme.palette.text.secondary }}
            tickLine={false}
            width={80}
          />

          <Tooltip
            formatter={(value: number) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }
            contentStyle={{
              borderRadius: 8,
              boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
              border: "none",
            }}
          />

          <Legend
            wrapperStyle={{ paddingTop: 10 }}
            formatter={(value, entry) => (
              <span style={{ color: entry.color }}>{value}</span>
            )}
          />

          <Bar
            dataKey="totalSalesProfit"
            name="Lucro"
            radius={[10, 10, 0, 0]}
            fill={theme.palette.primary.main}
          />
          <Bar
            dataKey="totalSalesAmount"
            name="Valor Bruto"
            radius={[10, 10, 0, 0]}
            fill={theme.palette.text.secondary}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
