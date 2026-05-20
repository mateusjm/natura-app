import { authService } from "@/services/authService";
import { AUTH_UNAUTHORIZED_EVENT } from "@/utils/authSession";
import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { LoginFields, RegisterFields } from "@/types/auth";

interface AuthContextType {
  isLogged: boolean;
  authLoading: boolean;
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
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  async function getUserInfo() {
    try {
      const { data } = await authService.me();
      afterConfirmLogin(data);
      return true;
    } catch {
      setIsLogged(false);
      setUser(null);
      localStorage.removeItem("access-token");
      return false;
    } finally {
      setAuthLoading(false);
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
    getUserInfo();
  }, []);

  useEffect(() => {
    function onUnauthorized() {
      setIsLogged(false);
      setUser(null);
      navigate("/auth/login", { replace: true });
    }

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized);
    return () =>
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, onUnauthorized);
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        authLoading,
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
