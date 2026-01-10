import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

export type PeriodOption = "1m" | "3m" | "6m" | "1y";

interface PeriodContextProps {
  period: PeriodOption;
  setPeriod: (p: PeriodOption) => void;
}

const PeriodContext = createContext<PeriodContextProps | undefined>(undefined);

const STORAGE_KEY = "selected_period";

export const PeriodProvider = ({ children }: { children: ReactNode }) => {
  const [period, setPeriod] = useState<PeriodOption>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "1m" || saved === "3m" || saved === "6m" || saved === "1y") {
      return saved;
    }
    return "1m";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, period);
  }, [period]);

  return (
    <PeriodContext.Provider value={{ period, setPeriod }}>
      {children}
    </PeriodContext.Provider>
  );
};

export const usePeriod = () => {
  const context = useContext(PeriodContext);
  if (!context)
    throw new Error("usePeriod deve ser usado dentro de PeriodProvider");
  return context;
};
