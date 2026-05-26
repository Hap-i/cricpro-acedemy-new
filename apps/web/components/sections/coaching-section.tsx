"use client";

import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { services } from "@/lib/data";

export function CoachingSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30 border-y border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Elite Development</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
               Elite Coaching with Individual Attention
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {services.coaching.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="p-8 bg-card/80 rounded-xl border border-primary/20 relative overflow-hidden">
              {/* Red glow corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <p className="text-2xl font-bold text-primary mb-2">{services.coaching.price}</p>
              <p className="text-muted-foreground mb-6">
                One-to-one sessions tailored to your goals
              </p>
              <Button asChild size="lg">
                <Link href={services.coaching.path}>Enquire About 1-on-1 Coaching</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
