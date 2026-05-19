import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import Link from "next/link";
import { ArrowLeft, Gift, PartyPopper, Gamepad2, Users, Calendar, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Birthday Parties | Next Gen Cricket Academy",
  description: "Cricket-themed birthday parties for kids. Active, fun-filled celebrations in our professional indoor facility. Up to 20 guests.",
};

export default function BirthdayPartiesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container px-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <Badge className="mb-4">Birthday Parties</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Cricket Parties Kids Love
            </h1>
            <p className="text-lg text-muted-foreground">
              Give your child an unforgettable birthday celebration with active,
              fun-filled cricket activities in our professional indoor facility.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Party Experience</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <Gamepad2 className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Active Games</h3>
              <p className="text-sm text-muted-foreground">
                Cricket-themed activities and games for all abilities
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Qualified Coaches</h3>
              <p className="text-sm text-muted-foreground">
                Professional coaching staff to run activities
              </p>
            </Card>
            <Card className="p-6">
              <Sparkles className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Premium Facility</h3>
              <p className="text-sm text-muted-foreground">
                Indoor lanes with professional setup
              </p>
            </Card>
            <Card className="p-6">
              <Gift className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Celebration Space</h3>
              <p className="text-sm text-muted-foreground">
                Room for cake and presents after activities
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Party Details */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-sm text-muted-foreground">2-3 hours</p>
              </Card>
              <Card className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Capacity</h3>
                <p className="text-sm text-muted-foreground">Up to 20 guests</p>
              </Card>
              <Card className="p-6 text-center">
                <PartyPopper className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Age Range</h3>
                <p className="text-sm text-muted-foreground">6-14 years</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Plan Your Party</CardTitle>
                <CardDescription>
                  Tell us about your party and we'll create a custom quote
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parent-name">Parent's Name</Label>
                      <Input id="parent-name" placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input id="contact" type="tel" placeholder="07xxx xxx xxx" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="child-name">Birthday Child's Name</Label>
                      <Input id="child-name" placeholder="Child's name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age Turning</Label>
                      <Input id="age" type="number" placeholder="Age" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Expected Guests</Label>
                      <Input id="guests" type="number" placeholder="Number of guests" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Preferred Duration</Label>
                    <Input id="duration" placeholder="e.g., 2 hours, 3 hours" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Dietary requirements, accessibility needs, special requests..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source">How did you hear about us?</Label>
                    <Input id="source" placeholder="e.g., Friend, Facebook, Search" />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Party Enquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/20">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Want to chat before booking? We're happy to discuss your party ideas.
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}