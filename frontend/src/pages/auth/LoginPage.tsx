import { AuthContext } from "@/contexts/authContext";
import { getAuthErrorMessage } from "@/errors/auth/messages";
import type { LoginFields } from "@/types/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";

export default function Login() {
  const [form, setForm] = useState<LoginFields>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext not found");

  const { handleLogin } = authContext;

  const handleChange =
    (field: keyof LoginFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await handleLogin(form);
    } catch (err: any) {
      console.error(err);
      setError(getAuthErrorMessage(err.response?.status));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
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
          Login
        </Typography>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

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
                <IconButton onClick={toggleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Box>
    </Box>
  );
}
