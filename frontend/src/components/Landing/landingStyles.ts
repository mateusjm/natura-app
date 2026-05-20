import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

export const PRIMARY = "#EC6B20";

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
  };
}

export function getLandingCard(theme: Theme): SystemStyleObject<Theme> {
  return {
    height: "100%",
    p: 3,
    borderRadius: 4,
    bgcolor: "background.paper",
    border: "1px solid",
    borderColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.06)",
    transition:
      "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
    "&:hover": {
      borderColor: `${PRIMARY}55`,
      boxShadow:
        theme.palette.mode === "dark"
          ? `0 12px 40px rgba(236, 107, 32, 0.12)`
          : `0 12px 40px rgba(236, 107, 32, 0.15)`,
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
  return {
    position: "relative",
    overflow: "hidden",
    background:
      theme.palette.mode === "dark"
        ? `radial-gradient(ellipse 80% 60% at 70% 20%, rgba(236,107,32,0.18) 0%, transparent 55%),
           radial-gradient(ellipse 50% 40% at 10% 80%, rgba(236,107,32,0.08) 0%, transparent 50%),
           ${theme.palette.background.default}`
        : `radial-gradient(ellipse 80% 60% at 70% 20%, rgba(236,107,32,0.12) 0%, transparent 55%),
           radial-gradient(ellipse 50% 40% at 10% 80%, rgba(236,107,32,0.06) 0%, transparent 50%),
           ${theme.palette.background.default}`,
  };
}

export function getCtaGradientBox(theme: Theme): SystemStyleObject<Theme> {
  return {
    borderRadius: 5,
    p: { xs: 4, md: 5 },
    textAlign: "center",
    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(135deg, rgba(236,107,32,0.25) 0%, rgba(65,65,65,0.9) 100%)`
        : `linear-gradient(135deg, rgba(236,107,32,0.14) 0%, #fff 60%)`,
    border: "1px solid",
    borderColor: `${PRIMARY}33`,
  };
}
