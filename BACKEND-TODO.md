# CricPro Academy Backend - Implementation Todo

**Project:** Next Gen Cricket Academy Backend
**Frontend:** Already built (Next.js App Router)
**Backend:** Next.js API Routes + Supabase
**Last Updated:** 2026-05-18

---

## Environment Setup

### Credentials & Services

- [x] Supabase project created & connected
- [x] `.env.local` configured with all required variables
- [x] Stripe test keys configured (`sk_test_...`, `pk_test_...`)
- [x] Stripe webhook secret configured (`whsec_...`)
- [x] Resend API key configured (`re_...`)
- [x] Admin password & secret configured
- [x] App URL configured

### Current `.env.local` Variables

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Auth
ADMIN_PASSWORD=
ADMIN_SECRET=
ADMIN_EMAIL=

# Payments
PAYMENTS_ENABLED=true
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
RESEND_API_KEY=
EMAIL_FROM=onboarding@resend.dev
```

---

## Phase 1: Database & Auth Setup ✅

| Task | Description | Status |
|------|-------------|--------|
| 1.1 Supabase Schema | All tables created (resources, bookings, availability rules, pricing rules, etc.) | ✅ Done |
| 1.2 Extensions | btree_gist, pgcrypto enabled | ✅ Done |
| 1.3 RLS Policies | Row-level security configured | ✅ Done |
| 1.4 Drizzle Setup | Skipped — using Supabase client directly | ⏭ Skipped |
| 1.5 Admin Auth | HMAC-SHA256 session cookies, middleware protection for `/admin/*` and `/api/admin/*` | ✅ Done |
| 1.6 User Auth | Supabase Auth (email/password), login/signup pages, header auth UI | ✅ Done |

### Admin Auth Implementation
- `POST /api/admin/auth` — login (sets httpOnly session cookie)
- `DELETE /api/admin/auth` — logout
- `middleware.ts` — protects all `/admin/*` and `/api/admin/*` routes using Web Crypto HMAC verification
- 24-hour session TTL

### User Auth Implementation
- `/login` — Supabase `signInWithPassword`
- `/signup` — Supabase `signUp` with `full_name` and `phone` in user metadata
- `lib/context/auth.tsx` — `AuthProvider` + `useAuth` hook using `onAuthStateChange`
- Header shows Login/Sign Up when logged out; user avatar dropdown with Sign Out when logged in
- Booking forms auto-fill name/email/phone from logged-in user (never blocks booking if not logged in)

---

## Phase 2: Slot & Pricing System ✅

| Task | Description | Status |
|------|-------------|--------|
| 2.1 Availability Rules API | CRUD for operating hours per resource | ✅ Done |
| 2.2 Pricing Rules API | Peak/off-peak pricing per resource | ✅ Done |
| 2.3 Slot Override API | One-off price/block overrides | ✅ Done |
| 2.4 Block Slots API | Block time for maintenance/events | ✅ Done |
| 2.5 Slot Generation Engine | Rules → slots → pricing → overrides → blocked → booked | ✅ Done |
| 2.6 Get Slots API | `GET /api/slots?resourceType=lane&date=...` | ✅ Done |

### Pricing Configuration (Live Data)
| Service | Off-Peak (12pm–4pm, 10pm–12am) | Peak (4pm–10pm) |
|---------|-------------------------------|-----------------|
| Lane Hire | £15/hr | £25/hr |
| Bowling Machine | £22/hr | £32/hr |
| Side Arm | £25/hr | £30/hr |

### Key Fix Applied
- Old pricing rules with `start_time = "09:00"` (£110, £120) deactivated — were overlapping the correct 12pm rules
- Pricing rule time format fix: DB stores `"HH:MM:SS"`, slot times are `"HH:MM"` — fixed with `.substring(0, 5)` comparison

---

## Phase 3: Booking APIs ✅

| Task | Description | Status |
|------|-------------|--------|
| 3.1 Create Booking | `POST /api/bookings` with overlap prevention | ✅ Done |
| 3.2 Double-Booking Prevention | Checks existing bookings before insert | ✅ Done |
| 3.3 Booking Validation | Validates slot, checks overlaps, calculates price server-side | ✅ Done |
| 3.4 Get/Cancel Booking | `GET /api/bookings`, `DELETE /api/bookings?id=...` | ✅ Done |
| 3.5 Inquiry API | `POST /api/inquiries` for coaching/parties | ✅ Done |

### Lane-as-Source-of-Truth for Bowling Machine & Side Arm
- Bowling machine and side arm sessions use **lane availability** as single source of truth
- These service types do not require a `resourceId` in the booking request
- Backend auto-assigns the first available lane at booking time
- If all 4 lanes are booked for a time slot, bowling machine and side arm are also blocked

### Booking Confirmation Flow
- Form → `sessionStorage` → `/booking-confirm` (review page) → Pay Now → API → Stripe → `/booking-success`

---

## Phase 4: Admin Dashboard Backend ✅

| Task | Description | Status |
|------|-------------|--------|
| 4.1 Admin Auth Middleware | Protects `/api/admin/*` routes via HMAC session | ✅ Done |
| 4.2 Admin Booking Management | View, filter, cancel bookings | ✅ Done |
| 4.3 Resource Management | CRUD for lanes/machines, activate/deactivate | ✅ Done |
| 4.4 Slot Blocking System | Block date ranges per resource | ✅ Done |
| 4.5 Group Sessions | CRUD + player bookings | ✅ Done |
| 4.6 Inquiries Management | View, update status | ✅ Done |
| 4.7 Stats API | Dashboard stats: bookings, revenue, resource utilization | ✅ Done |
| 4.8 Admin UI Redesign | Admin panel updated to match app design system (shadcn/ui tokens) | ✅ Done |

### Active Resources
- Lane 1, Lane 2, Lane 3, Lane 4 — all active with Mon–Sun 12pm–12am availability
- Bowling Machine, Side Arm — resources exist but use lane availability as source of truth

---

## Phase 5: Payments ✅

| Task | Description | Status |
|------|-------------|--------|
| 5.1 Payment Service | `PAYMENTS_ENABLED` toggle, lazy Stripe init | ✅ Done |
| 5.2 Stripe Checkout | `POST /api/payments/create-session` + inline in booking API | ✅ Done |
| 5.3 Stripe Webhook | `POST /api/webhooks/stripe` — verifies signature, confirms booking | ✅ Done |
| 5.4 Payment Flow | `pending_payment` → `confirmed` via webhook | ✅ Done |
| 5.5 Booking Cancel Page | `/booking-cancel` shown when user exits Stripe | ✅ Done |
| 5.6 Booking Success Page | `/booking-success?ref=...` shows reference numbers | ✅ Done |

### Payment Flow
1. User submits booking form → data saved to `sessionStorage` → redirect to `/booking-confirm`
2. User clicks "Pay Now" → `POST /api/bookings` → booking created as `pending_payment`
3. Stripe Checkout session created → user redirected to Stripe
4. On payment: `checkout.session.completed` webhook → booking → `confirmed` → emails sent
5. On expiry: `checkout.session.expired` webhook → booking → `cancelled`

### Stripe Keys
- Use test keys (`sk_test_...`, `pk_test_...`) in development
- Replace with live keys (`sk_live_...`, `pk_live_...`) before production deployment
- Webhook secret changes when running `stripe listen` locally — update `STRIPE_WEBHOOK_SECRET` each session

---

## Phase 6: Email System ✅

| Task | Description | Status |
|------|-------------|--------|
| 6.1 Email Service | Resend integration with `console.log` fallback | ✅ Done |
| 6.2 Booking Confirmation | Sent to customer on `confirmed` status | ✅ Done |
| 6.3 Admin Notification | Sent to `ADMIN_EMAIL` on new booking | ✅ Done |
| 6.4 Inquiry Emails | Customer confirmation + admin notification on inquiry | ✅ Done |
| 6.5 Group Session Email | Confirmation on group session booking | ✅ Done |

### Email Configuration
- **From address:** `onboarding@resend.dev` (test/shared domain — no DNS setup required)
- **For production:** Verify `nextgencricket.co.uk` or `cricpro.co.uk` in Resend Dashboard → Domains, then update `EMAIL_FROM`
- **Resend free tier:** Can only send to your own verified email until domain is set up

### Testing Locally
1. Ensure `RESEND_API_KEY` is set in `.env.local`
2. Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe` in a separate terminal
3. Update `STRIPE_WEBHOOK_SECRET` with the `whsec_...` key printed by the CLI
4. Restart dev server

---

## Phase 7: Polish & Optimization ✅

| Task | Description | Status |
|------|-------------|--------|
| 7.1 Rate Limiting | In-memory Map, 10 booking requests/min per IP | ✅ Done |
| 7.2 Stale Booking Cleanup | `POST /api/admin/cleanup` expires `pending_payment` bookings > 30 min | ✅ Done |
| 7.3 Error Handling | Consistent `{ success, error }` responses, conflict detection | ✅ Done |
| 7.4 Caching | Next.js default caching in place | ⏳ Partial |
| 7.5 Testing | Manual testing of full booking flow confirmed working | ✅ Done |

---

## What's Pending / Future Work

| Feature | Priority | Notes |
|---------|----------|-------|
| Domain-verified email | High | Verify `nextgencricket.co.uk` in Resend before go-live |
| Live Stripe keys | High | Replace test keys before production deployment |
| Production webhook endpoint | High | Register `https://yourdomain.com/api/webhooks/stripe` in Stripe Dashboard |
| Account page (`/account`) | Medium | Booking history for logged-in users |
| Password reset flow | Medium | `/forgot-password` page + Supabase `resetPasswordForEmail` |
| Redis rate limiting | Low | Replace in-memory Map with Upstash for multi-instance deployments |
| Sitemap & SEO | Low | XML sitemap, Open Graph, structured data |
