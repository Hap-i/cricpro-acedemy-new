# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next Gen Cricket Academy - a Next.js monorepo with shadcn/ui for a premium cricket training facility website. Mobile-first approach, light theme by default.

## Commands

```bash
# Development
npm run dev                    # Start all apps in turborepo
npm run dev --filter=web      # Start only the web app

# Build
npm run build                 # Build all apps
npm run build --filter=web    # Build only the web app

# Linting & Formatting
npm run lint                  # Lint all apps
npm run format                # Format all apps
npm run typecheck            # Type-check all apps
```

## Architecture

```
ngca-ui/
├── apps/web/                 # Next.js 15 App Router application
│   ├── app/                 # Routes (page.tsx, layout.tsx)
│   └── components/          # App-specific components (theme-provider.tsx)
└── packages/
    ├── ui/                  # Shared shadcn/ui component library
    │   └── src/components/  # 50+ shadcn components (button, card, dialog, etc.)
    ├── eslint-config/      # ESLint configuration
    └── typescript-config/  # TypeScript configuration
```

## Key Technical Details

- **Framework**: Next.js 15 with App Router
- **UI Components**: shadcn/ui (import from `@workspace/ui/components/button`)
- **Styling**: Tailwind CSS with custom theme colors
  - Primary: `#c21d4c` (cricket red)
  - Background: `#fdfffa` (off-white)
  - Foreground: `#1d2544` (dark navy)
- **Fonts**: Inter (sans), JetBrains Mono (mono)
- **Theme**: Light/dark mode via next-themes (default: light)
- **Monorepo**: Turborepo with npm workspaces

## Adding Components

To add shadcn components to the web app:

```bash
cd apps/web
pnpm dlx shadcn@latest add button -c apps/web
```

This adds components to `packages/ui/src/components/`.

## Important Files

- `apps/web/app/layout.tsx` - Root layout with theme provider
- `apps/web/components/theme-provider.tsx` - Theme configuration (light default)
- `packages/ui/src/styles/globals.css` - CSS variables for theme colors
- `PRD.md` - Product requirements document for the cricket academy website

## Workflow

After completing each step or phase, check `PRD.md` and update the checkboxes to mark progress as completed.

## Current Development

Building a 9-section homepage with story-driven flow:
1. Hero - excitement/aspiration
2. Lane Hire teaser - "Start with the game"
3. Training trio (Group Sessions, Bowling Machine, Side Arm) - "Level up"
4. Coaching teaser - "Elite development"
5. Birthday Parties - "Celebrate with cricket"
6. Why Choose Us - trust signals
7. Facility Showcase - visual proof
8. Testimonials - social validation
9. Final CTA - conversion