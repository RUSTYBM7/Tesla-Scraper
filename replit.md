# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains a Tesla.com homepage clone for educational/learning purposes.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### `artifacts/tesla-clone` — Tesla Homepage Clone (Educational)
- **Framework**: React + Vite, plain inline styles (no Tailwind/shadcn)
- **Routing**: React Router v6 (multi-page)
- **Preview path**: `/`
- **Port**: `$PORT` (env-assigned)
- **Purpose**: Educational pixel-perfect clone of Tesla.com homepage

**Routes:**
- `/` → `HomePage` — full scrolling homepage with hero slider, vehicle grid, energy, charging, FSD, accessories sections
- `/vehicles/:slug` → `VehiclePage` — per-vehicle configurator (slug: `model-s`, `model-3`, `model-y`, `model-x`, `cybertruck`)
- `*` → `NotFound` — 404 page

**Components:**
- `Header.tsx` — Fixed header, transparent→solid on scroll, uses `useNavigate` for vehicle links
- `HeroSlider.tsx` — Full-viewport 4-slide hero (Model Y, Model 3, FSD, Cybertruck) with crossfade, autoplay, dot indicators
- `VehicleGrid.tsx` — 2-col grid of 5 vehicle cards with hover zoom (Ken Burns), horizontal color/trim carousels
- `EnergySection.tsx` — 2×2 grid: Solar Panels, Powerwall, Solar Roof, Megapack — scroll-in animation
- `ChargingSection.tsx` — Full-height Supercharger section with stats
- `FSDSection.tsx` — Full-height FSD section with highway photo
- `AccessoriesSection.tsx` — 4-column shop grid
- `BottomBar.tsx` — Fixed bottom bar: "Ask a Question" + "Schedule a Drive Today"
- `Footer.tsx` — Footer with Tesla links
- `VehiclePage.tsx` — Full configurator: parallax hero, trim selector, color picker, specs bar, CTA buttons

**Parallax Architecture (IMPORTANT — do not mix transforms):**
- `containerRef` → section element (position: relative)
- `bgRef` → outer div (top:-20%, height:140%) — receives `translateY` ONLY from `use-parallax.ts` hook
- inner div inside bgRef → receives `scale` ONLY from React `hovered` state
- NEVER mix translateY + scale on the same element — causes visual glitches

**Confirmed Good Images** (no rival brand cars):
- `hero-model-3.jpg` — white Tesla Model 3 on mountain road ✓
- `hero-model-y.jpg` — red Tesla headlight close-up ✓
- `hero-model-y-wide.jpg` — red Model Y wide shot ✓
- `hero-highway.jpg` — open desert highway, no cars ✓
- `tesla-supercharger-new.jpg` — Tesla Supercharger station ✓
- `model-x-candidate2.jpg` — dark gray Tesla at sunset ✓
- `fsd-night.jpg` — night/atmospheric shot ✓

**Confirmed Bad Images** (non-Tesla cars — do NOT use for vehicle heroes):
- `hero-model-s.jpg`, `hero-model-x.jpg`, `hero-cybertruck.jpg`, `hero-sedan.jpg`
- `tesla-model-x-new.jpg`, `truck-candidate.jpg`, `tesla-model-s-new.jpg`, `tesla-model-s2.jpg`
- `tesla-model3-red.jpg` (Hyundai), `tesla-interior-2.jpg` (Bugatti)

**Current Image Assignments:**
- Model S hero/grid: `hero-model-3.jpg` (white Tesla sedan)
- Model 3 hero/grid: `hero-model-3.jpg` ✓
- Model Y hero/grid: `hero-model-y.jpg` ✓
- Model X hero/grid: `model-x-candidate2.jpg` (dark gray Tesla at sunset)
- Cybertruck hero/grid: `hero-highway.jpg` (desert highway)
- HeroSlider Cybertruck slide: `fsd-night.jpg`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages (0 errors confirmed)
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Disclaimer

This project is strictly for **educational and learning purposes** — studying modern web design, UI/UX patterns, responsive behavior, and frontend animations. It is not affiliated with or endorsed by Tesla, Inc. All Tesla trademarks, product names, and brand assets belong to Tesla, Inc.
