import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#EC6B20" },
    secondary: { main: "#bbb" },
    background: { default: "#212121", paper: "#414141" },
    text: { primary: "#ffffff", secondary: "#bbb" },
    action: { selected: "#333", hover: "#414141" },
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
