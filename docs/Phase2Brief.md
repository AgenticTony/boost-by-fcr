# Phase 2 Brief — Boost by FC Rosengård

**Project:** boostbyfcr.se Redesign, Phase 2 Completion
**Stack:** Next.js 14 App Router / Tailwind CSS / shadcn/ui / Framer Motion / TypeScript
**Package manager:** pnpm
**Date:** May 2026

---

## Design System (Locked Tokens)

These tokens are taken directly from `tailwind.config.ts`. Do not invent values outside this system.

### Colours

| Tailwind class | Hex | Usage |
|---|---|---|
| `bg-brand-navy` | `#1A2E5A` | Hero backgrounds, dark sections, nav, footer |
| `bg-brand-gold` | `#F0A500` | Primary CTAs, stat numbers, highlight accents |
| `bg-brand-teal` | `#0D9488` | Overline labels (youth pages), icon badges, links |
| `bg-surface` | `#F8F7F4` | Light section backgrounds (default page surface) |
| `bg-surface-dark` | `#1E293B` | Footer background |
| `text-text` | `#111827` | Body text on light backgrounds (never grey below this) |
| `text-text-muted` | `#6B7280` | Secondary/caption text on light backgrounds |
| `text-white` | `#FFFFFF` | Text on navy/dark backgrounds |
| `border-border` | CSS variable | Card borders, dividers (resolves to `#E5E7EB`) |
| `bg-success` | `#10B981` | Form success states, Hälsospåret accent |
| `bg-error` | `#F43F5E` | Form validation errors |

### Typography

| Element | Font family | Weight | Tailwind classes |
|---|---|---|---|
| Display / Hero H1 | `font-display` (Plus Jakarta Sans) | 800 | `text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold` |
| H2 Section heading | `font-display` | 700 | `text-3xl md:text-[2.5rem] font-display font-extrabold` |
| H3 Card title | `font-display` | 600 | `font-display font-semibold text-lg` |
| Category overline | `font-body` (Inter) | 500 | `text-xs font-body font-medium tracking-widest uppercase` |
| Body | `font-body` | 400 | `text-text-muted leading-relaxed` |
| Button | `font-display` | 600 | `font-display font-semibold` |

**Overline colour rule:** Gold (`text-brand-gold`) on navy backgrounds. Teal (`text-brand-teal`) on light/off-white backgrounds. Employer-facing pages (Företag) use gold even on light backgrounds.

### Spacing

- Section padding: `py-12 md:py-16` for content sections, `py-20 md:py-28` for hero sections
- Inter-section gaps: maximum 64px on desktop
- Container max-width: `max-w-container` (1280px)
- Content max-width: `max-w-3xl` (768px) for text-heavy sections

### Component Patterns

**Primary button:** `bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta px-8 h-12`

**Secondary button (outline on navy):** `border-2 border-white/50 text-white hover:bg-white/10 rounded-cta px-8 h-12 bg-transparent`

**Ghost/link button:** `text-brand-teal font-medium hover:underline` with `ArrowRight` icon suffix

**Standard card:** `bg-white rounded-2xl p-6 md:p-8 border border-border/60` with optional `hover:shadow-md transition-shadow`

**Icon badge (teal):** `inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-teal text-white`

**Icon badge (gold):** `inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-gold text-brand-navy`

---

## Phase 1 — Already Completed

These items are done and need no further work:

