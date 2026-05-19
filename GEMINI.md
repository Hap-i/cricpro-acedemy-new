# Next Gen Cricket Academy (NGCA) - Gemini Project Instructions

This file provides foundational mandates, project-specific conventions, and architectural guidance for Gemini CLI when working in this repository.

## Core Mandates
- **Theme First**: Mobile-first approach, light theme by default.
- **Color Palette**: Rigorously adhere to the primary color scheme:
  - Primary: `#c21d4c` (Cricket Red)
  - Background: `#fdfffa` (Off-white)
  - Foreground: `#1d2544` (Dark Navy)
- **Component Source**: Always use shared components from `packages/ui`. Import them using the `@workspace/ui` alias (e.g., `@workspace/ui/components/button`).
- **Progress Tracking**: After completing significant tasks, update `PRD.md` to mark progress.

## Project Architecture
- **Monorepo**: Turborepo with npm workspaces.
- **Apps**:
  - `apps/web`: Next.js 15 App Router application.
- **Packages**:
  - `packages/ui`: Shared shadcn/ui component library (`packages/ui/src/components`).
  - `packages/eslint-config`: Shared ESLint configurations.
  - `packages/typescript-config`: Shared TypeScript configurations.

## Development Workflow
- **Commands**:
  - `npm run dev`: Start all apps.
  - `npm run build`: Build all apps.
  - `npm run lint`: Lint all apps.
  - `npm run format`: Format all apps.
  - `npm run typecheck`: Type-check all apps.
- **Adding UI Components**:
  - Use `npx shadcn@latest add <component>` from within `apps/web` to add components to `packages/ui/src/components/`.
- **Testing**: (To be defined as testing infrastructure is established).

## Technical Conventions
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS with Vanilla CSS where specific overrides are needed.
- **Icons**: Lucide React (standard with shadcn/ui).
- **Forms**: React Hook Form with Zod for validation.
- **Database**: Supabase (referenced in `lib/db` and `lib/services/supabase.ts`).

## File Structure Reference
- `apps/web/app/`: Routes and layouts.
- `apps/web/components/`: App-specific components.
- `packages/ui/src/components/`: Shared shadcn components.
- `packages/ui/src/styles/globals.css`: Global styles and Tailwind variables.
