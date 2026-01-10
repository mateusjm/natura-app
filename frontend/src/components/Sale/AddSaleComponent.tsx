import { useEffect } from "react";
import { Autocomplete, TextField, MenuItem, Grid, Box } from "@mui/material";
import clientService from "@/services/clientService";
import { useSale } from "@/contexts/saleContext";

export default function AddSaleComponent() {
  const {
    clients,
    setClients,
    selectedClient,
    setSelectedClient,
    paymentMethod,
    setPaymentMethod,
    status,
    setStatus,
    date,
    setDate,
    deadline,
    setDeadline,
  } = useSale();

  useEffect(() => {
    clientService.getAll().then(setClients).catch(console.error);
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        mt: 2,
        mb: 3,
        borderRadius: 5,
        boxShadow: "none",
        backgroundColor: "background.paper",
        border: "none"
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Autocomplete
            options={clients}
            value={selectedClient}
            getOptionLabel={(o) => o.name}
            onChange={(_, value) => setSelectedClient(value)}
            renderInput={(params) => <TextField {...params} label="Cliente" />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.25 }}>
          <TextField
            fullWidth
            select
            label="Forma de Pagamento"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as any)}
          >
            <MenuItem value="dinheiro">Dinheiro</MenuItem>
            <MenuItem value="pix">Pix</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 2.25 }}>
          <TextField
            fullWidth
            type="date"
            label="Data da Venda"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            inputProps={{
              max: new Date().toISOString().split("T")[0],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.25 }}>
          <TextField
            fullWidth
            type="date"
            label="Prazo de Pagamento"
            InputLabelProps={{ shrink: true }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2.25 }}>
          <TextField
            fullWidth
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <MenuItem value="pendente">Pendente</MenuItem>
            <MenuItem value="pago">Pago</MenuItem>
            <MenuItem value="cancelada">Cancelada</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}
