import { landingNavLinks } from "@/components/Landing/landingContent";
import {
  getLandingHeaderOffset,
  getPrimaryButtonShadow,
  PRIMARY,
} from "@/components/Landing/landingStyles";
import CloseIcon from "@mui/icons-material/Close";
import AccessAccountIcon from "@/components/Landing/AccessAccountIcon";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

function scrollToSection(id: string, offset: number) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

interface LandingMobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function LandingMenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <IconButton
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
      onClick={onToggle}
      sx={{
        ml: 0.5,
        border: "1px solid",
        borderColor: open ? "primary.main" : "divider",
        bgcolor: open ? `${PRIMARY}14` : "background.paper",
        color: open ? "primary.main" : "text.primary",
        transition: "all 0.25s ease",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: `${PRIMARY}18`,
          color: "primary.main",
        },
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.span
            key="close"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex" }}
          >
            <CloseIcon />
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex" }}
          >
            <MenuIcon />
          </motion.span>
        )}
      </AnimatePresence>
    </IconButton>
  );
}

export default function LandingMobileMenu({
  open,
  onClose,
}: LandingMobileMenuProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 24 });
  const headerOffset = getLandingHeaderOffset(scrolled, isMobile);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleNav = (id: string) => {
    onClose();
    requestAnimationFrame(() => scrollToSection(id, headerOffset));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      slotProps={{
        backdrop: {
          sx: { backdropFilter: "blur(4px)", bgcolor: "rgba(0,0,0,0.35)" },
        },
      }}
      PaperProps={{
        sx: {
          width: { xs: "min(320px, 88vw)", sm: 340 },
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          onClick={onClose}
          sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <Box
            component="img"
            src="/logo-natura.png"
            alt="Natura App"
            sx={{ height: 40, width: "auto" }}
          />
        </Box>
        <IconButton
          aria-label="Fechar menu"
          onClick={onClose}
          sx={{
            color: "text.secondary",
            "&:hover": { color: "primary.main", bgcolor: `${PRIMARY}14` },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 2 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ px: 1.5, fontWeight: 700, letterSpacing: "0.1em" }}
        >
          Navegação
        </Typography>
        <List disablePadding sx={{ mt: 0.5 }}>
          {landingNavLinks.map((link, index) => (
            <ListItemButton
              key={link.id}
              onClick={() => handleNav(link.id)}
              sx={{
                borderRadius: 3,
                mb: 0.5,
                py: 1.25,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: `${PRIMARY}14`,
                  "& .MuiListItemText-primary": { color: "primary.main" },
                },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              />
              <Typography variant="caption" color="text.disabled" sx={{ mr: 0.5 }}>
                {String(index + 1).padStart(2, "0")}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ px: 2.5, pb: 3, pt: 1 }}>
        <Divider sx={{ mb: 2 }} />
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: "block", mb: 1.5, fontWeight: 700, letterSpacing: "0.1em" }}
        >
          Sua conta
        </Typography>
        <Button
          component={RouterLink}
          to="/auth/login"
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<AccessAccountIcon fontSize="small" />}
          onClick={onClose}
          sx={{ mb: 1.25, py: 1.2, fontWeight: 600, borderRadius: 3 }}
        >
          Acessar conta
        </Button>
        <Button
          component={RouterLink}
          to="/auth/register"
          fullWidth
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<PersonAddOutlinedIcon />}
          onClick={onClose}
          sx={(theme) => ({
            py: 1.2,
            fontWeight: 600,
            borderRadius: 3,
            ...getPrimaryButtonShadow(theme),
          })}
        >
          Criar conta
        </Button>
      </Box>
    </Drawer>
  );
}
