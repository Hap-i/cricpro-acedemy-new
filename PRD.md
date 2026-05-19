# Next Gen Cricket Academy - Product Requirements Document

**Project:** Next Gen Cricket Academy Website
**Tagline:** "Practice to Perfection"
**Core Narrative:** "A place where casual players become serious cricketers"
**Last Updated:** 2026-05-18

---

## 🚨 CRITICAL: Mobile-First Priority

> **Most users (70%+) will access the website from mobile devices.**

This is the most important design principle. Every decision must prioritize the mobile experience:

- **Design for mobile first**, then scale up to desktop
- **Mobile booking flows** must be frictionless and complete in under 2 minutes
- **Touch targets** minimum 44px height
- **Sticky CTA** visible after scrolling past hero on mobile
- **Forms** optimized for mobile keyboards (correct input types)
- **Images** optimized for mobile networks (WebP, lazy loading)
- **Navigation** slides in from side on mobile
- **Content** readable without zooming (16px minimum body text)
- **Performance** - LCP under 2.5 seconds on 3G

If it doesn't work on mobile, it doesn't work.

---

## Vision

Build a premium, conversion-focused website for a modern indoor cricket training facility that guides users through an emotional journey from casual practice to professional development.

---

## Target Audience

> **Note:** Primary access will be via mobile - parents booking on phones during lunch breaks, adults checking availability after work.

| Segment | Primary Needs | Key Motivators |
|---------|---------------|----------------|
| Parents (6-14 yr kids) | Mobile-friendly booking, quick confirmation | Skill development, social interaction |
| Adult Players (18-45) | Mobile access to availability, fast booking | Training efficiency, serious sports setting |
| Young Cricketers (12-18) | Mobile-friendly experience | Peer social, progression pathways |
| Team Coordinators | Mobile-friendly for on-the-go bookings | Multi-player booking capability |

---

## Services Overview

| Service | Pricing | Booking Type |
|---------|---------|--------------|
| Lane Hire | £15/hr (off-peak) / £25/hr (peak) | Self-service |
| Group Sessions | £12.50/session | Self-service |
| Bowling Machine | £22/hr (off-peak) / £32/hr (peak) | Self-service |
| Side Arm | £30/hr | Self-service |
| One-to-One Coaching | TBD | Inquiry only |
| Birthday Parties | Custom | Inquiry only |

---

## Phase 1: Core Infrastructure & Homepage

**Timeline:** Weeks 1-4

### Objectives
- **Mobile-first design system** - mobile layouts first, then desktop
- Establish design system with cricket-specific tokens
- Build shared layout components (mobile-optimized)
- Create 9-section story-driven homepage

### Deliverables

- [ ] **Design System Setup**
  - [ ] Configure Tailwind with custom theme (cricket green, pitch cream, boundary red)
  - [ ] Establish typography scale
  - [ ] Create colour tokens

- [x] **Shared Components**
  - [x] Responsive navigation with mobile menu
  - [x] Header with "Book Now" CTA
  - [x] Footer with contact info and links
  - [x] Section containers and wrappers

- [x] **Homepage Sections**
  - [x] Hero - excitement/aspiration
  - [x] Lane Hire teaser - "Start with the game"
  - [x] Training trio (Group, Bowling Machine, Side Arm) - "Level up"
  - [x] Coaching teaser - "Elite development"
  - [x] Birthday Parties teaser - "Celebrate with cricket"
  - [x] Why Choose Us - trust signals
  - [x] Facility Showcase - visual proof
  - [x] Testimonials - social validation
  - [x] Final CTA - conversion

- [x] **Mobile Optimization**
  - [x] Sticky bottom CTA bar
  - [x] Touch-friendly interactions (44px targets)
  - [x] Responsive layout all breakpoints

### Success Criteria
- [x] **Mobile LCP < 2.5 seconds**
- [x] Mobile CTAs prominent and accessible
- [x] Story flow clear and emotional
- [x] Mobile navigation smooth (hamburger menu works)
- Touch targets 44px minimum
- No horizontal scroll on 375px width

---

## Phase 2: Service Pages & Booking Flows

**Timeline:** Weeks 5-9

### Objectives
- Create service page templates
- Implement 4 complete booking flows
- Ensure mobile-first booking experience

### Deliverables

**Week 5-6: Lane Hire (Priority)**
- [x] Service page template
- [x] Lane Hire page with full content
- [x] Date picker component
- [x] Time slot grid with availability
- [x] Duration selector with price calculator
- [x] Booking form with validation
- [x] Booking review/confirm page (`/booking-confirm`)
- [x] Stripe payment integration
- [x] Booking success page (`/booking-success`)
- [x] Booking cancel page (`/booking-cancel`)

