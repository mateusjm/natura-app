import LandingCard from "@/components/Landing/LandingCard";
import { FadeInStagger, StaggerItem } from "@/components/Landing/LandingMotion";
import SectionHeading from "@/components/Landing/SectionHeading";
import { landingSteps } from "@/components/Landing/landingContent";
import { landingSectionCompact, PRIMARY } from "@/components/Landing/landingStyles";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function HowItWorksSection() {
  return (
    <Box component="section" id="como-funciona" sx={landingSectionCompact}>
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 3 } }}>
        <SectionHeading
          compact
          eyebrow="Como funciona"
          title="Do cadastro ao acompanhamento"
          subtitle="Quatro passos simples para colocar vendas, estoque e clientes sob controle."
        />

        <FadeInStagger stagger={0.12}>
          <Grid container spacing={2}>
            {landingSteps.map((step, index) => (
              <Grid key={step.step} size={{ xs: 12, sm: 6, md: 3 }}>
                <StaggerItem sx={{ height: "100%" }}>
                  <LandingCard sx={{ position: "relative", p: 2.5 }}>
                    {index < landingSteps.length - 1 && (
                      <Box
                        sx={{
                          display: { xs: "none", md: "block" },
                          position: "absolute",
                          top: 36,
                          right: -20,
                          width: 40,
                          height: 2,
                          bgcolor: `${PRIMARY}44`,
                        }}
                      />
                    )}
                    <Typography
                      variant="overline"
                      color="primary"
                      fontWeight={800}
                      sx={{ letterSpacing: "0.12em" }}
                    >
                      Passo {step.step}
                    </Typography>
                    <Typography variant="h6" fontWeight={700} sx={{ mt: 1, mb: 1 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                      {step.description}
                    </Typography>
                  </LandingCard>
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </FadeInStagger>
      </Container>
    </Box>
  );
}
