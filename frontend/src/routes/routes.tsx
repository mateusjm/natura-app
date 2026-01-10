import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import LayersIcon from "@mui/icons-material/Layers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import HomePage from "@/pages/home/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import ClientPage from "@/pages/client/ClientPage";
import ProductItemPage from "@/pages/product-item/ProductItemPage";
import ProductPage from "@/pages/product/ProductPage";
import AddSalePage from "@/pages/sale/AddSalePage";
import SalePage from "@/pages/sale/SalePage";

import { PeriodProvider } from "@/contexts/periodContext";
import { SaleProvider } from "@/contexts/saleContext";

export interface RouteType {
  path: string;
  name: string;
  icon?: JSX.Element;
  component: React.FC | (() => JSX.Element);
  sidebar?: boolean;
}

export const routes: RouteType[] = [
  {
    path: "/",
    name: "Home",
    icon: <HomeIcon />,
    component: () => (
      <PeriodProvider>
        <HomePage />
      </PeriodProvider>
    ),
    sidebar: true,
  },
  {
    path: "/vendas",
    name: "Vendas",
    icon: <AttachMoneyIcon />,
    component: SalePage,
    sidebar: true,
  },
  {
    path: "/vendas/adicionar/:id?",
    name: "Adicionar Venda",
    sidebar: false,
    component: () => (
      <SaleProvider>
        <AddSalePage />
      </SaleProvider>
    ),
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: <GroupIcon />,
    component: ClientPage,
    sidebar: true,
  },
  {
    path: "/produtos",
    name: "Produtos",
    icon: <ShoppingCartIcon />,
    component: ProductPage,
    sidebar: true,
  },
  {
    path: "/estoque",
    name: "Estoque",
    icon: <LayersIcon />,
    component: ProductItemPage,
    sidebar: true,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: LoginPage,
    sidebar: false,
  },
];
