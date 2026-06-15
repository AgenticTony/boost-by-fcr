Plan: Redesign All Pages to Match Homepage Standard

Context

The homepage was redesigned with a rich visual language (Framer Motion animations, ScrollReveal, WaveDividers, parallax, glass morphism, staggered card reveals, decorative blobs). All 17 other pages are visually plain — they use brand colors and basic navy heroes, but have zero animations, no section transitions, and no visual polish. This makes the site feel disjointed: the homepage is alive, every other page is static. The goal is to bring every page up to the homepage standard so the entire site feels cohesive.

Scope

- 16 pages redesigned (dataskyddspolicy skipped — legal page with its own design)
- 4 extraction refactors (vem-vi-ar, kontakt, anmal-dig, bridge)
- Batch execution: Track pages → Om Oss cluster → Utility → Light touch
- Skip: dataskyddspolicy.tsx (632 lines, legal text)

Universal Pattern (applied to ALL pages)

Every page gets this baseline before any page-specific work:

Pattern: Hero upgrade
Implementation: Wrap H1/subtitle in ScrollReveal direction="up".
Add WaveDivider color="navy" layered below hero.
────────────────────────────────────────
Pattern: Section transitions
Implementation: Alternating bg: white → bg-surface →
bg-brand-navy. WaveDivider between navy↔white transitions.
────────────────────────────────────────
Pattern: All sections
Implementation: Wrapped in ScrollReveal direction="up"
────────────────────────────────────────
Pattern: Card grids
Implementation: Each card wrapped in ScrollReveal with staggered
delay (0, 0.1, 0.2, ...)
────────────────────────────────────────
Pattern: Card styling
Implementation: White/surface: bg-white rounded-2xl border
border-border/60 shadow-sm hover:shadow-md transition-all.
Navy: bg-white/6 backdrop-blur-sm border border-white/10
(glass).
────────────────────────────────────────
Pattern: Spacing
Implementation: All py-12 md:py-16 → py-16 md:py-24. Heroes stay
at py-20 md:py-28.
────────────────────────────────────────
Pattern: Bottom CTAs
Implementation: Navy bg, centered text, bg-brand-red-bright
text-white rounded-full shadow-lg button.

Reusable components: ScrollReveal, WaveDivider, CountUp, ParallaxImage, Button

---

Batch 1: Track Pages (3 pages)

Sister pages with identical structure. Redesign as a batch for consistency.

arbetssokande.tsx (124→~200 lines)

- Hero: ScrollReveal + WaveDivider
- Methods grid: 3 icon cards with staggered ScrollReveal
- FAQ: Wrap each item in ScrollReveal
- NEW bottom CTA section (navy, "Redo att ta steget?" → /anmal-dig)

studier.tsx (154→~200 lines)

- Hero: ScrollReveal + WaveDivider
- Stats bar: Replace static numbers with CountUp. Glass chips on navy bg.
- Features grid: 4 cards with staggered ScrollReveal. Upgrade card styling.
- CTA: Wrap in ScrollReveal

halsosparet.tsx (161→~210 lines)

- Hero: ScrollReveal + WaveDivider
- Intro 2-col: Text ScrollReveal left, image ScrollReveal right
- Stats bar: CountUp + glass chips
- Features grid: 4 cards with staggered ScrollReveal
- CTA: Fix button color to brand-red (currently brand-navy)

Commit: feat(design): upgrade track pages with homepage design language

---

Batch 2: Om Oss Cluster (4 pages)

vem-vi-ar.tsx (428 lines) — EXTRACT FIRST

- hero-section.tsx — ScrollReveal + WaveDivider
- intro-section.tsx — 2-col with image, ScrollReveal left/right
- promises-section.tsx — 5 cards, staggered ScrollReveal
- stats-section.tsx — CountUp (7500, 3800), decorative blob
- what-we-do-section.tsx — ScrollReveal
- tracks-section.tsx — 3 cards, staggered
- success-factors-section.tsx — staggered cards
- team-section.tsx — staggered avatars
- agenda-section.tsx — 6 goal cards, staggered

Page becomes thin shell (~30 lines) importing all sections.

Commit: refactor(vem-vi-ar): extract 9 sections and apply homepage design patterns

vad-vi-gor.tsx (66→~90 lines)

