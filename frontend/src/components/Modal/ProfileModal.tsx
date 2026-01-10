import { AuthContext } from "@/contexts/authContext";
import { getUpdateUserErrorMessage } from "@/errors/auth/updateErrors";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import BaseModal from "./BaseModal";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
  const auth = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (open && auth?.user) {
      setUserData({
        name: auth.user.name || "",
        email: auth.user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [open, auth?.user]);

  const handleChange =
    (field: keyof typeof userData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSave = async () => {
    if (!auth?.user) return;

    if (userData.password !== userData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      setError(null);

      await auth.updateUser({
        name: userData.name,
        email: userData.email,
        ...(userData.password ? { password: userData.password } : {}),
      });

      auth.setUser((prev) =>
        prev ? { ...prev, name: userData.name, email: userData.email } : null
      );

      onClose();
    } catch (err: any) {
      console.error(err);
      setError(getUpdateUserErrorMessage(err.response?.status));
    }
  };

  return (
    <BaseModal open={open} onClose={onClose} width={450}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          textAlign="center"
          color="primary"
        >
          Meu Perfil
        </Typography>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <TextField
          label="Nome"
          fullWidth
          value={userData.name}
          onChange={handleChange("name")}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={userData.email}
          onChange={handleChange("email")}
        />
        <TextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={userData.password}
          onChange={handleChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirmar Senha"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          value={userData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button fullWidth variant="contained" size="large" onClick={handleSave}>
          Salvar
        </Button>
      </Box>
    </BaseModal>
  );
}
