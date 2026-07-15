# Boost by FCR — Remaining Work (by owner)

**Updated:** 2026-07-03
**Scope decision (Anna):** Only **News** is served from Hygraph. All other sections (Timeline, Resources, Aktiva initiativ, Vårt arbetssätt, etc.) stay **hardcoded** until further notice.

---

## Status at a glance

| Area | Status | Note |
|---|---|---|
| Public frontend | ~95% | Live on Vercel **and** Cloudflare; News from Hygraph; rest hardcoded |
| Hygraph CMS | ✅ **News only** | Anna wants other sections hardcoded — no more models needed for now |
| Cloudflare infra | ✅ **WORKING** | Both apps live on `*.pages.dev`; token fixed; `wrangler` deploy |
| Docs & training | not started | No Anna-facing guides/videos yet |
| Lighthouse | **87 / 100 / 96 / 100** | Perf needs SSG for 90+; SEO + Best Practices perfect |

## ✅ Done this sprint
- **News live** via Hygraph (`stage: PUBLISHED` fix).
- **Cloudflare deploy works** — both apps on `*.pages.dev`.
- **Locked-area login fixed** + redesign re-applied (#65).
- **Perf tuned** — self-hosted Montserrat (FCP 2.6→0.9s) + WebP images (107→28 KiB).
- **Contact form** + **Anmälan** (`/anmal-dig2`) live.

## Scope (Anna's call)
**Only News → Hygraph. Everything else hardcoded.** Therefore:
- Marcus does **NOT** need to build the 8 other models (deferred).
- Anthony builds remaining pages (Aktiva initiativ) with **hardcoded** content.
- The "mock → Hygraph" switch for Timeline/Resources is **cancelled**.

---

## P1 — Marcus (Hygraph CMS) — *downscoped*
✅ `News` model done + has published content.
- [ ] Give Anna Hygraph **editor access** (for news editing).
- [ ] (Optional) Document the news-publishing workflow for Anna.
- The 8 other models (`Project`, `Initiative`, `Page`, `Faq`, `Material`, `Exercise`, `MethodArticle`, `Financier`) are **deferred until further notice**.

## P2 — Anthony (Public Frontend) — *mostly done*
- [x] ~~Aktiva initiativ~~ — ✅ **already done.** The three spår = the initiatives: Arbetsspåret (`/arbetssokande`), Studiespåret (`/studier`), Hälsospåret (`/halsosparet`). List = home page `TracksSection`; detail = the individual pages. All hardcoded.
- [x] ~~Verify hardcoded content~~ — ✅ **confirmed.** Anna's docs (`Anna_client_docs/`) are used verbatim in the pages (spot-checked Arbetssökande: "Väx på ditt sätt hos oss", the FAQ, etc. all match her source).
- [ ] *(Minor)* The same FAQ appears on both `arbetssokande.tsx` (Anna's verbatim) and `vanliga-fragor.tsx` (a polished rewrite) — decide if they should be aligned.
- [ ] **Performance ≥ 90** — SSG the home (LCP 4.1s is hydration-bound; the home is already code-split).
- [ ] **A11y 96 → 100** — flagged contrast pair + hero video `<track>`/decorative.
- [ ] Image `width`/`height` attrs (CLS 0.037 → ~0).
- ~~Mock → Hygraph switch~~ — **cancelled** (staying hardcoded).
- ~~graphql-codegen~~ — deferred.

> Done: all current pages, News live, Anmälan, Kontakt, SEO 100, responsive + WCAG, self-hosted font + WebP.

## P3 — Robert (Documentation & Training)
- [ ] Guide: "Så redigerar du nyheter i Hygraph" (news-focused, since that's all Anna edits in Hygraph now)
- [ ] Guide: "Så hanterar du bilder och filer"
- [ ] Record 5–8 Loom videos for Anna
- [ ] Hold training sessions; confirm Anna feels ready

## P4 — Mohand (Locked Area + Infra) — *~95%*
✅ Done: locked-area app + redesign, JWT auth, contact-worker, GitHub Actions, Cloudflare Pages (both apps), login.
- [ ] Test locked-area auth **end-to-end** (login works — verify protected content/exercises load)
- [ ] (Optional) Cloudflare Turnstile
- [ ] **Branch hygiene:** don't commit unresolved merge-conflict markers (the #65 issue)

---

## Critical path
With only News from Hygraph (rest hardcoded), **there's no model dependency** anymore. The path forward is:
1. **Anthony** builds Aktiva initiativ (hardcoded) + polish (a11y / CLS / SSG).
2. **Robert** starts Anna-facing docs/training (news-focused).
3. **Marcus** sets up Anna's Hygraph editor access.
