import { FadeIn, ScaleIn } from "@/components/Landing/LandingMotion";
import { landingCta } from "@/components/Landing/landingContent";
import { getCtaGradientBox, landingSectionCompact } from "@/components/Landing/landingStyles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function CtaSection() {
  return (
    <Box component="section" id="comecar" sx={landingSectionCompact}>
      <Container maxWidth="md" sx={{ px: { xs: 2.5, md: 3 } }}>
        <ScaleIn>
          <Box sx={(theme) => getCtaGradientBox(theme)}>
            <FadeIn>
              <Typography
                variant="h4"
                fontWeight={800}
                sx={{ letterSpacing: "-0.02em", mb: 1.5 }}
              >
                {landingCta.title}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 3, maxWidth: 480, mx: "auto", lineHeight: 1.7 }}
              >
                {landingCta.subtitle}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                  justifyContent: "center",
                }}
              >
                <Button
                  component={RouterLink}
                  to="/auth/register"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 3,
                    boxShadow: "0 8px 24px rgba(236, 107, 32, 0.35)",
                  }}
                >
                  Criar conta grátis
                </Button>
                <Button
                  component={RouterLink}
                  to="/auth/login"
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ px: 3, bgcolor: "background.paper" }}
                >
                  Já tenho conta
                </Button>
              </Box>
            </FadeIn>
          </Box>
        </ScaleIn>
      </Container>
    </Box>
  );
}