- [x] Navigation architecture: "För dig" mega-menu, "För företag" link, "Om Boost" dropdown, "Kontakt", gold "Anmäl dig" CTA pill
- [x] Both dropdowns have icons with track-specific colours
- [x] Mobile drawer navigation (slide-in from left)
- [x] Colour palette applied consistently sitewide
- [x] Typography system (Plus Jakarta Sans + Inter)
- [x] Homepage: split hero with headline + 2 CTAs + photography
- [x] Homepage: impact counter strip (200-300 / 100-150 / 8 av 10)
- [x] Homepage: "Vårt arbetssätt" section with photo
- [x] Homepage: three track cards with photography + icons + track colours
- [x] Homepage: Bridge by FCR callout card
- [x] Homepage: FAQ section (2 questions)
- [x] Homepage: Agenda 2030 values grid (6 cards)
- [x] All track pages: Arbetssökande, Studier, Hälsospåret (hero + content + feature cards)
- [x] Track-specific accent colours (teal for Studier, gold for Arbete, emerald for Hälsa)
- [x] Hälsospåret: hero photo added (track-health.jpg background)
- [x] Arbetssökande: full 6-question FAQ
- [x] Företag: hero + intro + 6-step recruitment process grid + CSR section + Käthe contact card
- [x] Käthe contact card: gold left-border accent, navy background, gold border
- [x] Företag: step number badges enlarged (h-12 w-12)
- [x] Vad vi gör: mission + three branches (Fabriken/Akademin/Labbet), icon badges standardised to teal
- [x] Vem vi är: organisational story + 5 value promise cards
- [x] Kontakt: two-column layout (info left + form right), gold icon accents on contact info
- [x] Press & Media: media contact (Ann Sigvant), brand name, logo placeholders
- [x] Lediga Tjänster: stub page with spontaneous application CTA
- [x] Bridge: standalone page with programme info + CTA
- [x] Dataskyddspolicy: stub page
- [x] Custom 404 page
- [x] Footer: 4-column link structure, contact info, partner logo placeholders
- [x] Ghost CTA button: fixed to border-2 with pure white text
- [x] Global spacing: reduced from py-20/py-28 to py-12/py-16 on all content sections
- [x] All 12 routes build and resolve correctly
- [x] Button component: asChild properly implemented via Radix Slot

---

## Phase 2 — Remaining Work

### ITEM 1 — Anmälan / Registration Page ✅ COMPLETED
**Priority: CRITICAL**
**Route:** `/anmal-dig`
**Time estimate:** 1 day

**Implementation notes (2026-05-23):**
- Built as client component with React Hook Form + Zod validation
- Native form (not Google Form iframe) — ready to wire to backend endpoint
- All fields validated: förnamn, efternamn, e-post, telefon, spår (select), om dig (optional textarea)
- Full error states with `aria-describedby` and `aria-invalid` for a11y
- Success state with CheckCircle icon and confirmation text
- "What happens next" 3-step section with gold badges and connector line
- All site-wide "Anmäl dig" CTAs updated to `/anmal-dig` (navbar, homepage hero, track pages, Bridge page, Bridge callout card)
- **Pending:** Google Form URL from client to wire up actual submission (server actions log to console for now)

**What to build:**

Hero section (navy background):
- Overline: "KOM IGÅNG" in teal
- H1: "Ta första steget."
- Sub-copy: "Det tar ungefär tre minuter. Du behöver inte ha allt klart — bara vara redo att börja."
- No hero image — keep it focused

Reassurance strip (off-white, `py-8`):
- 3-column icon row: Clock ("Tar 3 minuter"), Shield ("Dina uppgifter är trygga"), MessageCircle ("Vi hör av oss inom en arbetsdag")
- Teal icon badges, dark-text labels

Form section (off-white):
- H2: "Fyll i dina uppgifter"
- **Implementation:** Embed the client's existing Google Form via `<iframe>`, wrapped in a white card (`bg-white rounded-2xl p-6 shadow-sm`). The iframe is the simplest approach that matches what the client asked for — data goes directly to their system, nothing stays on the site.
- If the Google Form URL is not yet available: build a native form (Förnamn, Efternamn, E-post, Telefon, Vilket spår? [select], Berätta kort om dig [textarea]) with React Hook Form + Zod, but wire it to POST to the Google Form endpoint once available.
- Submit button: full-width gold pill "Skicka anmälan →"
- Success state: replace form with teal `CheckCircle` icon + "Tack — vi hör av oss snart" confirmation

"What happens next" section (navy background):
- 3 numbered steps with gold circle badges: (1) "Vi läser din anmälan" (2) "En vägledare kontaktar dig" (3) "Vi bokar ett första möte"
- Horizontal connector line between steps (hidden on mobile)

**Nav update:** Change all "Anmäl dig" button `href` values from `/kontakt` to `/anmal-dig` across:
- Navbar gold pill CTA
- Homepage hero
- Arbetssökande hero
- Studier closing CTA
- Hälsospåret closing CTA
- Bridge page CTA
- Homepage Bridge callout card

---

### ITEM 2 — Företag Page Restructure ✅ COMPLETED
**Priority: HIGH**
**Route:** `/foretag` (existing page, restructure in place)
**Time estimate:** 1 day

