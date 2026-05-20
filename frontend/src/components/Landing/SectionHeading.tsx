import { FadeIn } from "@/components/Landing/LandingMotion";
import { sectionEyebrow, sectionTitle } from "@/components/Landing/landingStyles";
import { Box, Typography } from "@mui/material";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  compact?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  compact = false,
}: SectionHeadingProps) {
  return (
    <FadeIn>
      <Box
        sx={{
          textAlign: align,
          mb: compact ? { xs: 3, md: 4 } : { xs: 5, md: 7 },
          maxWidth: align === "center" ? 640 : 560,
          mx: align === "center" ? "auto" : 0,
        }}
      >
        <Typography component="span" sx={sectionEyebrow}>
          {eyebrow}
        </Typography>
        <Typography component="h2" sx={sectionTitle}>
          {title}
        </Typography>
        {subtitle && (
          <Typography
            color="text.secondary"
            sx={{ mt: 1.5, lineHeight: 1.7, fontSize: "1.05rem" }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </FadeIn>
  );
}
