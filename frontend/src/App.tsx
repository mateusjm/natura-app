import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import lightTheme from "@/theme/lightTheme";
import darkTheme from "@/theme/darkTheme";
import { useThemeContext } from "@/contexts/themeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout/Layout";
import { ProtectedRoute, PublicRoute } from "@/components/Auth/ProtectedRoute";
import { routes } from "@/routes/routes";
import { LayoutProvider } from "@/contexts/layoutContext";

export default function App() {
  const { darkMode } = useThemeContext();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <LayoutProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {routes.map((route) => {
                const Component = route.component;
                const element = <Component />;

                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      route.public ? (
                        <PublicRoute>{element}</PublicRoute>
                      ) : (
                        <ProtectedRoute>{element}</ProtectedRoute>
                      )
                    }
                  />
                );
              })}
            </Route>
          </Routes>
        </BrowserRouter>
      </LayoutProvider>
    </ThemeProvider>
  );
}
