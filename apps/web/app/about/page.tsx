import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Phone, Mail, Star, Award, Users, Target } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Next Gen Cricket Academy",
  description: "Learn about Next Gen Cricket Academy - our mission, facilities, and qualified coaching team. Premium indoor cricket training.",
};

export default function AboutPage() {
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
            <Badge className="mb-4">About Us</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Next Gen Cricket Academy
            </h1>
            <p className="text-lg text-muted-foreground">
              Where passion meets professional training. We're dedicated to helping
              cricketers of all ages and abilities reach their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Next Gen Cricket Academy was founded with a simple mission: to provide
                quality cricket training in a premium environment that rival clubs couldn't match.
              </p>
              <p>
                We believe every cricketer deserves access to professional facilities and
                coaching, whether they're just starting out or working towards county level.
              </p>
              <p>
                Our indoor facility allows year-round training regardless of weather, with
                professional lanes, equipment, and experienced coaches ready to help you
                improve your game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Train With Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <Award className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Qualified Coaches</h3>
              <p className="text-sm text-muted-foreground">
                Our team has years of cricket experience and coaching qualifications
              </p>
            </Card>
            <Card className="p-6">
              <Target className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Modern Facilities</h3>
              <p className="text-sm text-muted-foreground">
                4 indoor lanes with professional lighting and equipment
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">All Abilities</h3>
              <p className="text-sm text-muted-foreground">
                From beginners to representative players, we cater for everyone
              </p>
            </Card>
            <Card className="p-6">
              <Clock className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Flexible Hours</h3>
              <p className="text-sm text-muted-foreground">
                Open 12pm-midnight, 7 days a week for maximum convenience
              </p>
            </Card>
            <Card className="p-6">
              <Star className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p className="text-sm text-muted-foreground">
                Players improve rapidly with our structured training approach
              </p>
            </Card>
            <Card className="p-6">
              <MapPin className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Easy Access</h3>
              <p className="text-sm text-muted-foreground">
                Convenient location with ample parking
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Facility Info */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Facility</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Training Lanes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 4 professional indoor lanes</li>
                  <li>• Floodlight-quality lighting</li>
                  <li>• Professional cricket surfaces</li>
                  <li>• Full-length nets</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Equipment</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Professional bowling machines</li>
                  <li>• Side arm bowling equipment</li>
                  <li>• Protective gear available</li>
                  <li>• Video analysis tools</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Amenities</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Clean changing facilities</li>
                  <li>• Reception & waiting area</li>
                  <li>• Refreshment area</li>
                  <li>• Free parking</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Operating Hours</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Monday - Sunday</li>
                  <li>• 12:00 PM - 12:00 AM</li>
                  <li>• 7 days a week</li>
                  <li>• Bank holidays included</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Values</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  We strive for the highest standards in everything we do
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Inclusivity</h3>
                <p className="text-sm text-muted-foreground">
                  Cricket is for everyone, regardless of age or ability
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Development</h3>
                <p className="text-sm text-muted-foreground">
                  We focus on long-term player growth and improvement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}