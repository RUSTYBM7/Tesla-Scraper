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
- **Preview path**: `/`
- **Port**: `$PORT` (env-assigned)
- **Purpose**: Educational pixel-perfect clone of Tesla.com homepage for studying UI/UX

**Components:**
- `Header.tsx` — Fixed header, transparent→solid on scroll, mega-menu dropdowns with real vehicle/energy images
- `HeroSlider.tsx` — Full-viewport 4-slide hero (FSD, Model Y, Model 3, Cybertruck) with crossfade, autoplay, pause/play, dot indicators
- `VehicleGrid.tsx` — 2-col grid of 5 vehicle cards (Model S/Y/3/X/Cybertruck) with IntersectionObserver scroll animation, hover zoom
- `EnergySection.tsx` — 2×2 grid: Solar Panels, Powerwall, Solar Roof, Megapack — real photos with scroll-in animation
- `ChargingSection.tsx` — Full-height Supercharger section with stats (45K+ chargers, 15 min, 99.97%)
- `FSDSection.tsx` — Full-height FSD section with highway photo
- `AccessoriesSection.tsx` — 4-column shop grid: Charging, Vehicle Accessories, Apparel, Lifestyle
- `BottomBar.tsx` — Fixed bottom bar: "Ask a Question" + "Schedule a Drive Today"
- `Footer.tsx` — Footer with Tesla links

**Assets** (`public/`):
- 50+ locally served images (downloaded from Unsplash + Tesla CDN)
- Vehicle photos, energy section photos, grid images, hero slides
- All images served locally (Tesla CDN blocks browser cross-origin requests)

**Key design details:**
- Tesla CDN (digitalassets.tesla.com) blocks browser requests → all images are downloaded and served locally
- Scroll-triggered fade-in via IntersectionObserver on every section
- Ken Burns (scale) hover effect on all photo cards
- Backdrop-filter blur on all CTA buttons
- Header uses `window.scrollY > 20` to switch transparent↔solid

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Disclaimer

This project is strictly for **educational and learning purposes** — studying modern web design, UI/UX patterns, responsive behavior, and frontend animations. It is not affiliated with or endorsed by Tesla, Inc. All Tesla trademarks, product names, and brand assets belong to Tesla, Inc.
