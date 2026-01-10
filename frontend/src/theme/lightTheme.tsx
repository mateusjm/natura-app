import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#EC6B20" },
    secondary: { main: "#555" },
    background: { default: "#F7F8FA", paper: "#FFFFFF" },
    text: { primary: "#1a1a1a", secondary: "#555" },
    action: { selected: "#333", hover: "#FFFFFF" },
  },
  typography: {
    fontFamily: "'Folio', 'Inter', sans-serif", 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: "none" },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
  },
});

export default lightTheme;
