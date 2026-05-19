"use client";

import { motion } from "framer-motion";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { services } from "@/lib/data";

export function TrainingCardsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border border-primary/20">Level Up</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Elevate Your Game</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Progress from casual practice to structured training with our range of sessions.
          </p>
        </FadeIn>

        <div className="max-w-5xl mx-auto">
        <StaggerChildren className="grid md:grid-cols-3 gap-6 items-stretch">
          {/* Group Sessions */}
          <StaggerItem className="h-full">
            <motion.div className="h-full" whileHover={{ y: -6, boxShadow: "0 0 40px rgba(225,29,72,0.20)" }} transition={{ duration: 0.2 }}>
              <Card className="h-full flex flex-col border-border/60 bg-card/80 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <Badge variant="outline" className="w-fit border-primary/30 text-primary">{services.groupSessions.title}</Badge>
                  <CardTitle className="mt-2">{services.groupSessions.title}</CardTitle>
                  <CardDescription>{services.groupSessions.ageGroup}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">{services.groupSessions.description}</p>
                  <div className="text-2xl font-bold text-primary mb-2">
                    £{services.groupSessions.price.perSession}/session
                  </div>
                  <p className="text-sm text-muted-foreground">Max {services.groupSessions.capacity}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={services.groupSessions.path}>Join Group Sessions</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </StaggerItem>

          {/* Bowling Machine */}
          <StaggerItem className="h-full">
            <motion.div className="h-full" whileHover={{ y: -6, boxShadow: "0 0 40px rgba(225,29,72,0.20)" }} transition={{ duration: 0.2 }}>
              <Card className="h-full flex flex-col border-border/60 bg-card/80 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <Badge variant="outline" className="w-fit border-primary/30 text-primary">{services.bowlingMachine.title}</Badge>
                  <CardTitle className="mt-2">{services.bowlingMachine.title}</CardTitle>
                  <CardDescription>Batting Repetition</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">{services.bowlingMachine.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Off Peak</span>
                      <span className="font-semibold text-foreground">£{services.bowlingMachine.price.offPeak}/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Peak</span>
                      <span className="font-semibold text-foreground">£{services.bowlingMachine.price.peak}/hr</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={services.bowlingMachine.path}>Book Bowling Machine</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </StaggerItem>

          {/* Side Arm */}
          <StaggerItem className="h-full">
            <motion.div className="h-full" whileHover={{ y: -6, boxShadow: "0 0 40px rgba(225,29,72,0.20)" }} transition={{ duration: 0.2 }}>
              <Card className="h-full flex flex-col border-border/60 bg-card/80 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <Badge variant="outline" className="w-fit border-primary/30 text-primary">{services.sideArm.title}</Badge>
                  <CardTitle className="mt-2">{services.sideArm.title}</CardTitle>
                  <CardDescription>Match Simulation</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">{services.sideArm.description}</p>
                  <div className="text-2xl font-bold text-primary mb-2">
                    £{services.sideArm.price.perHour}/hour
                  </div>
                  <p className="text-sm text-muted-foreground">High-intensity training</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={services.sideArm.path}>Book Side Arm</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </StaggerItem>
        </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