**Implementation notes (2026-05-23):**
- Hero updated: new overline "FÖR FÖRETAG OCH ORGANISATIONER", H1 "Bygg något meningsfullt med oss", updated sub-copy
- New primary offering section with 3-column card grid: Föreläsningar (Mic icon), Workshops & utbildning (Users icon), Nätverk & samverkan (Network icon) — all with gold icon badges
- Gold CTA "Berätta om ert uppdrag →" links to `/kontakt?amne=foretag` with subject prefill
- Existing 6-step recruitment grid moved below offerings section as secondary
- Käthe contact card moved to navy closing section with `mailto:` gold CTA button

**New page structure:**

Hero (keep existing format, update copy):
- Overline: "FÖR FÖRETAG OCH ORGANISATIONER" in gold
- H1: "Bygg något meningsfullt med oss"
- Sub-copy: "Vi samarbetar med arbetsgivare och organisationer som vill göra skillnad — genom föreläsningar, nätverk, workshops och inkluderande rekrytering."

Section 1 — Primary offering (off-white):
- Overline: "VÅRT ERBJUDANDE" in teal
- H2: "Mer än rekrytering — ett partnerskap med mening"
- 3-column card grid:
  - **Föreläsningar** (gold badge, Mic icon): "Inspirerande föreläsningar om inkludering, normer på arbetsmarknaden och psykisk hälsa."
  - **Workshops & utbildning** (gold badge, Users icon): "Interaktiva workshops med konkreta verktyg — från rekrytering utan fördomar till dialog om välmående."
  - **Nätverk & samverkan** (gold badge, Network icon): "Bli del av ett nätverk av arbetsgivare som vill bidra till ett mer inkluderande Malmö."
- Below grid: gold CTA "Berätta om ert uppdrag →" linking to `/kontakt`

Section 2 — Recruitment support (white background, secondary):
- Overline: "REKRYTERING" in teal
- H2: "Hitta din nästa medarbetare"
- Keep the existing 6-step process grid — it's well built
- Move this section BELOW the offerings section — recruitment is no longer the lead

Section 3 — Contact closing (navy background):
- Keep existing Käthe contact card (already has gold left border)
- Gold CTA: "Skicka ett mejl →" linking to `mailto:kathe.andersson@boostbyfcr.se`

---

### ITEM 3 — Bridge by FCR Project Page (Enhanced) ✅ COMPLETED
**Priority: HIGH**
**Route:** `/bridge` (existing page, expand content)
**Time estimate:** 1 day

**Implementation notes (2026-05-23):**
- Programme detail section: two-column layout with H2 + body left, eligibility card (navy) + includes card (white) right
- Eligibility card: "Passar det här mig?" with teal CheckCircle icons (18–29 år, inskriven på Arbetsförmedlingen, vill ha intensivt stöd)
- "Det här ingår" card: personlig vägledare, CV + intervjuträning, samarbete med Arbetsförmedlingen, stöd under hela processen
- Methodology section: 3 icon cards (Individuellt anpassat, Holistiskt angreppssätt, Samarbete med myndigheter) with teal badges
- Funder section: legally required ESF acknowledgement with placeholder logo row (EU Socialfonden, Arbetsförmedlingen, Malmö Stad)
- CTA updated to `/anmal-dig`
- **Pending:** Actual SVG logos from client for funder section

**Programme detail section** (off-white):
- Two-column layout: H2 "Vad är Bridge by FCR?" + body text left, navy card with eligibility criteria right
- Eligibility card: "Passar det här mig?" with teal Check icons: 18–29 år, inskriven på Arbetsförmedlingen, vill ha intensivt stöd
- "Det här ingår" bullet list with Check icons: personlig vägledare, CV + intervjuträning, samarbete med Arbetsförmedlingen, stöd under hela processen

**Methodology section** (off-white):
- 3 icon cards: "Individuellt anpassat", "Holistiskt angreppssätt", "Samarbete med myndigheter"

**Funder section** (white, `py-12`, border-bottom):
- H3: "Bridge by FCR finansieras av Europeiska Unionen"
- Body: "Det här projektet har mottagit finansiering från Europeiska Socialfonden."
- Logo row: EU Socialfonden co-financing badge + Arbetsförmedlingen logo + Malmö Stad logo
- **This section is legally required for ESF-funded projects.** Logos must be sourced as SVGs from the respective organisations.

**CTA update:** Change "Anmäl dig till Bridge" to link to `/anmal-dig`

