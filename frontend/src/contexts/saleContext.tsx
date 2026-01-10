import { createContext, useContext, useState, useCallback } from "react";
import type { Client } from "@/types/client";
import type { Sale } from "@/types/sale";

interface SaleContextType {
  clients: Client[];
  setClients: (value: Client[]) => void;

  selectedClient: Client | null;
  setSelectedClient: (value: Client | null) => void;

  paymentMethod: Sale["payment_method"];
  setPaymentMethod: (value: Sale["payment_method"]) => void;

  status: Sale["status"];
  setStatus: (value: Sale["status"]) => void;

  date: string;
  setDate: (value: string) => void;

  deadline: string;
  setDeadline: (value: string) => void;

  saleItems: any[];
  setSaleItems: (value: any[]) => void;

  setSaleData: (data: {
    selectedClient: Client | null;
    paymentMethod: Sale["payment_method"];
    status: Sale["status"];
    date: string;
    deadline: string;
    saleItems: any[];
  }) => void;
}

const SaleContext = createContext<SaleContextType | null>(null);

export function SaleProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<Sale["payment_method"]>("dinheiro");
  const [status, setStatus] = useState<Sale["status"]>("pendente");
  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [saleItems, setSaleItems] = useState<any[]>([]);

  const setSaleData = useCallback(
    (data: {
      selectedClient: Client | null;
      paymentMethod: Sale["payment_method"];
      status: Sale["status"];
      date: string;
      deadline: string;
      saleItems: any[];
    }) => {
      setSelectedClient(data.selectedClient);
      setPaymentMethod(data.paymentMethod);
      setStatus(data.status);
      setDate(data.date);
      setDeadline(data.deadline);
      setSaleItems(data.saleItems);
    },
    []
  );

  return (
    <SaleContext.Provider
      value={{
        clients,
        setClients,
        selectedClient,
        setSelectedClient,
        paymentMethod,
        setPaymentMethod,
        status,
        setStatus,
        date,
        setDate,
        deadline,
        setDeadline,
        saleItems,
        setSaleItems,
        setSaleData,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
}

export function useSale() {
  const ctx = useContext(SaleContext);
  if (!ctx) throw new Error("useSale must be used inside SaleProvider");
  return ctx;
}
