"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/services/supabase"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card"
import { Alert, AlertDescription } from "@workspace/ui/components/alert"
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react"

type PageState = "waiting" | "ready" | "success" | "invalid"

export default function ResetPasswordPage() {
  const router = useRouter()

  const [pageState, setPageState] = useState<PageState>("waiting")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Supabase fires PASSWORD_RECOVERY when the user arrives via the reset link.
  // The token in the URL hash is exchanged automatically before this event fires.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setPageState("ready")
      }
    })

    // Safety timeout — if no recovery event after 5 s, the link is invalid/expired
    const timeout = setTimeout(() => {
      setPageState((prev) => (prev === "waiting" ? "invalid" : prev))
    }, 5000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setPageState("success")

    // Redirect to account after a short delay
    setTimeout(() => router.push("/account"), 2500)
  }

  // ── Waiting for Supabase to process the token ──────────────────────────────
  if (pageState === "waiting") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Verifying your reset link…
          </p>
        </div>
      </main>
    )
  }

  // ── Invalid / expired link ─────────────────────────────────────────────────
  if (pageState === "invalid") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-5 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-7 w-7 text-red-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Link invalid or expired</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This password reset link has expired or has already been used.
              Reset links are valid for 1 hour.
            </p>
          </div>
          <Button asChild>
            <Link href="/forgot-password">Request a new link</Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            or{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              back to sign in
            </Link>
          </p>
        </div>
      </main>
    )
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (pageState === "success") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-5 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-7 w-7 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Password updated</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your password has been changed successfully. Redirecting you to
              your account…
            </p>
          </div>
          <Loader2 className="mx-auto h-5 w-5 animate-spin text-primary" />
        </div>
      </main>
    )
  }

  // ── Reset form ─────────────────────────────────────────────────────────────
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Create new password</h1>
          <p className="mt-1 text-muted-foreground">
            Choose a strong password for your account
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">New Password</CardTitle>
            <CardDescription>Must be at least 8 characters</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-9"
                    required
                    autoFocus
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Strength indicator */}
                {password.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            password.length >= i * 3
                              ? password.length >= 12
                                ? "bg-green-500"
                                : password.length >= 8
                                  ? "bg-amber-400"
                                  : "bg-red-400"
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {password.length < 8
                        ? "Too short"
                        : password.length < 12
                          ? "Fair — consider a longer password"
                          : "Strong password"}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10 pl-9"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    tabIndex={-1}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {confirmPassword.length > 0 && password !== confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
                {confirmPassword.length > 0 &&
                  password === confirmPassword &&
                  password.length >= 8 && (
                    <p className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle className="h-3 w-3" /> Passwords match
                    </p>
                  )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  loading || password.length < 8 || password !== confirmPassword
                }
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating…
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