---

### ITEM 4 — Nyheter / News Section ✅ COMPLETED
**Priority: HIGH**
**Route:** `/nyheter` (listing) + `/nyheter/[slug]` (article detail)
**Time estimate:** 2–3 days (including Sanity setup)

**Implementation notes (2026-05-24):**
- Listing page: navy hero, 3-column card grid with featured images, category pills, date formatting
- Filter bar: sticky, pill buttons for Alla/Projekt/Resultat/Team/Samarbeten with `aria-current` for a11y
- Article detail: hero image with gradient overlay, narrow content column, back link, PortableText renderer for body
- Homepage: `<LatestNews />` component fetches 3 most recent, wrapped in `<Suspense>` so homepage doesn't block on Sanity
- Sanity query deduplication: `getNewsArticle()` uses `React.cache()` to avoid double-fetch between `generateMetadata` and page component
- `generateStaticParams` enabled for ISR on article pages
- Shared utils extracted to `src/lib/news-utils.ts` (formatDate, categoryLabels, categoryColors)
- Metadata uses root layout `title.template` — pages set short titles only
- **Pending:** Client to provide at least 3 initial articles to populate the grid

**Nav placement:** Add "Nyheter" as a top-level item between "Om Boost" and "Kontakt", with Lucide `Newspaper` icon in dropdown-style

**Listing page (`/nyheter`):**
- Hero: navy, overline "AKTUELLT", H1 "Nyheter och uppdateringar"
- 3-column card grid (2 on tablet, 1 on mobile)
- Each card: featured image (16:9), category pill, date, headline (line-clamp-2), excerpt (line-clamp-3), "Läs mer →" teal link
- Filter bar: "Alla | Arbete | Studier | Hälsa | Projekt | Samarbeten" as pill buttons
- Pagination or "Ladda fler →" gold outline button

**Homepage integration:**
- Add a "Senaste från Boost" section between "Välj ditt spår" and the Bridge callout
- Show the 3 most recent articles as cards
- "Se alla nyheter →" link at bottom

**Article detail page (`/nyheter/[slug]`):**
- Narrow content column (max-w-3xl), hero image, category + date, H1 headline, body text
- "← Alla nyheter" back link

**Sanity schema for news:**
```
title: string
slug: slug
publishedAt: datetime
category: select (Projekt / Resultat / Team / Samarbeten)
mainImage: image with alt
excerpt: text (200 chars)
body: portable text / block content
author: string
```

---

### ITEM 5 — Vår Historia / Timeline Page ✅ COMPLETED
**Priority: MEDIUM-HIGH**
**Route:** `/var-historia`
**Nav placement:** Under "Om Boost" dropdown, with Lucide `Clock` icon
**Time estimate:** 1.5–2 days

**Implementation notes (2026-05-25):**
- Route: `/var-historia` with `layout.tsx` (metadata) + `page.tsx` (async server component)
- Navy hero: gold overline "SEDAN 2003", H1 "Över 20 år av förändring", sub-copy
- Vertical timeline: gold centre line (2px), alternating L/R cards on desktop, single-column left-aligned on mobile
- Each entry: gold year pill, navy node (16px, 2px gold border — last node filled gold), optional teal funder pill, optional image
- 9 placeholder entries from 2003–2026; Sanity `timelineEntry` documents override placeholders when present
- `timelineQuery` updated to exclude drafts (`!(_id in path("drafts.**"))`)
- Closing CTA: "Vill du vara en del av nästa kapitel?" + gold "Kontakta oss →" linking to `/kontakt`
- Added to header "Om Boost" dropdown with `Clock` icon and footer "Om Boost" section
- **Pending:** Client to provide actual organisational history data

Client's specific vision: "Jag hade istället önskat en del med alla våra tidigare initiativ och projekt. Jag ser nästan en tidslinje framför mig med alla olika verksamheter vi haft."

**Hero (navy):**
- Overline: "SEDAN 2003" in gold
- H1: "Över 20 år av förändring"
- Sub-copy: "Boost by FC Rosengård har sedan starten arbetat med hundratals initiativ och samarbeten. Här är vår resa."

**Timeline component (off-white):**
- Vertical centre line (2px `border-brand-gold`)
- Alternating left/right cards on desktop, single-column left-aligned on mobile
- Each entry: year badge (gold pill), project name (H3), description (2–3 lines), funder badge if applicable (teal pill), optional thumbnail image
- Timeline nodes: 16px navy circle with 2px gold border

