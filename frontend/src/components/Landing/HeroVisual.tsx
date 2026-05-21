import {
  getHeroCenterCircleSx,
  getHeroFloatingCardSx,
  getHeroOrbitIconSx,
  getHeroPulseGlowSx,
  PRIMARY,
} from "@/components/Landing/landingStyles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import LayersIcon from "@mui/icons-material/Layers";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const floatingCards = [
  {
    label: "Lucro no período",
    value: "R$ 11.230",
    icon: TrendingUpIcon,
    top: "8%",
    left: "5%",
    delay: 0,
  },
  {
    label: "Valor em estoque",
    value: "R$ 45.680",
    icon: LayersIcon,
    top: "42%",
    right: "0%",
    delay: 0.15,
  },
  {
    label: "Vendas pendentes",
    value: "4 alertas",
    icon: NotificationsActiveIcon,
    bottom: "12%",
    left: "12%",
    delay: 0.3,
  },
];

const orbitIcons = [
  { Icon: GroupIcon, angle: 0 },
  { Icon: AttachMoneyIcon, angle: 72 },
  { Icon: LayersIcon, angle: 144 },
  { Icon: NotificationsActiveIcon, angle: 216 },
  { Icon: TrendingUpIcon, angle: 288 },
];

export default function HeroVisual() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: 280, md: 380 },
        maxHeight: { md: "min(380px, 50vh)" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component={motion.div}
        animate={
          isDark
            ? { scale: [1, 1.04, 1], opacity: [0.5, 0.7, 0.5] }
            : undefined
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        sx={getHeroPulseGlowSx(theme)}
      />

      <Box
        component={motion.div}
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        sx={{
          position: "relative",
          width: { xs: 200, md: 260 },
          height: { xs: 200, md: 260 },
          borderRadius: "50%",
          border: "2px dashed",
          borderColor: isDark ? `${PRIMARY}44` : "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={getHeroCenterCircleSx(theme)}>
          <TrendingUpIcon sx={{ fontSize: { xs: 48, md: 64 }, color: "primary.main" }} />
        </Box>

        {orbitIcons.map(({ Icon, angle }, i) => {
          const rad = (angle * Math.PI) / 180;
          const r = 130;
          return (
            <Box
              key={i}
              component={motion.div}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${Math.cos(rad) * r}px), calc(-50% + ${Math.sin(rad) * r}px))`,
              }}
            >
              <Box sx={getHeroOrbitIconSx(theme)}>
                <Icon sx={{ color: "primary.main", fontSize: 22 }} />
              </Box>
            </Box>
          );
        })}
      </Box>

      {floatingCards.map((card) => {
        const Icon = card.icon;
        return (
          <Box
            key={card.label}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + card.delay, duration: 0.5 }}
            whileHover={isDark ? { scale: 1.03 } : undefined}
            sx={{
              position: "absolute",
              top: card.top,
              left: card.left,
              right: card.right,
              bottom: card.bottom,
              ...getHeroFloatingCardSx(theme),
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Icon sx={{ fontSize: 18, color: "primary.main" }} />
              <Typography variant="caption" color="text.secondary">
                {card.label}
              </Typography>
            </Box>
            <Typography variant="subtitle2" fontWeight={700} color="primary.main">
              {card.value}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
