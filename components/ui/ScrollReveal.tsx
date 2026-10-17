"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string
  delay?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}