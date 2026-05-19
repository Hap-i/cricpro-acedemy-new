import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const refs = ref ? decodeURIComponent(ref).split(',') : [];

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-4">
          Your booking has been confirmed. A confirmation email has been sent to you.
        </p>
        {refs.length > 0 && (
          <div className="bg-muted/40 rounded-lg px-4 py-3 mb-6 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              {refs.length === 1 ? 'Booking Reference' : 'Booking References'}
            </p>
            {refs.map(r => (
              <p key={r} className="text-lg font-bold font-mono tracking-wider">{r}</p>
            ))}
          </div>
        )}
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/lane-hire">Book Another Session</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
