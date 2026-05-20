import { Box, type BoxProps } from "@mui/material";
import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps extends BoxProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
}

export function FadeIn({
  children,
  delay = 0,
  y = 20,
  duration = 0.55,
  sx,
  ...rest
}: FadeInProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay } as Transition}
      sx={sx}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function FadeInStagger({
  children,
  sx,
  stagger = 0.1,
}: {
  children: ReactNode;
  sx?: BoxProps["sx"];
  stagger?: number;
}) {
  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      sx={sx}
    >
      {children}
    </Box>
  );
}

export function StaggerItem({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: BoxProps["sx"];
}) {
  return (
    <Box
      component={motion.div}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      sx={sx}
    >
      {children}
    </Box>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  sx,
}: {
  children: ReactNode;
  delay?: number;
  sx?: BoxProps["sx"];
}) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      sx={sx}
    >
      {children}
    </Box>
  );
}
