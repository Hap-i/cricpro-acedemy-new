'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card';
import { Alert, AlertDescription } from '@workspace/ui/components/alert';
import { Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/services/supabase';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') ?? '/';

  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function update(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If session exists immediately (email confirmation disabled), redirect
    if (data.session) {
      router.push(from);
      router.refresh();
      return;
    }

    // Otherwise show "check your email" message
    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Check your email</h1>
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation link to <strong>{formData.email}</strong>. Click the link to activate your account.
          </p>
          <Button asChild variant="outline">
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground mt-1">Book faster, track your sessions</p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign Up</CardTitle>
            <CardDescription>All fields marked * are required</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="John Smith"
                  value={formData.fullName}
                  onChange={e => update('fullName', e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => update('email', e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07xxx xxx xxx"
                  value={formData.phone}
                  onChange={e => update('phone', e.target.value)}
                  autoComplete="tel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={e => update('password', e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password *</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="Repeat your password"
                  value={formData.confirm}
                  onChange={e => update('confirm', e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating account…</> : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link href={`/login?from=${encodeURIComponent(from)}`} className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
