import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const ThemeProviderCustom = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true"; 
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", (!prev).toString());
      return !prev;
    });
  };

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) setDarkMode(saved === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
