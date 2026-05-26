import { landingFooter } from "@/components/Landing/landingContent";
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function FooterAnchor({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document
        .getElementById(href.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      underline="hover"
      color="text.secondary"
      sx={{
        display: "block",
        py: 0.5,
        fontSize: "0.9rem",
        transition: "color 0.2s",
        "&:hover": { color: "primary.main" },
      }}
    >
      {children}
    </Link>
  );
}

export default function LandingFooter() {
  const year = new Date().getFullYear();
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        pt: { xs: 8, md: 10 },
        pb: 5,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.06)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              component="img"
              src="/logo-natura.png"
              alt="Natura App"
              sx={{ height: 44, mb: 2 }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.8, maxWidth: 400 }}
            >
              {landingFooter.tagline}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              {landingFooter.product.title}
            </Typography>
            {landingFooter.product.links.map((link) => (
              <FooterAnchor key={link.label} href={link.href}>
                {link.label}
              </FooterAnchor>
            ))}
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              {landingFooter.account.title}
            </Typography>
            {landingFooter.account.links.map((link) => (
              <Link
                key={link.label}
                component={RouterLink}
                to={link.to}
                underline="hover"
                color="text.secondary"
                sx={{
                  display: "block",
                  py: 0.5,
                  fontSize: "0.9rem",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              {landingFooter.modules.title}
            </Typography>
            {landingFooter.modules.items.map((item) => (
              <Typography
                key={item}
                variant="body2"
                color="text.secondary"
                sx={{ py: 0.5 }}
              >
                {item}
              </Typography>
            ))}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {year} Natura App. Todos os direitos reservados.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Controle de vendas, estoque e clientes para pequenos consultores.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