**Placeholder entries (client to confirm actual history):**
- 2003 — Boost grundades som del av FC Rosengård
- 2005–2008 — Tidiga arbetsmarknadsprogram
- 2010 — Studiespåret etableras
- 2013 — Hälsospåret introduceras
- 2016 — Första ESF-finansierade projektet
- 2019 — Bridge by FCR pilot
- 2022 — Nya metodmaterial publicerade
- 2024 — Handboksutveckling påbörjas
- 2026 — Nu

**Closing CTA (navy):** "Vill du vara en del av nästa kapitel?" + gold "Kontakta oss →"

**Sanity schema:**
```
year: number
projectName: string
funder: string (optional)
description: text
image: image (optional)
```

---

### ITEM 6 — Resurser / Methodology Library
**Priority: MEDIUM**
**Route:** `/resurser`
**Nav placement:** Top-level nav item "Resurser"
**Time estimate:** 3–4 days (including auth)
**Reference site:** valmaendearenan.se

**Prerequisite:** Auth system (see Item 9).

**Hero (navy):**
- Overline: "METODMATERIAL" in gold
- H1: "Verktyg för ett mer inkluderande arbetsliv"
- Sub-copy: "Här delar vi med oss av de metoder och material vi arbetar med."

**Public resources section (off-white):**
- Filter bar: category pills (Alla / Normer / Hälsa / Arbetsmarknad / Handböcker)
- 3-column card grid
- Each card: icon badge, title, description (3 lines), format badge ("PDF"), file size, gold download button "Ladda ner →"
- First resource: "Prata normer på arbetsmarknaden" (existing material)

**Gated resources section (white background):**
- Same card grid but with lock overlay
- Overlay: semi-transparent white with Lucide `Lock` icon + "Kräver inloggning" text
- "Logga in →" button (indigo accent)
- Upcoming material marked with "Kommer snart" teal badge instead of lock

**Auth approach (simple):**
- Use NextAuth.js with credentials provider
- Admin creates accounts via Sanity Studio
- Each user gets individual email + password
- Protected routes check session via middleware
- Login modal: email + password fields, "Begär behörighet" link below

**Sanity schema:**
```
title: string
slug: slug
category: select
description: text
isGated: boolean
coverImage: image
body: portable text
downloadFile: file
tags: string[]
```

---

### ITEM 7 — Vem vi är Page Additions ✅ COMPLETED
**Priority: MEDIUM**
**Route:** `/vem-vi-ar` (existing page, add sections)
**Time estimate:** 1 day

**Implementation notes (2026-05-24):**
- Results section added: navy background, 2-column layout with stats in 2x2 grid (gold numerals + white labels)
- Agenda 2030 grid moved from homepage to bottom of `/vem-vi-ar` — shortens homepage by ~30%
- Team section added: "Möt teamet bakom Boost" with Anna Nettrup (Projektledare) and Käthe Andersson (Samarbetsansvarig) as initial-based avatar cards
- **Pending:** Client to provide team photos and confirm full team roster

**Addition 1 — Results section (navy background):**
- 2-column: H2 "Vad vi åstadkommer" + supporting text left, 4 stats in 2x2 grid right
- Stats: "200–300 deltagare till jobb varje år", "100–150 börjar studera varje år", "8 av 10 nöjda deltagare", "Över 20 år i verksamhet"
- Same gold-numeral + white-label treatment as homepage stats strip

**Addition 2 — Move Agenda 2030 here:**
- Move the 6-card Hållbarhet grid from the homepage to the bottom of `/vem-vi-ar`
- This shortens the homepage by ~30% and puts sustainability in its proper context

**Addition 3 — Team section (off-white):**
- H2: "Möt teamet bakom Boost"
- Minimum: Anna Nettrup (Projektledare) and Käthe Andersson (Samarbetsansvarig) as profile cards
- If no photos: use initial-based avatars (navy circle, white initials)

---

### ITEM 8 — Stat Strips on Track Pages ✅ COMPLETED
**Priority: MEDIUM**
**Time estimate:** half day

**Implementation notes (2026-05-24):**
- 3-stat horizontal band added to all 4 track pages (Studier, Arbetssökande, Hälsospåret, Bridge)
- Gold numeral + label treatment matching homepage stats strip
- Positioned between existing sections matching each page's background rhythm

