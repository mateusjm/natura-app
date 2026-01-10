import { AuthProvider } from "@/contexts/authContext"; 
import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const drawerWidth = 270;

const Layout: React.FC = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const location = useLocation();
  const hideSidebarRoutes = ["/auth/login"];

  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {showSidebar && (
          <Sidebar drawerWidth={drawerWidth} title=" " />
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: "25px 30px 15px 15px",
            ml: showSidebar && isDesktop ? `${drawerWidth}px` : 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </AuthProvider>
  );
};

export default Layout;
