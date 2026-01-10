import { AuthContext } from "@/contexts/authContext";
import { useLayout } from "@/contexts/layoutContext";
import { useThemeContext } from "@/contexts/themeContext";
import { routes } from "@/routes/routes";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Toolbar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  drawerWidth: number;
  title?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, title }) => {
  const theme = useTheme();
  const { mobileOpen, toggleMobileOpen } = useLayout();
  const location = useLocation();
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext not found");
  const { handleLogout } = authContext;

  const { darkMode, toggleDarkMode } = useThemeContext();

  const handleClick = (path: string) => {
    navigate(path);
    if (mobileOpen) toggleMobileOpen();
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {title && (
        <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="img"
            src="/logo-natura.png"
            alt="Logo Natura"
            sx={{ height: 45, width: "auto", ml: 1, mt: 3.5 }}
          />
        </Toolbar>
      )}

      <List sx={{ flexGrow: 1, }}>
        {routes
          .filter((route) => route.sidebar !== false)
          .map((route) => {
            const selected =
              location.pathname === route.path ||
              (route.path !== "/" && location.pathname.startsWith(route.path));

            return (
              <ListItemButton
                key={route.path}
                onClick={() => handleClick(route.path)}
                sx={{
                  borderRadius: 4,
                  m: 1.25,
                  bgcolor: selected
                    ? theme.palette.action.hover
                    : "transparent",
                  "&:hover": { bgcolor: theme.palette.action.hover },
                  transition: "background-color 0.2s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    ml: 1,
                    color: selected
                      ? "primary.main"
                      : theme.palette.text.secondary,
                    transform: selected ? "scale(1.2)" : "scale(1)",
                    transition: "color 0.2s ease, transform 0.2s ease",
                  }}
                >
                  {route.icon}
                </ListItemIcon>
                <ListItemText
                  primary={route.name}
                  sx={{
                    ml: 0.5,
                    color: selected
                      ? "text.main"
                      : theme.palette.text.secondary,
                  }}
                />
              </ListItemButton>
            );
          })}

        <ListItemButton
          onClick={toggleDarkMode}
          sx={{
            borderRadius: 4,
            m: 1,
            "&:hover": { bgcolor: theme.palette.action.hover },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, ml: 1.5, color: "text.secondary" }}>
            {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
          </ListItemIcon>
          <ListItemText
            primary={darkMode ? "Modo Escuro" : "Modo Claro"}
            sx={{ ml: 0.5 }}
          />
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </ListItemButton>
      </List>

      <Box sx={{ mt: "auto" }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 4,
            m: 1,
            mb: 1.5,
            "&:hover": { bgcolor: theme.palette.action.hover },
            display: "flex",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          <ListItemText
            primary="Log-out"
            sx={{ textAlign: "center", flex: 1 }}
          />
          <ExitToAppIcon />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleMobileOpen}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: drawerWidth,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        PaperProps={{
          sx: {
            width: drawerWidth,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: "none",
            boxShadow: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
