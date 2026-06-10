# P2 — Push Plan

**Repo:** https://github.com/AgenticTony/boost-by-fcr
**Owner:** Anthony (P2)
**Started:** 2026-06-09

---

## Workflow per push

```bash
git fetch origin
git checkout -b <branch-name> origin/main
git cherry-pick <commit-sha> [commit-sha...]
git push origin <branch-name>
gh pr create --title "<title>" --body "<description>"
# After review: gh pr merge <PR-number> --squash
```

---

## Day 1 (Mon) — Scaffold ✅

| | |
|---|---|
| **Branch** | `feature/p2-code-splitting` |
| **PR** | #1 — https://github.com/AgenticTony/boost-by-fcr/pull/1 |
| **Commits** | `aa0535b` |
| **Status** | ✅ Pushed, awaiting review |

**Scope:** Project setup, React Router 19 routes, Tailwind v4 brand tokens, base components, all 19 page shells with mock data, code-splitting, error boundary.

---

## Day 1b — Nav Fix

| | |
|---|---|
| **Branch** | `fix/p2-mobile-nav` |
| **Commits** | `dd7c942` |
| **Status** | 🔲 Not started |

**Scope:**
- Fix mobile nav drawer not rendering with Tailwind v4 + framer-motion

**PR title:** `fix(p2): mobile nav drawer not rendering with Tailwind v4 + framer-motion`

**PR body:**
```
## What
Fixes the mobile navigation drawer that broke with Tailwind v4 class detection and framer-motion animations.

## Includes
- Mobile nav drawer rendering fix
- Tailwind v4 compatibility for motion-animated elements

## How to verify
- `npm run dev` — open on mobile viewport
- Tap hamburger menu — drawer slides in correctly
- Test on Chrome mobile emulation + real device
```

---

## Day 2 (Tue) — Production Hardening

| | |
|---|---|
| **Branch** | `feature/p2-production-hardening` |
| **Commits** | `52aa3f6`, `e287703` |
| **Status** | 🔲 Not started |

**Scope:**
- Typad API-klient-arkitektur (CMS-agnostic adapter)
- TanStack Query v5 integration med caching (staleTime, gcTime)
- Hygraph GraphQL integration (migrated from Umbraco mock)
- React Error Boundary med fallback UI
- SEO: `useSeo` hook med react-helmet-async (unique title + description per route)
- README update (Hygraph CMS, Alan in team)

**PR title:** `feat(p2): production-readiness — types, TanStack Query, error boundary, SEO`

**PR body:**
```
## What
Architecture hardening — API layer, data fetching, error handling, per-page SEO.

## Includes
- Typed API adapter (CMS-agnostic, Hygraph implementation)
- TanStack Query v5 with staleTime/gcTime caching
- Hygraph GraphQL integration replacing mock data
- React Error Boundary with user-friendly fallback
- useSeo hook — unique title + meta description on all 19 routes
- README updated: Hygraph CMS, team table

## How to verify
- `npm run dev` — all pages load with real data from Hygraph
- View page source — each page has unique `<title>` and `<meta name="description">`
- Kill network — error boundary shows fallback UI
```

---

## Day 3 (Wed) — Creative Redesign

| | |
|---|---|
| **Branch** | `feature/p2-creative-redesign` |
| **Commits** | `1fdd8a7` |
| **Status** | 🔲 Not started |

**Scope:**
- Homepage: animated hero with decorative rings, gradient orbs, pull quote
- Stats section: CountUp numbers, glow effects, bullseye circles
- Three tracks: tree-branch metaphor, real photos, parallax
- Navigation: restructured per Anna's specs (Om oss dropdown, separated routes)
- New components: count-up, parallax-image, tree-roots-connector, promise-icons
- CSS animations (float, drift, pulse-glow) with prefers-reduced-motion
- Dual-red color system (brand red vs error red)
- Promise icons, illustration images, video asset
- Registration form ARIA + autocomplete + native required

**PR title:** `feat(p2): creative redesign — homepage, nav, animations, brand assets`

**PR body:**
```
## What
Visual redesign following Anna's brand direction — Montserrat, navy/red/cream palette, animations.

## Includes
- Animated hero with decorative rings, gradient orbs
- Stats section with CountUp, glow effects
- Three tracks with real photos and tree-branch layout
- New UI components: count-up, parallax-image, tree-roots-connector, promise-icons
- CSS animations (float, drift, pulse-glow) respecting prefers-reduced-motion
- Dual-red system: brand red for CTAs, darker red for errors
- Restructured navigation matching Anna's specifications
- Form accessibility: aria-invalid, aria-describedby, autocomplete attrs
- Brand assets: promise icons, illustrations, video

## How to verify
- `npm run dev` — homepage should show animated hero, stats, tracks
- Test mobile nav — dropdown works, links navigate correctly
- Test `/anmal-dig` — form validation with ARIA attributes
```