Add a 3-stat horizontal band to each track page:

- `/studier`: "100–150 börjar studera varje år" / "Legitimerade lärare" / "Individuell studieplan"
- `/arbetssokande`: "200–300 till anställning varje år" / "Brett nätverk av arbetsgivare" / "8 av 10 nöjda deltagare"
- `/halsosparet`: "Fysisk träning ingår" / "Kostworkshops" / "Samtal om välmående"
- `/bridge`: "18–29 år" / "ESF-finansierat" / "Samarbete med Arbetsförmedlingen"

Component: 3-column grid, gold large number or icon, label below. Place between existing sections, matching the background rhythm of each page.

---

### ITEM 9 — Sanity CMS Setup ✅ COMPLETED
**Priority: BLOCKING — required before Items 4, 5, 6**
**Time estimate:** 2 days

**Implementation notes (2026-05-24):**
- Sanity Studio mounted at `/studio` route with Basic Auth middleware in production (`STUDIO_PASSWORD` env var)
- Schemas defined: news articles, timeline entries, resources, job listings, blockContent
- GROQ queries for all content types with draft exclusion (`!(_id in path("drafts.**"))`)
- Image URL helper via `@sanity/image-url`
- PortableText renderer with styled blocks (h2–h4, blockquote, lists, images, links)
- `sanityFetch` returns `null` when unconfigured (graceful degradation, triggers 404 for single-doc queries)
- Draft mode API routes at `/api/draft/enable` and `/api/draft/disable` — require `SANITY_DRAFT_SECRET` token for auth
- Environment: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_DRAFT_SECRET` in `.env.local`
- Unblocked: Nyheter (Item 4 ✅), Timeline (Item 5), Resurser (Item 6), Lediga Tjänster dynamic

Set up Sanity v3 as the headless CMS:

1. Install Sanity dependencies (`next-sanity`, `@sanity/client`, `@sanity/image-url`)
2. Create Sanity Studio at `/studio` route (or separate deployment)
3. Define schemas: news articles, timeline entries, resources, job listings
4. Configure GROQ queries for each content type
5. Set up image CDN via `@sanity/image-url`
6. Environment: `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`

This unblocks: Nyheter (Item 4), Timeline (Item 5), Resurser (Item 6), and makes Lediga Tjänster dynamic.

---

### ITEM 10 — Kontakt Page Fixes ✅ COMPLETED
**Priority: MEDIUM**
**Route:** `/kontakt`
**Time estimate:** 1 day

**Implementation notes (2026-05-23):**
- Hero: background photo with navy overlay (using hero-foretag.jpg as placeholder)
- Subject routing: `useSearchParams()` reads `?amne=foretag` and prefills "Företagssamarbete" in subject dropdown — wrapped in Suspense boundary for SSR compatibility
- Form validation: React Hook Form + Zod, all fields required (Namn, E-post, Ämne, Meddelande), red asterisks on labels, `border-error` on invalid inputs, `text-error text-sm` error messages with `role="alert"`
- Success state: CheckCircle icon + "Tack för ditt meddelande! Vi hör av oss inom en arbetsdag."
- Map: embedded Google Maps iframe centered on Norra Grängesbergsgatan 15
- Subject dropdown now has 6 options (Allmän fråga, Företagssamarbete, Föreläsning/Workshop, Press & Media, Lediga tjänster, Annat)
- **Pending:** Client to provide dedicated contact hero photo

**Fix 1 — Hero photo:** Add a background photograph. Use a warm Malmö cityscape or welcoming office interior. Apply standard navy overlay at ~60% opacity.

**Fix 2 — Subject routing from Företag:** When arriving from `/kontakt?amne=foretag`, pre-populate the Ämne field. Use `useSearchParams()` to read the query param.

**Fix 3 — Form validation:** Add React Hook Form + Zod:
- Required fields: Namn, E-post, Meddelande (red asterisk on label)
- Error state: input border `border-error`, error message below in `text-error text-sm`
- Success state: replace form with `CheckCircle` icon + "Tack för ditt meddelande! Vi hör av oss inom en arbetsdag."

**Fix 4 — Map:** Either integrate Mapbox GL JS (style: light-v11, centre on Norra Grängesbergsgatan 15, zoom 15, custom navy marker) or embed a static Google Maps iframe. Token in `.env.local`.

---

### ITEM 11 — Homepage Additions & Removals ✅ COMPLETED
**Priority: MEDIUM**
**Time estimate:** 1 day

**Implementation notes (2026-05-25):**
- Fourth stat added: "2003" / "Sedan starten" — grid shifted from `md:grid-cols-3` to `md:grid-cols-4` (2-col on mobile)
- Funder logo bar added above footer: white section, "Finansieras och stöds av" label, 5 partner placeholders (EU Socialfonden, Allmänna Arvsfonden, Arbetsförmedlingen, Malmö Stad, FC Rosengård) with grayscale→colour hover
- News strip: already done in Sprint 2 via `<LatestNews />` component (extracted to `src/components/sections/LatestNews.tsx`)
- Agenda 2030: already moved to `/vem-vi-ar` in Sprint 2
- **Pending:** Partner SVG logos from client organisations

**Add — News strip:** After "Välj ditt spår" section, before Bridge callout. Show 3 most recent articles from Sanity. Depends on Item 9.

**Add — Fourth stat:** Add "2003" to the stats strip as a fourth column. Label: "Sedan starten". Shifts grid from 3-col to 4-col on desktop.

**Remove — Agenda 2030 section:** Move to `/vem-vi-ar` (Item 7). Shortens homepage scroll by ~30%.

**Add — Funder logo bar:** Above the footer (not inside it), white background, "Finansieras och stöds av" label, horizontal row of partner logos (grayscale default, full colour on hover). Logos needed: ESF, Allmänna Arvsfonden, Arbetsförmedlingen, Malmö Stad, FC Rosengård. Source as SVGs from each organisation's press kit.

---

### ITEM 12 — Footer Partner Logos ✅ COMPLETED
**Priority: MEDIUM (asset-dependent)**
**Time estimate:** 2 hours (code) + waiting on client for SVG assets

**Implementation notes (2026-05-25):**
- Partner list updated to 5: EU Socialfonden, Allmänna Arvsfonden, FC Rosengård, Arbetsförmedlingen, Malmö Stad
- Styled containers: `rounded-xl`, `bg-white/5`, `border border-white/10`, `grayscale hover:grayscale-0` transition
- `aria-label` added on each logo span for accessibility
- Text placeholders with org names (SVGs pending from client)

Replace the four text placeholders with real logo assets. Implementation:
- Each logo in a white rounded-xl container (if footer stays dark)
- Max height: 36px, auto width
- Grayscale by default, full colour on hover
- Flex row, `gap-8`, `justify-center`, `flex-wrap`

**Logo sources:**
- EU Socialfonden: official co-financing badge from esf.se (legally required on ESF-funded projects)
- FC Rosengård: request from the club
- Arbetsförmedlingen: press kit from arbetsformedlingen.se
- Malmö Stad: press resources from malmo.se

Do not use rasterised screenshots. If SVGs are not yet available, use grey rounded rectangles with org name as alt text.

---

### ITEM 13 — Accessibility Pass ✅ COMPLETED
**Priority: MEDIUM**
**Time estimate:** 1 day

**Implementation notes (2026-05-23):**
- Skip-to-content link: already in place in layout.tsx — "Hoppa till huvudinnehåll", positioned top-left, visible on focus
- Focus indicators: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold` applied globally in globals.css
- Reduced motion: `prefers-reduced-motion` media query in globals.css for CSS animations; `useReducedMotion()` hook from Framer Motion added to header dropdowns and mobile drawer
- Form ARIA: all form fields on `/anmal-dig` and `/kontakt` have `aria-describedby` for error messages, `aria-invalid` on validation failure, `role="alert"` on error text, visible `<Label>` components
- Alt text audit: all decorative hero background images correctly use `alt=""` (WCAG compliant for decorative images); all meaningful images have Swedish descriptive alt text