**Week 7: Group Sessions**
- [x] Group Sessions page
- [x] Schedule display (Fri, Sat, Sun times)
- [x] Player/parent information capture
- [x] Emergency contact fields
- [x] Age verification

**Week 8: Bowling Machine & Side Arm**
- [x] Bowling Machine page
- [x] Side Arm page
- [x] Equipment-specific content
- [x] Simplified booking flow (like Lane Hire)

### Booking Flow Architecture

```
LANE HIRE / BOWLING MACHINE / SIDE ARM:
Step 1: Date Selection → Calendar picker
Step 2: Time Slot → Grid with off-peak/peak indicators
Step 3: Duration & Details → Price calculator, contact info
Step 4: Review → /booking-confirm (summary + Pay Now button)
Step 5: Payment → Stripe Checkout (test: 4242 4242 4242 4242)
Step 6: Confirmation → /booking-success?ref=... (email sent via Resend)

GROUP SESSIONS:
Step 1: Session Selection → Schedule, age group, spots
Step 2: Player Info → Name, DOB, skill level
Step 3: Emergency Contact → Name, relationship, phone
Step 4: Confirmation → Summary, what to bring
```

### Auth Flow
- `/login` — Supabase `signInWithPassword`; redirects to `from` param or `/`
- `/signup` — Supabase `signUp` with `full_name` + `phone` in user metadata
- Optional auth: booking flows auto-fill from logged-in user but never block non-logged-in users
- Header shows Login/Sign Up when logged out; avatar dropdown with Sign Out when logged in

### Mobile Booking UX Checklist
- [x] Date picker works with native mobile input
- [x] Time slots displayed in touch-friendly grid
- [x] Form fields use correct input types (tel, email)
- [ ] Progress indicator shows current step
- [x] Back navigation preserves entered data (sessionStorage)
- [x] Confirmation shows clearly on small screen
- [x] "Book Now" / "Pay Now" button always visible

### Success Criteria
- All booking flows complete and functional
- **Mobile booking completes in < 2 minutes**
- Form validation works correctly
- No zoom required to fill forms

---

## Phase 3: Contact, About & SEO

**Timeline:** Weeks 10-12

### Objectives
- Build trust through About page
- Enable multi-purpose contact
- Establish SEO foundation

### Deliverables

**Week 10: About Page**
- [x] Facility history and mission
- [x] Team/coach profiles
- [x] Facility specifications
- [x] Safety certifications

**Week 11: Contact & Inquiry**
- [x] Contact page with form
- [x] Department routing (bookings, coaching, events)
- [x] Map integration
- [x] Opening hours, parking info

**Week 12: SEO Foundation**
- [x] Metadata for all pages
- [ ] XML sitemap
- [ ] Open Graph / Twitter cards
- [ ] Structured data (LocalBusiness, Service, FAQ)
- [ ] Content optimization with keywords

### SEO Keywords Strategy

| Service | Primary Keywords |
|---------|------------------|
| Lane Hire | cricket lane hire, indoor cricket nets, batting cage hire |
| Group Sessions | youth cricket coaching, children's cricket training |
| Bowling Machine | bowling machine hire, cricket tech training |
| Coaching | one-to-one cricket coaching, private cricket coach |
| Local | cricket academy [city], indoor cricket [location] |

### Success Criteria
- All 9 pages indexed
- Local SEO signals strong
- Core Web Vitals passing

---

## Phase 4: Polish & Launch

**Timeline:** Weeks 13-14

### Objectives
- Complete mobile optimization
- Cross-browser testing
- Performance optimization
- Launch readiness

### Deliverables

**Week 13: Mobile Completion**
- [ ] Touch target audit (44px minimum)
- [ ] Form field optimization for mobile
- [ ] Navigation polish
- [ ] Performance audit

**Week 14: Testing & Launch**
- [ ] Browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Responsive testing (375px, 768px, 1024px, 1440px)
- [ ] Accessibility audit
- [ ] Lighthouse performance > 90
- [ ] Analytics setup

### Success Criteria
- No critical bugs
- Lighthouse score > 90
- All devices tested

---

## Future Scalability

| Feature | Priority | Status | Notes |
|---------|----------|--------|-------|
| Stripe Payments | High | ✅ Done | Test keys active; swap live keys before production |
| Booking Management | High | ✅ Done | Real-time availability, admin dashboard, slot blocking |
| Email Notifications | High | ✅ Done | Resend integration; domain verification needed for production |
| User Auth | High | ✅ Done | Supabase Auth; optional at booking, auto-fill from user profile |
| Admin Dashboard | High | ✅ Done | Bookings, resources, inquiries, group sessions, stats |
| Member Portal (`/account`) | Medium | Pending | Booking history for logged-in users |
| Password Reset | Medium | Pending | `/forgot-password` page + Supabase `resetPasswordForEmail` |
| CRM Integration | Medium | Pending | Auto-lead capture from inquiries |
| Sitemap & SEO | Low | Pending | XML sitemap, Open Graph, structured data |
| Multi-location | Low | Pending | Future expansion |

