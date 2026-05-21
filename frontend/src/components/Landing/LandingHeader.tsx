import LandingMobileMenu, {
  LandingMenuToggle,
} from "@/components/Landing/LandingMobileMenu";
import {
  getGlassHeader,
  getHeaderScrollShadow,
  getPrimaryButtonShadow,
  landingNavButtonSx,
} from "@/components/Landing/landingStyles";
import { landingNavLinks } from "@/components/Landing/landingContent";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const HEADER_OFFSET = 72;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function LandingHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 24 });

  const toggleMenu = () => setDrawerOpen((prev) => !prev);

  const navItem = (link: (typeof landingNavLinks)[0]) => (
    <Button
      key={link.id}
      onClick={() => scrollToSection(link.id)}
      sx={{
        color: "text.secondary",
        fontWeight: 500,
        fontSize: "0.95rem",
        "&:hover": { color: "primary.main", bgcolor: "transparent" },
      }}
    >
      {link.label}
    </Button>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        sx={(theme) => ({
          ...getGlassHeader(theme),
          transition: "box-shadow 0.3s ease",
          boxShadow: getHeaderScrollShadow(theme, scrolled),
        })}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 0.5, gap: 2 }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                mr: { md: 2 },
              }}
            >
              <Box
                component="img"
                src="/logo-natura.png"
                alt="Natura App"
                sx={{ height: isMobile ? 38 : 44, width: "auto" }}
              />
            </Box>

            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flex: 1 }}>
                {landingNavLinks.map(navItem)}
              </Box>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
              {!isMobile && (
                <>
                  <Button
                    component={RouterLink}
                    to="/auth/login"
                    sx={landingNavButtonSx}
                  >
                    Entrar
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/auth/register"
                    variant="contained"
                    color="primary"
                    disableElevation
                    sx={(theme) => ({
                      fontWeight: 600,
                      px: 2.5,
                      ...getPrimaryButtonShadow(theme),
                    })}
                  >
                    Criar conta
                  </Button>
                </>
              )}

              {isMobile && (
                <>
                  <Button
                    component={RouterLink}
                    to="/auth/register"
                    variant="contained"
                    color="primary"
                    size="small"
                    disableElevation
                    sx={(theme) => ({
                      fontWeight: 600,
                      display: { xs: "none", sm: "inline-flex" },
                      ...getPrimaryButtonShadow(theme),
                    })}
                  >
                    Criar conta
                  </Button>
                  <LandingMenuToggle open={drawerOpen} onToggle={toggleMenu} />
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {isMobile && (
        <LandingMobileMenu
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}
