import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Next Gen Cricket Academy",
  description: "Get in touch with Next Gen Cricket Academy. Questions about lane hire, coaching, or bookings? We'd love to hear from you.",
};

export default function ContactPage() {
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
            <Badge className="mb-4">Contact Us</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Next Gen Cricket Academy<br />
                        [Address Coming Soon]
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">[Coming Soon]</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@nextgencricket.co.uk</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Opening Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Sunday<br />
                        12:00 PM - 12:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <MessageCircle className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Quick Enquiries</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    For the fastest response, use the contact form or message us on social media.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" disabled>
                      Facebook (Soon)
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      Instagram (Soon)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill in the form below and we'll get back to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input id="phone" type="tel" placeholder="07xxx xxx xxx" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Enquiry</SelectItem>
                        <SelectItem value="lane-hire">Lane Hire</SelectItem>
                        <SelectItem value="group-sessions">Group Sessions</SelectItem>
                        <SelectItem value="coaching">Coaching</SelectItem>
                        <SelectItem value="birthday">Birthday Parties</SelectItem>
                        <SelectItem value="corporate">Corporate / Team Bookings</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      className="min-h-[150px]"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">What should I bring to a session?</h3>
                <p className="text-sm text-muted-foreground">
                  Just bring your cricket gear (bat, pads, gloves if you have them). We provide balls,
                  stumps, and protective equipment if needed.
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Can I book on the day?</h3>
                <p className="text-sm text-muted-foreground">
                  Subject to availability, yes. We recommend booking in advance to secure your preferred time.
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Is there parking available?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we have free on-site parking for all customers.
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2">What age can children start?</h3>
                <p className="text-sm text-muted-foreground">
                  Our group sessions are suitable for ages 6-18. Younger children can use lane hire
                  with parental supervision.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}