---

## Key Metrics

| Metric | Target |
|--------|--------|
| **Mobile Traffic** | 70%+ of total visitors |
| Mobile Conversion Rate | 5%+ |
| Desktop Conversion Rate | 3%+ |
| Conversion Rate | 5% overall |
| Monthly Visitors (Month 1-6) | 2,000 |
| Monthly Visitors (Month 7+) | 5,000 |
| Organic Traffic | 40% |
| Session Duration | 2:30 min |
| Pages per Session | 4.0 |
| Bounce Rate | < 45% |
| Monthly Booking Value | £15,000 |
| Mobile LCP | < 2.5 seconds |
| Mobile FCP | < 1.8 seconds |

---

## Design Guidelines

### 🔴 Mobile-First (CRITICAL)

- Design mobile layout FIRST, then enhance for desktop
- Sticky bottom CTA bar on mobile (appears after hero scroll)
- Hamburger menu with slide-in panel
- Single-column layouts on mobile
- Large touch targets (44px minimum)
- Native date/time pickers where possible
- Optimized images for mobile (WebP, srcset)
- No horizontal scrolling on any device

### Visual Style
- Premium sports branding
- Dark overlays with cricket photography
- Clean typography, strong hierarchy
- Subtle gradients, premium feel

### Must NOT Feel Like
- Local sports club
- Outdated website
- Generic SaaS
- Childish sports branding

### Animation Direction
- Subtle hover interactions
- Fade-in sections
- Smooth scrolling
- Minimal premium motion

---

## Component Strategy

Use existing shadcn/ui components:
- Cards for service teasers
- Tabs for time slot selection
- Accordions for FAQs
- Sheets for mobile navigation
- Dialogs for booking confirmation
- Carousels for testimonials

Custom components needed:
- Date/time picker with availability
- Sticky mobile CTA
- Pricing calculator
- Service-specific layouts

---

## Folder Structure

```
app/
├── page.tsx                    # Homepage
├── lane-hire/page.tsx          # Lane hire + booking
├── group-sessions/page.tsx    # Group sessions + booking
├── bowling-machine/page.tsx   # Bowling machine + booking
├── side-arm/page.tsx          # Side arm + booking
├── coaching/page.tsx          # Coaching inquiry
├── birthday-parties/page.tsx  # Birthday inquiry
├── about/page.tsx             # About
├── contact/page.tsx           # Contact
├── login/page.tsx             # Supabase auth — sign in
├── signup/page.tsx            # Supabase auth — register
├── booking-confirm/page.tsx   # Review page (sessionStorage → Pay Now)
├── booking-success/page.tsx   # Post-payment success + reference
├── booking-cancel/page.tsx    # Stripe cancel redirect
├── admin/
│   ├── login/page.tsx         # Admin HMAC auth
│   ├── page.tsx               # Dashboard (stats, schedule, utilization)
│   ├── bookings/page.tsx      # View/filter/cancel bookings
│   ├── resources/page.tsx     # CRUD resources, activate/deactivate
│   ├── blocked-slots/page.tsx # Block date ranges
│   ├── group-sessions/page.tsx# Group sessions CRUD
│   └── inquiries/page.tsx     # View/update inquiry status
├── api/
│   ├── bookings/              # Create, list, cancel bookings
│   ├── slots/                 # Slot generation with pricing
│   ├── payments/              # Stripe checkout session
│   ├── webhooks/stripe/       # Payment confirmation webhook
│   ├── inquiries/             # Contact/coaching inquiries
│   └── admin/                 # Admin CRUD + stats + auth
├── components/
│   ├── header.tsx             # Auth-aware header (Login/avatar)
│   ├── admin/admin-nav.tsx    # Admin navigation bar
│   ├── sections/              # Homepage sections
│   └── forms/                 # Inquiry forms
└── lib/
    ├── context/auth.tsx       # AuthProvider + useAuth hook
    ├── services/supabase.ts   # Supabase client (anon + service-role)
    ├── services/email.ts      # Resend email service
    ├── services/payment.ts    # Stripe payment service
    └── middleware.ts          # Admin route protection (HMAC)
```

---

## Notes

- **MOBILE IS PRIMARY** - 70%+ users will be on mobile
- Coaching and Birthday Parties = Inquiry only (no booking flow)
- Group Sessions: Fixed schedule, youth focus, parent as customer
- Lane Hire: Highest volume, simplest flow
- Mobile booking must complete in < 2 minutes
- Story flow: Casual → Structured → Professional
- Test on real mobile devices, not just responsive mode