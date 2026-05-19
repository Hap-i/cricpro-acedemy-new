"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  fromY?: number;
  fromX?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
  fromY = 24,
  fromX = 0,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: fromY, x: fromX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
