import DashboardCard from "@/components/Dashboard/DashboardCard";
import ExpiringStockCard from "@/components/Dashboard/ExpiringStockCard";
import MonthlySalesChart from "@/components/Dashboard/MonthlySalesChart";
import PeriodSelector from "@/components/Dashboard/PeriodSelector";
import SalesCard from "@/components/Dashboard/SalesCard";
import PageTitle from "@/components/PageTitle/PageTitle";
import { usePeriod } from "@/contexts/periodContext";
import productItemService from "@/services/productItemService";
import saleService from "@/services/saleService";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import ProfileModal from "@/components/Modal/ProfileModal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

function HomePage() {
  const { period } = usePeriod();
  const theme = useTheme();

  const [totalSalesAmount, setTotalSalesAmount] = useState<number | null>(null);
  const [totalSalesProfit, setTotalSalesProfit] = useState<number | null>(null);
  const [totalStockValue, setTotalStockValue] = useState<number | null>(null);

  const [profileOpen, setProfileOpen] = useState(false);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { totalSalesAmount } = await saleService.getTotalSalesAmount(
          period
        );
        const { totalSalesProfit } = await saleService.getTotalSalesProfit(
          period
        );
        const totalStockValue = await productItemService.getTotalStockValue(
          period
        );

        setTotalSalesAmount(totalSalesAmount);
        setTotalSalesProfit(totalSalesProfit);
        setTotalStockValue(totalStockValue);
      } catch (error) {
        console.log("Erro ao carregar estatísticas", error);
      }
    };

    loadDashboardData();
  }, [period]);

  const ValueTypography = ({ children }: { children: React.ReactNode }) => (
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ color: theme.palette.mode === "dark" ? "#bbb" : "#EC6B20" }}
    >
      {children}
    </Typography>
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <PageTitle title="Home" />

        <IconButton color="primary" onClick={() => setProfileOpen(true)}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard title="Lucro Total de Vendas (R$)">
            <ValueTypography>
              {totalSalesProfit !== null
                ? formatCurrency(totalSalesProfit)
                : "..."}
            </ValueTypography>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard title="Valor Bruto de Vendas (R$)">
            <ValueTypography>
              {totalSalesAmount !== null
                ? formatCurrency(totalSalesAmount)
                : "..."}
            </ValueTypography>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard title="Valor em Estoque (R$)">
            <ValueTypography>
              {totalStockValue !== null
                ? formatCurrency(totalStockValue)
                : "..."}
            </ValueTypography>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <DashboardCard
            title={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                Gráfico de Vendas
                <PeriodSelector />
              </Box>
            }
          >
            <MonthlySalesChart />
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard title="Vendas Pendentes Quase Vencendo!">
            <SalesCard fetchSales={() => saleService.getPendingSales(10)} />
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardCard title="Estoque Próximos da Validade!">
            <ExpiringStockCard />
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardCard title="Vendas Pendentes Vencidas!">
            <SalesCard
              fetchSales={() => saleService.getPendingOverdueSales(10)}
            />
          </DashboardCard>
        </Grid>
      </Grid>
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </Box>
  );
}

export default HomePage;
