import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import LayersIcon from "@mui/icons-material/Layers";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { SvgIconComponent } from "@mui/icons-material";

export interface BenefitItem {
  icon: SvgIconComponent;
  title: string;
  description: string;
}

export interface StepItem {
  step: number;
  title: string;
  description: string;
}

export interface FeatureBlock {
  icon: SvgIconComponent;
  title: string;
  items: string[];
}

export const landingNavLinks = [
  { id: "beneficios", label: "Benefícios" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "comecar", label: "Começar" },
];

export const landingHero = {
  headline: "Controle suas vendas e estoque em um só lugar.",
  subheadline:
    "Organize clientes, produtos e vendas com alertas operacionais e indicadores claros — feito para quem precisa de controle sem complexidade.",
};

export const landingHeroHighlights = [
  "Estoque e validade",
  "Vendas e prazos",
  "Clientes",
  "Indicadores",
];

export const landingFooter = {
  tagline:
    "Natura App é um sistema de gestão operacional para consultores, vendedores independentes e pequenos negócios de revenda que precisam centralizar vendas, clientes e estoque.",
  product: {
    title: "Produto",
    links: [
      { label: "Benefícios", href: "#beneficios" },
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Funcionalidades", href: "#funcionalidades" },
    ],
  },
  account: {
    title: "Conta",
    links: [
      { label: "Criar conta", to: "/auth/register" },
      { label: "Fazer login", to: "/auth/login" },
      { label: "Acessar painel", to: "/auth/login" },
    ],
  },
  modules: {
    title: "Módulos",
    items: ["Estoque", "Clientes", "Vendas", "Indicadores", "Alertas"],
  },
};

export const landingBenefits: BenefitItem[] = [
  {
    icon: LayersIcon,
    title: "Controle de estoque",
    description:
      "Registre entradas com quantidade, custo e validade. Saiba o valor total em estoque.",
  },
  {
    icon: GroupIcon,
    title: "Gestão de clientes",
    description:
      "Cadastre e consulte clientes de forma rápida, vinculando cada venda ao contato certo.",
  },
  {
    icon: AttachMoneyIcon,
    title: "Acompanhamento de vendas",
    description:
      "Registre vendas, acompanhe status e prazos de pagamento sem planilhas.",
  },
  {
    icon: NotificationsActiveIcon,
    title: "Alertas operacionais",
    description:
      "Vendas pendentes próximas do vencimento, vencidas e itens perto da validade.",
  },
  {
    icon: DashboardIcon,
    title: "Dashboard gerencial",
    description:
      "Lucro, valor bruto, gráfico de vendas e indicadores em um painel claro.",
  },
];

export const landingSteps: StepItem[] = [
  {
    step: 1,
    title: "Cadastre produtos",
    description: "Organize seu catálogo com preços e informações essenciais.",
  },
  {
    step: 2,
    title: "Controle estoque",
    description: "Entradas com validade e custo para saber o que você tem disponível.",
  },
  {
    step: 3,
    title: "Registre vendas",
    description: "Vincule clientes, itens e formas de pagamento em poucos passos.",
  },
  {
    step: 4,
    title: "Acompanhe resultados",
    description: "Use o dashboard para ver lucro, alertas e evolução das vendas.",
  },
];

export const landingFeatures: FeatureBlock[] = [
  {
    icon: LayersIcon,
    title: "Estoque",
    items: [
      "Entradas com quantidade e validade",
      "Valor total em estoque",
      "Alertas de itens próximos do vencimento",
    ],
  },
  {
    icon: GroupIcon,
    title: "Clientes",
    items: [
      "Cadastro simples",
      "Consulta rápida",
      "Vínculo direto com vendas",
    ],
  },
  {
    icon: AttachMoneyIcon,
    title: "Vendas",
    items: [
      "Registro de vendas e itens",
      "Status e prazos de pagamento",
      "Pendências quase vencendo e vencidas",
    ],
  },
  {
    icon: DashboardIcon,
    title: "Dashboard",
    items: [
      "Lucro e valor bruto por período",
      "Gráfico de vendas mensais",
      "Visão consolidada da operação",
    ],
  },
  {
    icon: NotificationsActiveIcon,
    title: "Alertas",
    items: [
      "Vendas pendentes",
      "Prazos vencidos",
      "Estoque com validade próxima",
    ],
  },
  {
    icon: ShoppingCartIcon,
    title: "Indicadores",
    items: [
      "Filtro por período",
      "Cards de resumo",
      "Foco em decisão do dia a dia",
    ],
  },
];

export const landingCta = {
  title: "Organize sua operação com clareza",
  subtitle:
    "Crie sua conta e comece a controlar vendas, clientes e estoque no mesmo painel.",
};
