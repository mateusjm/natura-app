import HeroMacbookMockup from "@/components/Landing/HeroMacbookMockup";
import { FadeIn } from "@/components/Landing/LandingMotion";
import {
  landingHero,
  landingHeroFeatures,
} from "@/components/Landing/landingContent";
import {
  getHeroGradientBg,
  getPrimaryButtonShadow,
  PRIMARY,
} from "@/components/Landing/landingStyles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function scrollToBenefits() {
  const el = document.getElementById("beneficios");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HeroSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="section"
      id="hero"
      sx={(theme) => ({
        ...getHeroGradientBg(theme),
        minHeight: { xs: "auto", md: "92vh" },
        width: "100%",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
      })}
    >
      {/* Blur decorativo no fundo */}
      {isDark && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "12%",
              right: { xs: "-20%", md: "8%" },
              width: { xs: 280, md: 420 },
              height: { xs: 280, md: 420 },
              borderRadius: "50%",
              background: `radial-gradient(circle, ${PRIMARY}22 0%, transparent 70%)`,
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "10%",
              left: "-5%",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${PRIMARY}10 0%, transparent 70%)`,
              filter: "blur(32px)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          pt: { xs: 13, md: 7 },
          pb: { xs: 6, md: 6 },
          px: { xs: 2.5, sm: 3, md: 3 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 5 }}
          alignItems="center"
          justifyContent="center"
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <FadeIn>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start" },
                  textAlign: { xs: "center", md: "left" },
                  width: "100%",
                  maxWidth: { xs: 520, md: "none" },
                  mx: { xs: "auto", md: 0 },
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  fontWeight={800}
                  sx={{
                    width: "100%",
                    fontSize: { xs: "2rem", sm: "2.35rem", md: "2.85rem" },
                    lineHeight: { xs: 1.2, md: 1.08 },
                    letterSpacing: "-0.03em",
                    mb: 2,
                    textWrap: "balance",
                  }}
                >
                  {landingHero.headlineBefore}{" "}
                  <Box component="span" sx={{ color: "primary.main" }}>
                    {landingHero.headlineHighlight}
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    width: "100%",
                    mb: 3,
                    maxWidth: { xs: 480, md: 500 },
                    lineHeight: 1.75,
                    fontSize: { xs: "1rem", md: "1.08rem" },
                    textWrap: "pretty",
                  }}
                >
                  {landingHero.subheadline}
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    listStyle: "none",
                    m: 0,
                    p: 0,
                    mb: 3.5,
                    width: "100%",
                    maxWidth: 440,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {landingHeroFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <Box
                        component="li"
                        key={feature.title}
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          alignItems: "flex-start",
                          textAlign: { xs: "left", md: "left" },
                        }}
                      >
                        <Box
                          sx={{
                            flexShrink: 0,
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: isDark
                              ? "rgba(236, 107, 32, 0.12)"
                              : "action.hover",
                            border: "1px solid",
                            borderColor: isDark
                              ? "rgba(236, 107, 32, 0.25)"
                              : "divider",
                          }}
                        >
                          <Icon sx={{ fontSize: 20, color: "primary.main" }} />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            fontWeight={700}
                            sx={{ mb: 0.25, lineHeight: 1.3 }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ lineHeight: 1.55, fontSize: "0.9rem" }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 1.5,
                    alignItems: { xs: "stretch", sm: "center" },
                    width: "100%",
                    maxWidth: { xs: 360, sm: "none" },
                    justifyContent: { xs: "stretch", md: "flex-start" },
                    "& .MuiButton-root": {
                      width: { xs: "100%", sm: "auto" },
                      minHeight: 48,
                    },
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/auth/register"
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                    endIcon={<ArrowForwardIcon />}
                    sx={(theme) => ({
                      px: 3,
                      py: 1.25,
                      ...getPrimaryButtonShadow(theme),
                    })}
                  >
                    Começar agora
                  </Button>
                  <Button
                    onClick={scrollToBenefits}
                    variant="text"
                    color="inherit"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      color: "text.secondary",
                      fontWeight: 500,
                      "&:hover": {
                        color: "primary.main",
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    Saiba mais
                  </Button>
                </Box>
              </Box>
            </FadeIn>
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              width: "100%",
              pt: { xs: 0, md: 2 },
            }}
          >
            <FadeIn
              delay={0.15}
              sx={{
                width: "100%",
                maxWidth: "none",
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              <HeroMacbookMockup />
            </FadeIn>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
