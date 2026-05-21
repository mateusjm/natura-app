import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

export const PRIMARY = "#EC6B20";

export function getPrimaryButtonShadow(theme: Theme): SystemStyleObject<Theme> {
  if (theme.palette.mode !== "dark") {
    return { boxShadow: "none" };
  }
  return {
    boxShadow: "0 4px 14px rgba(236, 107, 32, 0.35)",
    "&:hover": {
      boxShadow: "0 6px 20px rgba(236, 107, 32, 0.4)",
    },
  };
}

export function getHeaderScrollShadow(theme: Theme, scrolled: boolean) {
  if (!scrolled) return "none";
  return theme.palette.mode === "dark"
    ? "0 4px 24px rgba(0, 0, 0, 0.35)"
    : "none";
}

export const landingNavButtonSx: SystemStyleObject<Theme> = {
  color: "text.primary",
  fontWeight: 500,
  fontSize: "0.95rem",
  "&:hover": {
    color: "primary.main",
    bgcolor: (theme) =>
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(0, 0, 0, 0.05)",
  },
};

export const landingSection: SystemStyleObject<Theme> = {
  py: { xs: 8, md: 11 },
  px: { xs: 0, md: 1 },
  position: "relative",
  overflow: "hidden",
};

/** Seções com pouco conteúdo — padding proporcional ao bloco */
export const landingSectionCompact: SystemStyleObject<Theme> = {
  py: { xs: 5, md: 7 },
  px: { xs: 0, md: 1 },
  position: "relative",
  overflow: "hidden",
};

export function getGlassHeader(theme: Theme): SystemStyleObject<Theme> {
  return {
    backdropFilter: "blur(12px)",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(33, 33, 33, 0.85)"
        : "rgba(255, 255, 255, 0.88)",
    borderBottom: "1px solid",
    borderColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.06)",
    color: "text.primary",
  };
}

export function getLandingCard(theme: Theme): SystemStyleObject<Theme> {
  const isDark = theme.palette.mode === "dark";
  return {
    height: "100%",
    p: 3,
    borderRadius: 4,
    bgcolor: "background.paper",
    border: "1px solid",
    borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
    boxShadow: "none",
    transition: "border-color 0.25s ease, transform 0.25s ease",
    "&:hover": {
      borderColor: `${PRIMARY}55`,
      transform: isDark ? "translateY(-2px)" : "none",
      boxShadow: isDark ? `0 12px 40px rgba(236, 107, 32, 0.12)` : "none",
    },
  };
}

export const sectionEyebrow: SystemStyleObject<Theme> = {
  display: "inline-block",
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "primary.main",
  mb: 1,
};

export const sectionTitle: SystemStyleObject<Theme> = {
  fontWeight: 800,
  fontSize: { xs: "1.75rem", md: "2.25rem" },
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
};

export function getHeroGradientBg(theme: Theme): SystemStyleObject<Theme> {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "relative",
    overflow: "hidden",
    bgcolor: "background.default",
    background: isDark
      ? `radial-gradient(ellipse 80% 60% at 70% 20%, rgba(236,107,32,0.18) 0%, transparent 55%),
         radial-gradient(ellipse 50% 40% at 10% 80%, rgba(236,107,32,0.08) 0%, transparent 50%),
         ${theme.palette.background.default}`
      : "none",
  };
}

export function getCtaGradientBox(theme: Theme): SystemStyleObject<Theme> {
  const isDark = theme.palette.mode === "dark";
  return {
    borderRadius: 4,
    p: { xs: 4, md: 5 },
    textAlign: "center",
    boxShadow: "none",
    ...(isDark
      ? {
          background: `linear-gradient(135deg, rgba(236,107,32,0.25) 0%, rgba(65,65,65,0.9) 100%)`,
          border: "1px solid",
          borderColor: `${PRIMARY}33`,
        }
      : {
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderTop: `3px solid ${PRIMARY}`,
        }),
  };
}

export function getHeroFloatingCardSx(theme: Theme): SystemStyleObject<Theme> {
  const isDark = theme.palette.mode === "dark";
  return {
    p: 1.5,
    borderRadius: 3,
    bgcolor: "background.paper",
    border: "1px solid",
    borderColor: isDark ? `${PRIMARY}33` : "divider",
    boxShadow: "none",
    minWidth: 140,
  };
}

export function getHeroOrbitIconSx(theme: Theme): SystemStyleObject<Theme> {
  const isDark = theme.palette.mode === "dark";
  return {
    width: 44,
    height: 44,
    borderRadius: 3,
    bgcolor: "background.paper",
    border: "1px solid",
    borderColor: isDark ? `${PRIMARY}44` : "divider",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "none",
  };
}

export function getHeroCenterCircleSx(theme: Theme): SystemStyleObject<Theme> {
  const isDark = theme.palette.mode === "dark";
  return {
    width: { xs: 120, md: 150 },
    height: { xs: 120, md: 150 },
    borderRadius: "50%",
    bgcolor: "background.paper",
    border: "2px solid",
    borderColor: isDark ? `${PRIMARY}55` : "divider",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "none",
  };
}

export function getHeroPulseGlowSx(theme: Theme): SystemStyleObject<Theme> {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "absolute",
    width: { xs: 220, md: 280 },
    height: { xs: 220, md: 280 },
    borderRadius: "50%",
    display: isDark ? "block" : "none",
    background: `radial-gradient(circle, ${PRIMARY}35 0%, transparent 70%)`,
  };
}