---

## Delivery Sequence

### Sprint 1 — Functional completeness (1 week) ✅ COMPLETED 2026-05-23
| Item | Est. | Status |
|---|---|---|
| Anmälan page (Item 1) | 1 day | ✅ Done |
| Företag restructure (Item 2) | 1 day | ✅ Done |
| Bridge page expansion (Item 3) | 1 day | ✅ Done |
| Kontakt fixes (Item 10) | 1 day | ✅ Done |
| Accessibility pass (Item 13) | 1 day | ✅ Done |

### Sprint 2 — CMS + Content (1.5 weeks) ✅ COMPLETED 2026-05-24
| Item | Est. | Status |
|---|---|---|
| Sanity CMS setup (Item 9) | 2 days | ✅ Done |
| Nyheter section (Item 4) | 2–3 days | ✅ Done |
| Vem vi är additions (Item 7) | 1 day | ✅ Done |
| Stat strips on track pages (Item 8) | 0.5 day | ✅ Done |

### Code Review Fix Pass — 2026-05-24
| Finding | Severity | Status |
|---|---|---|
| Draft mode API routes unauthenticated | Critical | ✅ Fixed — requires `SANITY_DRAFT_SECRET` token |
| Forms silently discard submitted data | Critical | ✅ Fixed — server actions log submissions, ready for Google Form/email wiring |
| Duplicate Sanity fetch on article pages | High | ✅ Fixed — `React.cache()` via `getNewsArticle()` helper |
| Metadata duplication (hardcoded suffix) | High | ✅ Fixed — root layout uses `title.template` pattern |
| PortableText undefined href guard | High | ✅ Fixed — renders children only when href missing |
| Studio route publicly accessible | Medium | ✅ Fixed — Basic Auth middleware in production |
| Homepage blocks on Sanity fetch | Medium | ✅ Fixed — `<Suspense>` boundary around `<LatestNews />` |
| Draft articles accessible via URL | Medium | ✅ Fixed — `newsBySlugQuery` excludes drafts |
| Phone validation too permissive | Medium | ✅ Fixed — regex + min 7 chars |
| Filter bar missing accessible state | Medium | ✅ Fixed — `aria-current="page"` on active pill |
| Sanity client type cast masks errors | Medium | ✅ Fixed — returns `null` instead of `[]` |
| Duplicate formatDate/category maps | Low | ✅ Fixed — extracted to `src/lib/news-utils.ts` |
| Track option typo "hjälpmig" | Low | ✅ Fixed — "hjälp mig" |
| Missing generateStaticParams for articles | Low | ✅ Fixed — ISR enabled for `/nyheter/[slug]` |
| Header dropdowns not keyboard-accessible | Low | ✅ Fixed — Enter/Space/Escape handlers + aria attributes |
| Google Maps coordinates slightly off | Low | ✅ Fixed — corrected to 13.7585, 55.5867 |
| News schema preview media cast | Low | ✅ Fixed — removed incorrect string cast |

