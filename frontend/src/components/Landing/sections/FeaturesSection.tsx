import LandingCard from "@/components/Landing/LandingCard";
import { FadeInStagger, StaggerItem } from "@/components/Landing/LandingMotion";
import SectionHeading from "@/components/Landing/SectionHeading";
import { landingFeatures } from "@/components/Landing/landingContent";
import { landingSection } from "@/components/Landing/landingStyles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function FeaturesSection() {
  return (
    <Box
      component="section"
      id="funcionalidades"
      sx={{ ...landingSection, bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, md: 3 } }}>
        <SectionHeading
          eyebrow="Funcionalidades"
          title="Módulos para sua rotina"
          subtitle="Cada área do sistema cobre uma parte essencial da sua operação comercial."
        />

        <FadeInStagger>
          <Grid container spacing={3}>
            {landingFeatures.map((block) => {
              const Icon = block.icon;
              return (
                <Grid key={block.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <StaggerItem sx={{ height: "100%" }}>
                    <LandingCard>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: "primary.main",
                            color: "#fff",
                            display: "flex",
                          }}
                        >
                          <Icon fontSize="small" />
                        </Box>
                        <Typography variant="h6" fontWeight={700}>
                          {block.title}
                        </Typography>
                      </Box>
                      <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                        {block.items.map((item) => (
                          <Box
                            component="li"
                            key={item}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1,
                              py: 0.75,
                            }}
                          >
                            <CheckCircleOutlineIcon
                              sx={{ fontSize: 18, color: "primary.main", mt: 0.2 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
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