---

## Day 4 (Thu) — UX Audit Fixes

| | |
|---|---|
| **Branch** | `feature/p2-ux-audit` |
| **Commits** | `828d7d6`, `ee3980a` |
| **Status** | 🔲 Not started |

**Scope:**
- Hero alt text on 4 program pages (descriptive Swedish alt)
- H1 sizing standardized across all 17 inner pages (lg:text-[3.5rem])
- Error boundary marked complete in roadmap
- JSON-LD: Organization schema on all pages, Article schema on news
- robots.txt
- Image optimization: loading=lazy + decoding=async on all non-hero images
- Contrast fixes: footer text, brand-red eyebrow on dark surfaces
- Lighthouse: Accessibility 96, SEO 100, Performance 80
- P2_ROADMAP Sprint 3+4 updated

**PR title:** `fix(p2): UX audit — accessibility, JSON-LD, image optimization, Lighthouse 96/100/80`

**PR body:**
```
## What
Full UX audit fixes — accessibility, SEO structured data, image optimization.

## Includes
- Descriptive alt text on hero images (4 program pages)
- H1 sizing standardized (text-4xl → text-5xl → lg:text-[3.5rem]) on all 17 pages
- JSON-LD: Organization schema on all pages, Article schema on news pages
- robots.txt
- Image optimization: loading=lazy + decoding=async
- Contrast fixes: footer white/70, brand-red/80 on track labels
- Error boundary marked complete

## Lighthouse (production build)
- Accessibility: 96 ✅
- SEO: 100 ✅
- Performance: 80 (Framer Motion bundle — separate optimization)

## How to verify
- `npm run build && npx vite preview`
- Run Lighthouse — scores should match above
- Check page source — JSON-LD script tags present
```

---

## Day 5 (Fri) — Polish

| | |
|---|---|
| **Branch** | `feature/p2-polish` |
| **Commits** | `29b33cc`, `377c596` |
| **Status** | 🔲 Not started |

**Scope:**
- ESF section: 3-tier layout (icon fact chips → vision quote → glass logo plate)
- Sponsor band: navy/80 bg, red bottom border, optically-weighted logos
- Hero stats: reduced from 9xl to 8xl (subordinate to 80px H1)
- Tightened hero spacing for cohesive unit
- Arbetsförmedlingen logo sized larger for optical balance

**PR title:** `fix(p2): polish — sponsor band, ESF section, hero stats hierarchy`

**PR body:**
```
## What
Final polish pass — sponsor section, ESF section balance, hero typography hierarchy.

## Includes
- Sponsor band: distinct navy/80 surface with red border, separated from footer
  - Optically-weighted logos (AF larger), brand-red-bright eyebrow
- ESF section: three balanced tiers
  - Fact chips with icons in bordered panel + red accent
  - Vision quote card (unchanged)
  - Glass logo plate with full-color logos
- Hero stats: reduced from lg:text-9xl (128px) to lg:text-8xl (96px)
  - H1 (80px) remains largest type on page
  - Tightened section padding for cohesive hero unit

## How to verify
- `npm run dev` — scroll homepage
- Sponsor logos clearly separated from footer
- ESF section right column has 3 even tiers
- Stats numbers smaller than headline
```

---

## Day 6 — Code Review Fixes

| | |
|---|---|
| **Branch** | `fix/p2-code-review` |
| **Commits** | `edc73fb`, `9fb9b4a` |
| **Status** | 🔲 Not started |

**Scope:**
- Critical, high, and medium severity fixes from full code review
- Remaining MEDIUM/LOW fixes
- Security, accessibility, and correctness patches across components

**PR title:** `fix(p2): code review — critical, high, and medium severity fixes`

**PR body:**
```
## What
Addresses findings from full project code review — critical, high, medium, and low severity fixes.

## Includes
- Critical and high severity fixes (error handling, type safety)
- Medium severity fixes (accessibility, UX)
- Low severity fixes (code style, minor improvements)

## How to verify
- `npm run dev` — all pages render correctly
- `npx tsc --noEmit` — zero type errors
- `npx vitest run` — all tests pass
```

---

## Day 7 — GDPR Dataskyddspolicy Page

| | |
|---|---|
| **Branch** | `feature/p2-dataskyddspolicy` |
| **Commits** | `cbf12ba`, `d578ec4` |
| **Status** | 🔲 Not started |

