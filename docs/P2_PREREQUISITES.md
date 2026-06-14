# P2 — Prerequisites & Information Needed

**Ägare:** Anthony Foran (P2)
**Uppdaterat:** 2026-05-28

---

## Från Anna (via Robert — Team Leader)

### Krävs innan Sprint 1 startar
| # | Vad | Varför | Status |
|---|---|---|---|
| 1 | Varumärkesfärger (hex-koder) — navy, vit, accent | Tailwind-konfiguration | `BLOCKED` |
| 2 | Typsnitt / font-val | Tailwind + CSS | `BLOCKED` |
| 3 | Logotype-filer (SVG/PNG) — Boost + FC Rosengård | Header + footer | `BLOCKED` |
| 4 | Finansiär- & partner-logotyper — ESF, Arvsfonden, Arbetsförmedlingen, Malmö stad, FC Rosengård | Footer + projektsidor | `BLOCKED` |
| 5 | Google Form embed-URL | Anmälan-sidan (iframe) | `BLOCKED` |
| 6 | Befintligt innehåll från WordPress — texter, bilder, tidslinjedata | Alla sidor behöver riktigt innehåll | `BLOCKED` |

### Bra att ha under Sprint 1-2
| # | Vad | Varför | Status |
|---|---|---|---|
| 7 | Nya finansiär-/partnertexter (en mening per aktör) | Footer + projektsidor | `BLOCKED` |
| 8 | Deltagarberättelser / historier | Om oss — historier-sektion | `BLOCKED` |
| 9 | Ungdomarnas exempel-sajter | Designinspiration | `BLOCKED` |
| 10 | Boosts historia-text + FCR-relation | Om oss — historia-sektion | `BLOCKED` |

---

## Från Marcus (P1 — Hygraph CMS)

| # | Vad | När jag behöver det | Status |
|---|---|---|---|
| 11 | Hygraph GraphQL endpoint (staging) | Sprint 3 (vecka 5) — men ju förr desto bättre | `WAITING` |
| 12 | Content model schemas — GraphQL types per model | Sprint 2-3 (vecka 3-5) | `WAITING` |
| 13 | API-nyckel / auth-krav för Hygraph Content API | Sprint 3 (vecka 5) | `WAITING` |
| 14 | `/api/contact` endpoint live | Sprint 3 (vecka 5-6) | `WAITING` |
| 15 | CORS bekräftat för min React-app | Sprint 3 (vecka 5) | `WAITING` |

### Document types jag behöver schema för
- **Project** — Aktiva initiativ
- **Initiative** — Tidslinjeposter
- **Page** — Generella sidor
- **Faq** — Vanliga frågor
- **Post** — Nyheter/blogg
- **Material** — Metodmaterial
- **Financier** — Finansiärer + partners (uppdaterad modell med beskrivningsfält)

---

## Från Mohand (P4 — DevOps)

| # | Vad | När jag behöver det | Status |
|---|---|---|---|
| 16 | Repo-struktur bekräftad (`apps/public-site/`) | Innan jag scaffolfar — NOW | `WAITING` |
| 17 | Staging-URL | Sprint 4-5 (vecka 7-10) | `WAITING` |
| 18 | CI/CD pipeline live | Sprint 1 (vecka 1) — P4 levererar | `WAITING` |

---

## Referensmaterial att spara

| # | Vad | Länk / plats |
|---|---|---|
| 19 | valmaendearenan.se | https://valmaendearenan.se — modell för Metodmaterial |
| 20 | Befintlig boostbyfcr.se | Skärmdumpa ALLT innan DNS-cutover |
| 21 | Hygraph CMS docs | https://hygraph.com/docs |
| 22 | TanStack Query docs | https://tanstack.com/query/latest |

---

## Åtgärder

- [ ] Be Robert mejla Anna om #1-6 (blockerar Sprint 1)
- [ ] Be Robert mejla Anna om #7-10 (behövs senast Sprint 2)
- [ ] Synka med Marcus om #11-15 på första standup
- [ ] Bekräfta repo-struktur med Mohand (#16) innan scaffold
