import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface LayoutContextType {
  mobileOpen: boolean;
  toggleMobileOpen: () => void;
}

const LayoutContext = createContext<LayoutContextType>({
  mobileOpen: false,
  toggleMobileOpen: () => {},
});

export const useLayout = () => useContext(LayoutContext);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileOpen = () => setMobileOpen(!mobileOpen);

  return (
    <LayoutContext.Provider value={{ mobileOpen, toggleMobileOpen }}>
      {children}
    </LayoutContext.Provider>
  );
};
