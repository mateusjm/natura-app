import AccessAccountIcon from "@/components/Landing/AccessAccountIcon";
import LandingMobileMenu, {
  LandingMenuToggle,
} from "@/components/Landing/LandingMobileMenu";
import {
  getGlassHeader,
  getHeaderScrollShadow,
  getLandingHeaderOffset,
  getPrimaryButtonShadow,
  landingHeaderToolbarSx,
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

function scrollToSection(id: string, offset: number) {
  const el = document.getElementById(id);
  if (!el) return;

  const top =
    el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function LandingHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 24 });
  const headerOffset = getLandingHeaderOffset(scrolled, isMobile);
  const toolbarSx = scrolled
    ? landingHeaderToolbarSx.scrolled
    : landingHeaderToolbarSx.hero;

  const toggleMenu = () => setDrawerOpen((prev) => !prev);

  const navItem = (link: (typeof landingNavLinks)[0]) => (
    <Button
      key={link.id}
      onClick={() => scrollToSection(link.id, headerOffset)}
      sx={{
        color: "text.primary",
        fontWeight: 500,
        fontSize: "1rem",
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
          ...getGlassHeader(theme, scrolled),
          transition:
            "background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
          boxShadow: getHeaderScrollShadow(theme, scrolled),
        })}
      >
        <Container
          maxWidth="lg"
          sx={{
            px: scrolled
              ? { xs: 2.5, sm: 4, md: 6, lg: 8 }
              : { xs: 3, sm: 5, md: 8, lg: 10 },
            transition: "padding 0.3s ease",
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              ...toolbarSx,
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "space-between" : "center",
              gap: isMobile ? 2 : { md: 15, lg: 15 },
              transition: "padding 0.3s ease, min-height 0.3s ease",
            }}
          >
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src="/logo-natura.png"
                alt="Natura App"
                sx={{ height: isMobile ? 38 : 40, width: "auto" }}
              />
            </Box>

            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                }}
              >
                {landingNavLinks.map(navItem)}
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexShrink: 0,
                ml: isMobile ? "auto" : 0,
              }}
            >
              {!isMobile && (
                <>
                  <Button
                    component={RouterLink}
                    to="/auth/login"
                    startIcon={<AccessAccountIcon fontSize="small" />}
                    sx={landingNavButtonSx}
                  >
                    Acessar conta
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
                      fontSize: "1rem",
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
