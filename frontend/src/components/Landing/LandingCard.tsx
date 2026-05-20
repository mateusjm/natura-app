import { getLandingCard } from "@/components/Landing/landingStyles";
import { Box, type BoxProps } from "@mui/material";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface LandingCardProps extends BoxProps {
  children: ReactNode;
}

export default function LandingCard({ children, sx, ...rest }: LandingCardProps) {
  return (
    <Box
      component={motion.div}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      sx={(theme) => ({ ...getLandingCard(theme), ...(typeof sx === "function" ? sx(theme) : sx) })}
      {...rest}
    >
      {children}
    </Box>
  );
}
