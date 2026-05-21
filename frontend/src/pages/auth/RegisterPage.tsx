import AuthBackLink from "@/components/Auth/AuthBackLink";
import { AuthContext } from "@/contexts/authContext";
import type { RegisterFields } from "@/types/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterFields>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext not found");

  const { handleRegister } = authContext;

  const handleChange =
    (field: keyof RegisterFields) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const onSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await handleRegister(form);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response
        ?.status;
      if (status === 409) {
        setError("E-mail já cadastrado");
      } else {
        setError("Não foi possível criar a conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        px: 2,
      }}
    >
      <AuthBackLink />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "90%",
          maxWidth: 450,
          padding: 5,
          borderRadius: 5,
          boxShadow: 3,
          backgroundColor: "background.paper",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h4" align="center" mb={2}>
          Criar conta
        </Typography>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <TextField
          label="Nome"
          value={form.name}
          onChange={handleChange("name")}
          fullWidth
        />

        <TextField
          label="E-mail"
          value={form.email}
          onChange={handleChange("email")}
          fullWidth
        />

        <TextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange("password")}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((p) => !p)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirmar senha"
          type={showConfirmPassword ? "text" : "password"}
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ mt: 1 }}
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Cadastrar"
          )}
        </Button>

        <Typography variant="body2" align="center" color="text.secondary">
          Já tem conta?{" "}
          <Link component={RouterLink} to="/auth/login" color="primary">
            Fazer login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
