import HeroVisual from "@/components/Landing/HeroVisual";
import { FadeIn, ScaleIn } from "@/components/Landing/LandingMotion";
import { landingHero, landingHeroHighlights } from "@/components/Landing/landingContent";
import { getHeroGradientBg } from "@/components/Landing/landingStyles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HeroSection() {
  return (
    <Box
      component="section"
      id="hero"
      sx={(theme) => ({
        ...getHeroGradientBg(theme),
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
      })}
    >
      <Container
        maxWidth="lg"
        sx={{
          width: "100%",
          py: { xs: 10, md: 4 },
        }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <FadeIn>
              <Chip
                label="Gestão para consultores e revenda"
                color="primary"
                variant="outlined"
                size="small"
                sx={{ mb: 2, fontWeight: 600, borderRadius: 2 }}
              />
              <Typography
                variant="h2"
                component="h1"
                fontWeight={800}
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  mb: 2,
                }}
              >
                {landingHero.headline}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, maxWidth: 500, lineHeight: 1.75, fontSize: "1.1rem" }}
              >
                {landingHero.subheadline}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 3 }}>
                <Button
                  component={RouterLink}
                  to="/auth/register"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 3,
                    py: 1.25,
                    boxShadow: "0 8px 24px rgba(236, 107, 32, 0.35)",
                    "&:hover": { boxShadow: "0 12px 32px rgba(236, 107, 32, 0.4)" },
                  }}
                >
                  Começar agora
                </Button>
                <Button
                  component={RouterLink}
                  to="/auth/login"
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ px: 3, py: 1.25 }}
                >
                  Acessar sistema
                </Button>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {landingHeroHighlights.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
            </FadeIn>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ScaleIn delay={0.15}>
              <HeroVisual />
            </ScaleIn>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
