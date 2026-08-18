import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 bg-card/50 border-t border-border/60">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="font-bold mb-4 text-primary">Cricpro Centre of Excellence</h3>
            <p className="text-sm text-muted-foreground">
              Practice to Perfection.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/lane-hire" className="hover:text-primary transition-colors">Lane Hire</Link></li>
              <li><Link href="/group-sessions" className="hover:text-primary transition-colors">Group Sessions</Link></li>
              <li><Link href="/coaching" className="hover:text-primary transition-colors">Coaching</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>        
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <p className="text-sm text-muted-foreground">
              Monday – Sunday<br />
              12:00 PM – 12:00 AM
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Email: info@nextgencricket.co.uk<br />
              Phone: [Coming Soon]
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          © 2024 Cricpro Centre of Excellence. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
