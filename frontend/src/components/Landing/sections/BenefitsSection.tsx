import LandingCard from "@/components/Landing/LandingCard";
import { FadeInStagger, StaggerItem } from "@/components/Landing/LandingMotion";
import SectionHeading from "@/components/Landing/SectionHeading";
import { landingBenefits } from "@/components/Landing/landingContent";
import { landingSection } from "@/components/Landing/landingStyles";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function BenefitsSection() {
  return (
    <Box
      component="section"
      id="beneficios"
      sx={{ ...landingSection, bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 3 } }}>
        <SectionHeading
          eyebrow="Benefícios"
          title="Tudo para organizar sua operação"
          subtitle="Ferramentas pensadas para o dia a dia de quem vende e controla estoque sem planilhas."
        />

        <FadeInStagger>
          <Grid container spacing={3}>
            {landingBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Grid key={benefit.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <StaggerItem sx={{ height: "100%" }}>
                    <LandingCard>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          bgcolor: "primary.main",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <Icon />
                      </Box>
                      <Typography variant="h6" fontWeight={700} gutterBottom>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                        {benefit.description}
                      </Typography>
                    </LandingCard>
                  </StaggerItem>
                </Grid>
              );
            })}
          </Grid>
        </FadeInStagger>
      </Container>
    </Box>
  );
}
