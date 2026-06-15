# P2 — Publik Frontend Roadmap

**Roll:** Anthony Foran
**Timmar:** ~75h över 10 veckor
**Sprint-längd:** 2 veckor (5 sprints)

---

## Beroenden — vad jag MÅSTE vänta på

| Blockerad av | Vad jag behöver | När P1/P4 levererar | Min mitigering |
|---|---|---|---|
| **P1 (Marcus)** | Document types + Delivery API aktiverat | Vecka 1: första doc type (Project). Vecka 2: alla klara | Jobba med mock-data vecka 1-2 |
| **P1 (Marcus)** | `/api/contact` endpoint | Vecka 3-4 | Bygg formulär-UI först, koppla ihop sen |
| **P1 (Marcus)** | Hygraph schema (för TypeScript-typer) | Vecka 2 | Använd egna typer initialt, generera om sen |
| **P4 (Mohand)** | CI/CD pipeline + staging-miljö | Vecka 1 | Sätt upp lokalt med Vite dev server |
| **P4 (Mohand)** | Domän + SSL i prod | Vecka 9 | Ingen blocker — jag deployar till staging |

### Kan jag starta direkt?
**Ja.** Allt i Sprint 1-2 kan byggas med mock-data. Jag blockerar inte på P1 förrän Sprint 3 (API-integration).

---

## Sprint-plan

### Sprint 1 (Vecka 1-2) — Foundation & Static Pages
**~15h** | Status: `DONE`

- [x] Projektuppsättning: Vite + React 19 + TypeScript 6
- [x] Tailwind CSS v4 konfigurerat med Boosts varumärkesfärger (navy/vit)
- [x] shadcn/ui installerat och konfigurerat (button, card, input, label, separator, textarea)
- [x] React Router v7 uppsatt med alla publika rutter (18 rutter)
- [x] Typad API-klient-arkitektur (mock-data först — CMS-agnostic)
- [x] Delade komponenter: Header, Footer, Navigation (mobilförst)
- [x] Delade komponenter: Button, Card, Container, SectionHeading
- [x] Sida: **Hem** (hero + initiativ-höjdpunkter + finansiärlogotyper — mock)
- [x] Sida: **Anmälan** (custom form med React Hook Form + Zod — ej iFrame)
- [x] Sida: **Vanliga frågor** (FAQ-ackordeon med mock-data)

**Leverans:** Körbar React-app med 3 sidor, responsiv layout, mobil navigering.

---

### Sprint 2 (Vecka 3-4) — Remaining Pages + Content Structures
**~15h** | Status: `IN_PROGRESS`

- [x] Sida: **Arbetsspåret** (hero + stat + FAQ — mock)
- [x] Sida: **Studiespåret** (features + CTA — mock)
- [x] Sida: **Hälsospåret** (features + CTA — mock)
- [x] Sida: **Bridge by FCR** (ESF-projekt — mock)
- [x] Sida: **Företag & samarbeten** (rekryteringsstöd + partner-logotyper — mock)
- [x] Sida: **Vad vi gör** (Fabriken/Akademin/Labbet — mock)
- [x] Sida: **Vem vi är** (löften, stats, team, hållbarhet — mock)
- [x] Sida: **Vår historia** (tidslinje med statisk data — mock)
  - [x] Tidslinje-komponent (20+ år — statisk, Framer Motion läggs i polish)
  - [x] Boosts historia-sektion
  - [ ] Deltagarberättelser ("historier") — väntar på CMS
- [x] Sida: **Nyheter / blogg** (lista + detaljvy — mock)
- [x] Sida: **Publikt Metodmaterial** (översikt med kategorifilter — mock)
- [x] Sida: **Kontakt** (formulär + karta — mock)
- [x] Sida: **Press & media** (presskontakt — mock)
- [x] Sida: **Lediga tjänster** (spontanansökan — mock)
- [x] Sida: **Dataskyddspolicy** (platshållare)
- [x] Footer med finansiär- + partner-logotyper + en mening var
- [x] Loading- och error-states (skeleton loaders + React Error Boundary med fallback UI)

**Leverans:** Alla sidor byggda med mock-data. Full navigation. Responsivt.

---

### Sprint 3 (Vecka 5-6) — API Integration
**~15h** | Status: `PLANNED`

**NOTERING:** P1 migrerade från Umbraco till Hygraph CMS. Min frontend-integration (TanStack Query + GraphQL) genomfördes som del av Sprint 4-arbetet.

- [x] Integrera TanStack Query mot Hygraph GraphQL API
- [x] API-adapter-arkitektur (CMS-agnostic, typad)
- [x] Ersätta mock-data med riktiga API-anrop:
  - [x] Hem (initiativ, finansiärer)
  - [x] Nyheter / blogg
  - [x] Om oss (tidslinje + historier)
  - [x] Vårt arbetssätt
  - [x] Företag & samarbeten
  - [x] Publikt Metodmaterial
