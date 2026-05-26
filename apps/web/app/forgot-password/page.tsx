'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/services/supabase';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card';
import { Alert, AlertDescription } from '@workspace/ui/components/alert';
import { Loader2, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-muted-foreground mt-1">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Reset Password</CardTitle>
            <CardDescription>
              We&apos;ll email you a secure link to create a new password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-3 py-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Check your inbox</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      We&apos;ve sent a password reset link to{' '}
                      <strong className="text-foreground">{email}</strong>.
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Didn&apos;t receive it? Check your spam folder or{' '}
                    <button
                      onClick={() => { setSent(false); setError(''); }}
                      className="text-primary font-medium hover:underline"
                    >
                      try again
                    </button>
                    .
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="pl-9"
                      required
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</>
                    : 'Send Reset Link'
                  }
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Sign In
          </Link>
        </p>

      </div>
    </main>
  );
}
