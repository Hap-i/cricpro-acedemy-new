"use client";

import { motion } from "framer-motion";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { services } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Animated diagonal accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />

      <div className="container px-4 pt-5 pb-16 md:pb-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Hero Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/NGCA-transparent-logo.png"
              alt="Next Generation Cricket Academy"
              className="h-28 w-auto md:h-40 lg:h-44"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10 px-4 py-1 text-sm tracking-wide">
              Premium Indoor Cricket Training
            </Badge> */}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
          >
            Practice to{" "}
            <span className="text-primary relative">
              Perfection
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/60"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Where casual players become serious cricketers. Book your lane, join a session, or train with our expert coaches.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="text-lg px-8 shadow-lg hover:shadow-primary/40">
                <Link href={services.laneHire.path}>Book a Lane</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-border/60 hover:border-primary/60 hover:bg-primary/5">
                <Link href="/group-sessions">Explore Sessions</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Sub-info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm text-muted-foreground pt-4 flex items-center justify-center gap-3"
          >
            <span className="w-1 h-1 rounded-full bg-primary inline-block" />
            Open 7 days
            <span className="w-1 h-1 rounded-full bg-primary inline-block" />
            12 PM to 12 AM
            <span className="w-1 h-1 rounded-full bg-primary inline-block" />
            4 Indoor Lanes
          </motion.p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