**Scope:**
- Full GDPR dataskyddspolicy content from legal document
- Redesigned page with Lucide icons, inline TOC card, styled table (§2)
- Alternating section backgrounds, navy-tinted headers
- Mobile-responsive layout
- All legal text preserved verbatim

**PR title:** `feat(p2): GDPR dataskyddspolicy — full legal content + redesigned page`

**PR body:**
```
## What
Adds the complete GDPR data protection policy page with full legal content and polished design.

## Includes
- Full dataskyddspolicy content from legal document (all sections verbatim)
- Redesigned page: Lucide icons, inline TOC card, styled tables
- Alternating section backgrounds, navy-tinted headers
- Mobile-responsive layout with collapsible sections

## How to verify
- `npm run dev` → navigate to `/dataskyddspolicy`
- Verify all 9 legal sections render correctly
- Test mobile layout — TOC collapses, table scrolls horizontally
- Verify all legal text matches source document
```

---

## Day 8 — Test Suite

| | |
|---|---|
| **Branch** | `feature/p2-test-suite` |
| **Commits** | `ad73e71` |
| **Status** | 🔲 Not started |

**Scope:**
- 120 tests across 17 files — unit, hook, component, integration
- Full coverage for UI components, hooks, pages, and form validation

**PR title:** `test(p2): add 120 tests across 17 files — unit, hook, component, integration`

**PR body:**
```
## What
Comprehensive test suite — 120 tests covering components, hooks, pages, and integration.

## Includes
- Unit tests for UI components (accordion, button, input)
- Hook tests (useSeo)
- Component tests (form validation, navigation)
- Integration tests (page rendering, routing)
- Total: 120 tests across 17 test files

## How to verify
- `npx vitest run` — 120/120 pass
- `npx tsc --noEmit` — zero type errors
```

---

## Day 9 — Home Refactor

| | |
|---|---|
| **Branch** | `refactor/p2-home-sections` |
| **Commits** | `01905b9` |
| **Status** | 🔲 Not started |

**Note:** Must come after Day 5–8 — the refactor extracts sections from a home.tsx built up across creative redesign, UX audit, polish, and code review.

**Scope:**
- Break 896-line monolithic home.tsx into 8 focused section components
- Shared WaveDivider moved to components/ui/
- home.tsx becomes ~36 lines of pure composition

**PR title:** `refactor(p2): extract home.tsx into 8 section components and shared WaveDivider`

**PR body:**
```
## What
Breaks the monolithic 896-line home.tsx into focused, single-responsibility section components.

## Includes
- home.tsx: 896 → 36 lines (pure composition)
- 8 section components in sections/home/
- WaveDivider moved to components/ui/ for reuse
- Zero behavioral changes

## How to verify
- `npm run dev` — homepage renders identically
- `npx tsc --noEmit` — zero type errors
- `npx vitest run` — all tests pass
```

---

## Side PRs

| Branch | Commits | Title | Status |
|--------|---------|-------|--------|
| `chore/p2-gitignore-docs` | `f1382c8`, `6c1ebeb` | `chore: gitignore + project docs` | 🔲 Not started |

> ⚠️ Must be merged **before Day 6** — `6c1ebeb` creates `docs/P2_PREREQUISITES.md` which Day 6 (`edc73fb`) modifies.

---

## Commit reference

```
aa0535b  feat: add public-site with code-splitting, strict TS, and error handling
dd7c942  fix: mobile nav drawer not rendering with Tailwind v4 + framer-motion
52aa3f6  feat: production-readiness hardening — types, API adapter, TanStack Query, error boundary, SEO
e287703  docs: update README — switch to Hygraph CMS, add Alan to team
828d7d6  fix: UX audit — hero alt text, H1 sizing, error boundary, roadmap sync
ee3980a  feat: complete Sprint 4 — JSON-LD, robots.txt, image optimization, Lighthouse 96/100/80
1fdd8a7  feat: creative redesign — homepage, nav, animations, brand assets
29b33cc  fix: redesign ESF section + sponsor band — cream partners strip, balanced tiers, legible logos
377c596  fix: polish homepage — sponsor band, ESF section, hero stats hierarchy
edc73fb  fix: code review — critical, high, and medium severity fixes
9fb9b4a  fix: remaining MEDIUM/LOW code review fixes
cbf12ba  feat: add full GDPR dataskyddspolicy content from legal document
d578ec4  feat: redesign dataskyddspolicy page — icons, TOC, styled table, contact CTA
ad73e71  test: add 120 tests across 17 files — unit, hook, component, integration
01905b9  refactor: extract home.tsx into 8 section components and shared WaveDivider
f1382c8  chore: gitignore Anna_client_docs/
6c1ebeb  docs: add project briefs, brand guide, copy docs, and roadmap prerequisites
```
