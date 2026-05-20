import Loading from "@/components/Loading/Loading";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not found");

  const location = useLocation();

  if (auth.authLoading) return <Loading />;
  if (!auth.isLogged) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not found");

  if (auth.authLoading) return <Loading />;
  if (auth.isLogged) return <Navigate to="/" replace />;

  return children;
}
