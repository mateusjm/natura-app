import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#EC6B20" },
    secondary: { main: "#bbb" },
    background: { default: "#090A0D", paper: "#24252A" },
    text: { primary: "#ffffff", secondary: "#bbb" },
    action: { selected: "#333", hover: "#24252A" },
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

export default darkTheme;