- Hero: ScrollReveal + WaveDivider
- Branch cards: 3 cards staggered, upgraded from bg-[#072D59]/5 to bg-white rounded-2xl border shadow-sm

var-historia.tsx (104→~140 lines)

- Hero: ScrollReveal + WaveDivider
- Timeline: Each entry in ScrollReveal with stagger. Enhanced dots.
- NEW bottom CTA section (navy, "Vill du veta mer?" → /vem-vi-ar)

bridge.tsx (249 lines)

- Already closest to homepage. Add ScrollReveal to all sections + WaveDividers.
- Glass fact chips get

Commits: Separate per page: feat(design): upgrade [page] with animations

---

Batch 3: Utility Pages (6 pages)

kontakt.tsx (292 lines) — EXTRACT

Extract to components/sections/kontakt/:

- hero-section.tsx — ScrollReveal + WaveDivider
- contact-form-section.tsx — Form wrapped in ScrollReveal

anmal-dig.tsx (345 lines) — EXTRACT

Extract to components/sections/anmal-dig/:

- hero-section.tsx — ScrollReveal + WaveDivider
- trust-bar-section.tsx — Staggered icons
- form-section.tsx — Form wrapped in ScrollReveal
- steps-section.tsx — Glass step circles, staggered

nyheter.tsx (134→~160 lines)

- Hero: Add blur blob + ScrollReveal + WaveDivider
- Article grid: Each card in ScrollReveal with stagger

nyheter-slug.tsx (136→~155 lines)

- Article image + content wrapped in ScrollReveal

resurser.tsx (174→~200 lines)

- Hero: blur blob + ScrollReveal + WaveDivider
- Resource cards: staggered ScrollReveal, hover effects

- Hero: ScrollReveal + WaveDivider
- FAQ sections: ScrollReveal on headings
- Bottom CTA: Upgrade to navy glass card with WaveDivider transition

Commits: 2–3 commits grouping related pages

---

Batch 4: Light Touch (3 pages)

lediga-tjanster.tsx (73→~85 lines)

- Hero: blur blob + ScrollReveal + WaveDivider
- Content: ScrollReveal wrapper

press-media.tsx (105→~120 lines)

- Hero: blur blob + ScrollReveal + WaveDivider
- Contact cards: staggered ScrollReveal

not-found.tsx (34→~40 lines)

- Single ScrollReveal wrapper. Add bg-gradient. Keep minimal.

Commit: feat(design): light animation pass on jobs, press, and 404 pages

---

New Files to Create

components/sections/vem-vi-ar/
├── hero-section.tsx
├── intro-section.tsx
├── promises-section

- CTA: Wrap in ScrollReveal

halsosparet.tsx (161→~210 lines)

- Hero: ScrollReveal + WaveDivider
- Intro 2-col: Text ScrollReveal left, image ScrollReveal right
- Stats bar: CountUp + glass chips
- Features grid: 4 cards with staggered ScrollReveal
- CTA: Fix button color to brand-red (currently brand-navy)

Commit: feat(design): upgrade track pages with homepage design language

---

Batch 2: Om Oss Cluster (4 pages)

vem-vi-ar.tsx (428 lines) — EXTRACT FIRST

Extract to components/sections/vem-vi-ar/:

- hero-section.tsx — ScrollReveal + WaveDivider
- intro-section.tsx — 2-col with image, ScrollReveal left/right
- promises-section.tsx — 5 cards, staggered ScrollReveal
- stats-section.tsx — CountUp (7500, 3800), decorative blob
- what-we-do-section.tsx — ScrollReveal
- tracks-section.tsx — 3 cards, staggered
- success-factors-section.tsx — staggered cards
- team-section.tsx — staggered avatars
- agenda-section.tsx — 6 goal cards, staggered

Page becomes thin shell (~30 lines) importing all sections.

Commit: refactor(vem-vi-ar): extract 9 sections and apply homepage design patterns

vad-vi-gor.tsx (66→~90 lines)

- Hero: ScrollReveal + WaveDivider
- Branch cards: 3 cards staggered, upgraded from bg-[#072D59]/5 to bg-white rounded-2xl border shadow-sm

var-historia.tsx (104→~140 lines)

- Hero: ScrollReveal + WaveDivider
- Timeline: Each entry in ScrollReveal with stagger. Enhanced dots.
- NEW bottom CTA section (navy, "Vill du veta mer?" → /vem-vi-ar)

bridge.tsx (249 lines)

- Already closest to homepage. Add ScrollReveal to all sections + WaveDividers.
- Glass fact chips get stagger animation.
- CTA button upgraded to rounded-full shadow-lg.

Commits: Separate per page: feat(design): upgrade [page] with animations

---

Batch 3: Utility Pages (6 pages)

kontakt.tsx (292 lines) — EXTRACT

Extract to components/sections/kontakt/:

- hero-section.tsx — ScrollReveal + WaveDivider
- contact-form-section.tsx — Form wrapped in ScrollReveal

anmal-dig.tsx (345 lines) — EXTRACT

Extract to components/sections/anmal-dig/:

- hero-section.tsx — ScrollReveal + WaveDivider
- trust-bar-section.tsx — Staggered icons
- form-section.tsx — Form wrapped in ScrollReveal
- steps-section.tsx — Glass step circles, staggered

nyheter.tsx (134→~160 lines)

- Hero: Add blur blob + ScrollReveal + WaveDivider
- Article grid: Each card in ScrollReveal with stagger

nyheter-slug.tsx (136→~155 lines)

- Article image + content wrapped in ScrollReveal

resurser.tsx (174→~200 lines)

- Hero: blur blob + ScrollReveal + WaveDivider
- Resource cards: staggered ScrollReveal, hover effects

vanliga-fragor.tsx (157→~190 lines)

- Hero: ScrollReveal + WaveDivider
- FAQ sections: ScrollReveal on headings
- Bottom CTA: Upgrade to navy glass card with WaveDivider transition

Commits: 2–3 commits grouping related pages

---

Batch 4: Light Touch (3 pages)

lediga-tjanster.tsx (73→~85 lines)

- Hero: blur blob + ScrollReveal + WaveDivider
- Content: ScrollReveal wrapper

press-media.tsx (105→~120 lines)

- Hero: blur blob + ScrollReveal + WaveDivider
- Contact cards: staggered ScrollReveal

not-found.tsx (34→~40 lines)

- Single ScrollReveal wrapper. Add bg-gradient. Keep minimal.

Commit: feat(design): light animation pass on jobs, press, and 404 pages

---

New Files to Create

components/sections/vem-vi-ar/
├── hero-section.tsx
├── intro-section.tsx
components/sections/anmal-dig/
├── hero-section.tsx
├── trust-bar-section.tsx
├── form-section.tsx
└── steps-section.tsx

Files Modified

All 16 page files in src/pages/, plus the new section files above.

Key Reference Files

- src/components/ui/scroll-reveal.tsx — API: direction (up/left/right), delay, className
- src/components/ui/wave-divider.tsx — API: color ("navy"), flip, layered
- src/components/ui/count-up.tsx — API: target, duration, suffix, className
- src/components/ui/parallax-image.tsx — API: src, alt, speed, className
- src/components/sections/home/hero-section.tsx — Homepage hero reference pattern

Verification

1. After each batch: pnpm test — existing 120 tests must pass (kontakt/anmal-dig tests test DOM content, not animations)
2. After each batch: pnpm dev — visual check each page:

- ScrollReveal triggers on scroll
- WaveDividers render between sections
- CountUp animates numbers
- Glass cards render on navy backgrounds
- Section backgrounds alternate correctly
- CTA buttons are brand-red rounded-full

3. After all: pnpm build — confirm production build succeeds
4. Accessibility: prefers-reduced-motion works (built into ScrollReveal/CountUp)
5. TypeScript: npx tsc --noEmit — zero errors after each batch

Total Estimate

- ~16 pages redesigned
- ~15 new section component files
- ~8 commits
- Pages touched: arbetssokande, studier, halsosparet, foretag, vad-vi-gor, vem-vi-ar, var-historia, bridge, kontakt, anmal-dig, nyheter, nyheter-slug, resurser, vanliga-fragor, lediga-tjanster, press-media, not-found

nyheter-slug.tsx (136→~155 lines)

- Article image + content wrapped in ScrollReveal

resurser.tsx (174→~200 lines)

- Hero: blur blob + ScrollReveal + WaveDivider
- Resource cards: staggered Scrol

- Single ScrollReveal wrapper. Add bg-gradient. Keep minimal.

Commit: feat(design): light animation pass on jobs, press, and 404 pages

---

New Files to Create

components/sections/vem-vi-ar/
├── hero-section.tsx
├── intro-section.tsx
├── promises-section.tsx
├── stats-section.tsx
├── what-we-do-section.tsx
├── tracks-section.tsx

All 16 page files in src/pages/, plus the new section files above.

Key Reference Files

- src/components/ui/scroll-reveal.tsx — API: direction (up/left/right), delay, className
- src/components/ui/wave-divider.tsx — API: color ("navy"), flip, layered
- src/components/ui/count-up.tsx
