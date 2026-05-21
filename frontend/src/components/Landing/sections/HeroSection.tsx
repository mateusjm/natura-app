import HeroVisual from "@/components/Landing/HeroVisual";
import { FadeIn, ScaleIn } from "@/components/Landing/LandingMotion";
import { landingHero, landingHeroHighlights } from "@/components/Landing/landingContent";
import {
  getHeroGradientBg,
  getPrimaryButtonShadow,
} from "@/components/Landing/landingStyles";
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
          pt: { xs: 11, md: 4 },
          pb: { xs: 6, md: 4 },
          px: { xs: 2.5, sm: 3, md: 3 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, md: 6 }}
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
                <Chip
                  label="Gestão para consultores e revenda"
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    borderRadius: 2,
                    alignSelf: { xs: "center", md: "flex-start" },
                    maxWidth: "100%",
                    height: "auto",
                    "& .MuiChip-label": {
                      whiteSpace: "normal",
                      textAlign: "center",
                      py: 0.75,
                      px: 1,
                      lineHeight: 1.35,
                    },
                  }}
                />
                <Typography
                  variant="h2"
                  component="h1"
                  fontWeight={800}
                  sx={{
                    width: "100%",
                    fontSize: { xs: "2rem", sm: "2.25rem", md: "3rem" },
                    lineHeight: { xs: 1.2, md: 1.1 },
                    letterSpacing: "-0.03em",
                    mb: 2,
                    textWrap: "balance",
                  }}
                >
                  {landingHero.headline}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    width: "100%",
                    mb: 3,
                    maxWidth: { xs: 480, md: 500 },
                    lineHeight: 1.75,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    textWrap: "pretty",
                  }}
                >
                  {landingHero.subheadline}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 1.5,
                    mb: 3,
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

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    width: "100%",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
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
              </Box>
            </FadeIn>
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              pt: { xs: 1, md: 0 },
            }}
          >
            <ScaleIn delay={0.15} sx={{ width: "100%", maxWidth: { xs: 400, md: "none" } }}>
              <HeroVisual />
            </ScaleIn>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