### Sprint 3 — New features (1.5 weeks) ✅ COMPLETED 2026-05-25
| Item | Est. | Status |
|---|---|---|
| Vår historia timeline (Item 5) | 2 days | ✅ Done |
| Homepage additions/removals (Item 11) | 1 day | ✅ Done |
| Footer partner logos (Item 12) | 0.5 day + client assets | ✅ Done |

### Sprint 4 — Advanced (1 week)
| Item | Est. | Status |
|---|---|---|
| Resurser + auth layer (Item 6) | 3–4 days | ⬜ Not started |

**Total remaining estimate: ~16–17 working days**

---

## Client Assets Needed

These items block completion regardless of code:

1. **Google Form URL** for anmälan (Item 1) — ask client for the existing form link (server actions log to console in the meantime)
2. **Organisational history data** for timeline (Item 5) — years, project names, funders
3. **Partner logos as SVG** (Items 3, 11, 12) — ESF, Arbetsförmedlingen, Malmö Stad, FC Rosengård
4. **Method materials files** (Item 6) — PDFs, handbooks, exercise sheets
5. **Team member details** (Item 7) — names, roles, photos (currently using initial-based avatars)
6. ~~**Företag content** (Item 2)~~ — resolved with placeholder content
7. **News content** (Item 4) — at least 3 articles to populate initial grid
8. ~~**Mapbox API key** (Item 10)~~ — using Google Maps iframe instead
9. **Contact photo** for Kontakt hero (Item 10) — currently using hero-foretag.jpg as placeholder
10. **Bridge programme details** (Item 3) — methodology content, specific eligibility requirements

### Environment Variables Required

| Variable | Purpose | Required by |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier | CMS (Item 9) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (default: `production`) | CMS (Item 9) |
| `SANITY_DRAFT_SECRET` | Shared secret for draft mode API | Draft preview |
| `STUDIO_PASSWORD` | Basic Auth password for `/studio` in production | CMS (Item 9) |
