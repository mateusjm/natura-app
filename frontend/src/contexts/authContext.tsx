import { authService } from "@/services/authService";
import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import type { LoginFields, RegisterFields } from "@/types/auth";

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (val: boolean) => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogin: (loginFields: LoginFields) => Promise<any>;
  handleRegister: (registerFields: RegisterFields) => Promise<any>;
  handleLogout: () => void;
  getUserInfo: () => Promise<boolean | void>;
  updateUser: (data: Partial<RegisterFields>) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface User {
  id: string;
  email: string;
  name?: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  async function getUserInfo() {
    try {
      const { data } = await authService.me();
      afterConfirmLogin(data);
      return true;
    } catch (e) {
      console.log(e);
    }
  }

  async function updateUser(data: Partial<RegisterFields>) {
    return await authService.update(data);
  }

  async function handleLogin(loginFields: LoginFields) {
    const response = await authService.login(loginFields);
    const { data } = await authService.me();
    afterConfirmLogin(data);

    navigate("/");
    return response;
  }

  async function handleRegister(registerFields: RegisterFields) {
    const response = await authService.register(registerFields);
    return response;
  }

  function afterConfirmLogin(data: any) {
    setIsLogged(true);
    setUser(data);
  }

  function handleLogout() {
    setIsLogged(false);
    setUser(null);
    localStorage.removeItem("access-token");
    navigate("/auth/login");
  }

  useEffect(() => {
    if (!isLogged) {
      getUserInfo();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setIsLogged,
        getUserInfo,
        user,
        setUser,
        handleLogin,
        handleRegister,
        handleLogout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