- [x] TypeScript-typer genererade från Hygraph-schema
- [x] Caching-strategi med TanStack Query (staleTime, gcTime)
- [x] Felhantering: nätverksfel, tomt innehåll, fallbacks

**Leverans:** Live-data från Hygraph CMS. Alla publika sidor fungerar end-to-end.

---

### Sprint 4 (Vecka 7-8) — SEO, Accessibility & Performance
**~18h** | Status: `DONE`

- [x] SEO: meta-tags, Open Graph per sida (react-helmet-async + useSeo hook)
- [x] SEO: dynamisk `<title>` och `<meta description>` per sida (19 unika titlar + beskrivningar)
- [x] SEO: strukturerad data (JSON-LD) — Organization schema på alla sidor, Article schema på nyhetssidor
- [x] SEO: robots.txt
- [x] Tillgänglighet-genomgång alla sidor:
  - [x] Tangentbordsnavigering (tab-order, focus states)
  - [x] Alt-texter på alla bilder (inkl. hero-bilder på 4 programsidor)
  - [x] Kontrastförhållanden (WCAG AA) — felröd mörkad till #B91C1C, varumärkesröd separerad, footer-vit mörkad till /70
  - [x] Semantisk HTML (landmarks, headings hierarchy)
  - [x] ARIA-labels på formulärfält (aria-invalid, aria-describedby, autocomplete)
  - [x] Skip-to-content-länk
  - [x] H1-storlek standardiserad (text-4xl → text-5xl → lg:text-[3.5rem]) på alla 17 inner-sidor
- [x] Responsiv testning: mobil (375px), tablet (768px), desktop (1280px+)
- [x] Lighthouse-audit (production build):
  - [x] Accessibility: 96 (target ≥95)
  - [x] SEO: 100 (target ≥95)
  - 🟡 Performance: 80 (target ≥90) — bunden till Framer Motion-bunt (456KB). CDN+Brotli skulle ge ~5-10 poäng extra
- [x] Bildoptimering (loading=lazy + decoding=async på alla icke-hero-bilder)
- [x] Bundle-optimering (code splitting per route med React.lazy)

**Leverans:** Tillgänglighet 96, SEO 100, Performance 80. Performance-luckan beror på Framer Motion-buntstorlek — separat optimeringsuppgift.

---

### Sprint 5 (Vecka 9-10) — Polish & Deployment
**~12h** | Status: `PLANNED`

- [ ] Visa一支irotering med P3 — backoffice-inställningar påverkar frontend?
- [ ] Sista design-justeringar baserat på Annas feedback
- [ ] Cross-browser testning (Chrome, Safari, Firefox, Edge, mobil-Safari)
- [ ] Produktionsbuild och deploy till staging
- [ ] DNS-cutover-stöd (P4 leder, jag stöttar)
- [ ] Smoke test i produktion
- [ ] Dokumentation: komponent-översikt för framtida utvecklare
- [ ] Handover: kort guide för hur frontend relaterar till Hygraph-innehåll

**Leverans:** Produktionssatt, dokumenterat, överlämnat.

---

## Timmar per sprint — sammanfattning

| Sprint | Veckor | Timmar | Fokus |
|---|---|---|---|
| 1 | 1-2 | ~15h | Projektuppsättning, komponenter, 3 första sidor |
| 2 | 3-4 | ~15h | Alla resterande sidor (mock), footer, tidslinje |
| 3 | 5-6 | ~15h | API-integration, ersätta mock med live-data |
| 4 | 7-8 | ~18h | SEO, tillgänglighet, prestanda, Lighthouse |
| 5 | 9-10 | ~12h | Polish, cross-browser, deploy, handover |
| **Totalt** | | **~75h** | |

---

## Kommunikation med teamet

| När | Med vem | Vad |
|---|---|---|
| Vecka 1 dag 1 | P4 (Mohand) | Stäm av repo-struktur + CI/CD expectations |
| Vecka 1 dag 1 | P1 (Marcus) | Be om första Delivery API-endpoint |
| Vecka 2 slutet | P1 (Marcus) | Bekräfta att alla document types är klara |
| Vecka 3 start | P1 (Marcus) | Få API-schema, generera TypeScript-typer |
| Vecka 4 | P1 (Marcus) | Få `/api/contact` endpoint för kontaktformulär |
| Vecka 5 | P3 (Robert) | Stäm av att footer-logotyper stämmer med backoffice-modellen |
| Löpande | Alla | Daglig standup 15 min |

---

## Teknikstack P2

```
React 19 + Vite 8 + TypeScript 6
Tailwind CSS v4 (CSS-first config) + shadcn/ui
React Router v7
TanStack Query v5 (Hygraph GraphQL integration)
React Hook Form + Zod
Framer Motion (animationer, hero, övergångar)
Lucide React (ikoner)
Hygraph CMS (migrerat från Umbraco)
React Helmet Async (SEO meta per sida)
Vitest + Testing Library (tester — ej uppsatt ännu)
Playwright (e2e — P4 leder, jag stöttar)
```
