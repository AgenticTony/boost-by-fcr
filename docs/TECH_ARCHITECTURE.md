# Technical Architecture — Boost by FC Rosengård

This document describes the system architecture of the Boost by FCR web platform: the
monorepo layout, the two frontends, the Cloudflare Worker, the two Hygraph CMS projects,
and the CI/CD pipeline that ships it all.

> **Audience:** developers and technical reviewers onboarding to the codebase.
> **Related:** `TECH_ENVIRONMENTS.md`, `TECH_DEPLOYMENT.md`, `TECH_LOCAL_SETUP.md`.

---

## 1. Architecture at a Glance

```
                          ┌─────────────────────────────────────────────┐
                          │                  HYGRAPH (CMS)               │
                          │   Two independent projects / GraphQL APIs    │
                          │                                             │
                          │  ┌────────────────────┐  ┌────────────────┐ │
                          │  │ Public-site project│  │ Locked-area    │ │
                          │  │ cmq1xlnd2022t07w9… │  │ project        │ │
                          │  │ (news, team, jobs, │  │ cmq8mzl7900oo… │ │
                          │  │  timeline, resources)│  │ (members,      │ │
                          │  └─────────┬──────────┘  │  materials,    │ │
                          │            │             │  pages, products│ │
                          │            │             └───────┬────────┘ │
                          └────────────┼─────────────────────┼─────────┘
                                       │                     │
                          GraphQL      │                     │   GraphQL
                       (graphql-request)│                  (urql, Bearer token)
                                       │                     │
 ┌─────────────────────────────────────┴───────┐   ┌─────────┴────────────────────┐
 │              PUBLIC-SITE APP                │   │       LOCKED-AREA APP        │
 │           React 19 + Vite + TS              │   │     React 19 + Vite + TS     │
 │                                             │   │                              │
 │  ┌───────────────────────────────────────┐  │   │  ┌────────────────────────┐ │
 │  │      Adapter layer (src/api)          │  │   │  │  urql Client           │ │
 │  │  createMockAdapter (offline data)     │  │   │  │  (src/api/client.ts)   │ │
 │  │  createHygraphAdapter (live GraphQL)  │  │   │  │  Queries: materials,  │ │
 │  │  createResilientAdapter (fallback)    │  │   │  │  pages, products       │ │
 │  └───────────────┬───────────────────────┘  │   │  └───────────┬────────────┘ │
 │                  │                          │   │              │              │
 │  TanStack Query hooks (cache + suspense)    │   │  Auth: client-side,          │
 │  Pages: home, nyheter, resurser, kontakt,   │   │  localStorage session +      │
 │  vem-vi-ar, var-historia, lediga-tjanster…  │   │  Hygraph member lookup       │
 │  243 tests (Vitest + Testing Library)       │   │  0 tests                     │
 └────────┬────────────────────────────────────┘   └───────────────┬──────────────┘
          │                                                         │
          │ Contact form POST                                       │ (login validates
          ▼                                                         │  against Hygraph
 ┌─────────────────────────────────────┐                            │  members table)
 │        CONTACT-WORKER               │                            │
 │   Cloudflare Worker (TypeScript)    │                            │
 │                                     │                            │
 │  POST /  → Resend email API         │                            │
 │  CORS: *  (browser-called)          │                            │
 │  contact-worker (Boost)           │                            │
 │         .workers.dev                │                            │
 └─────────────────┬───────────────────┘                            │
                   │                                                │
                   ▼                                                │
 ┌─────────────────────────────────────┐                            │
 │            RESEND (email)           │                            │
 │  Sends contact + verification email │                            │
 └─────────────────────────────────────┘                            │
                                                                    │
          BUILD & DEPLOY                                            │
          ┌─────────────────────────────────────────────────────────┘
          │
 ┌────────▼──────────────────────────────────────────────────────┐
 │                    GITHUB ACTIONS CI/CD                        │
 │              .github/workflows/deploy.yml                      │
 │                                                               │
 │  push to main ─► build public-site ─► deploy ─► Cloudflare    │
 │               └► build locked-area ─► deploy ─► Cloudflare    │
 │                  (test, typecheck, lint, build, artifact)      │
 └───────────────────────────┬───────────────────────────────────┘
                             │
                             ▼
 ┌───────────────────────────────────────────────────────────────┐
 │                  CLOUDFLARE PAGES (hosting)                    │
 │           Account: Boost  (the Boost account)              │
 │                                                               │
 │  boost-public-site  ─►  boostbyfcr.se                         │
 │  boost-locked-area  ─►  boost-by-fcr-locked-area.pages.dev    │
 │  contact-worker     ─►  contact-worker.boostbyfcr.workers.dev  │
 └───────────────────────────────────────────────────────────────┘
```

---

## 2. Monorepo Structure

The repository is a lightweight npm-style monorepo (no workspaces; each app has its own
`package.json` and `package-lock.json` and is installed/deployed independently).

```
boost-by-fcr/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD pipeline (see §6)
├── apps/
│   ├── public-site/                # Public marketing site (Anthony / P2)
│   ├── locked-area/                # Password-protected member portal (Mohand / P4)
│   ├── contact-worker/             # Cloudflare Worker for the contact form (Mohand / P4)
│   └── meeting-slots-worker/       # (Additional worker — calendar slots)
├── docs/                           # Project + technical documentation
├── package.json                    # Root: convenience scripts (dev/build across apps)
└── README.md
```

### 2.1 `apps/public-site` — Public marketing site

- **Stack:** React 19, Vite 8, TypeScript 6, TanStack Query v5, React Router v7,
  Tailwind CSS v4, Framer Motion, Radix UI primitives, `graphql-request`.
- **Role:** The public face of Boost by FCR — news, team, open positions, timeline,
  resources, contact form, registration flow. Hosted at **boostbyfcr.se**.
- **Data:** Talks to the **public Hygraph project** via the adapter pattern (see §4).
  Falls back to bundled mock data if Hygraph is unreachable, so the site never goes blank.
- **Tests:** 243 tests across 32 files (Vitest + Testing Library, jsdom). Run with
  `npm test` from `apps/public-site`.

### 2.2 `apps/locked-area` — Member portal

- **Stack:** React 19, Vite 7, TypeScript 5, TanStack Query v5, React Router v6,
  Tailwind CSS v3, `urql` (GraphQL client), `bcryptjs`.
- **Role:** Password-protected portal for leaders and staff — exercise library, resources,
  handbooks, admin approvals. Hosted at **boost-by-fcr-locked-area.pages.dev**.
- **Data:** Talks to the **locked-area Hygraph project** via `urql` with a Bearer token.
- **Auth:** Client-side only (see §5, Known issues). Login validates the email/password
  against the `members` table in Hygraph and stores a session in `localStorage`.
- **Tests:** 0. There is no test setup and no test files in this app.

### 2.3 `apps/contact-worker` — Cloudflare Worker

- **Stack:** TypeScript, `resend` SDK, runs on Cloudflare Workers runtime.
- **Role:** A single `POST /` endpoint that the public-site contact form calls from the
  browser. It validates the payload, then sends an email via Resend to the Boost inbox.
- **Deploy:** `wrangler deploy` from `apps/contact-worker`. Live at
  `contact-worker.boostbyfcr.workers.dev`.
- **Secrets:** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` (set via the
  Cloudflare dashboard or `wrangler secret put`).

### 2.4 `apps/meeting-slots-worker`

An additional Cloudflare Worker for calendar/meeting-slot functionality. Not part of the
primary content flow described above.

---

## 3. The Two Hygraph Projects

The platform uses **two separate Hygraph projects**, each with its own GraphQL endpoint
and auth token. They are independent: content edited in one does not appear in the other.

| Property | Public-site project | Locked-area project |
|---|---|---|
| **Hygraph project ID** | `cmq1xlnd2022t07w9jmsfkk5o` | `cmq8mzl7900oo07wbs723qais` |
| **GraphQL endpoint** | `https://eu-west-2.cdn.hygraph.com/content/cmq1xlnd2022t07w9jmsfkk5o/master` | `https://eu-west-2.cdn.hygraph.com/content/cmq8mzl7900oo07wbs723qais/master` |
| **Used by** | `apps/public-site` | `apps/locked-area` |
| **GraphQL client** | `graphql-request` | `urql` |
| **Content models** | `NewsItem`, `TimelineEntry`, `Resource`, `OpenPosition`, `TeamMember` | `members`, `materials`, `pages`, `products` |
| **Auth** | Public CDN URL by default; optional PAT for draft content | Bearer token (Permanent Auth Token) required |
| **Env var(s)** | `VITE_HYGRAPH_ENDPOINT`, `VITE_HYGRAPH_TOKEN` (optional) | `VITE_HYGRAPH_URL`, `VITE_HYGRAPH_TOKEN_LOCKED` |

### 3.1 Data flow — public-site → Hygraph

```
Browser (public-site)
   │  TanStack Query hook (e.g. useNews)
   ▼
src/api/client.ts   ── selects adapter at module load ──┐
   │                                                    │
   │  PROD or VITE_USE_HYGRAPH=true  ──►  createResilientAdapter(
   │                                         createHygraphAdapter(endpoint, token),
   │                                         createMockAdapter())          ◄── fallback
   ▼
src/api/hygraph-adapter.ts
   │  GraphQLClient (graphql-request)
   │  Queries with stage: PUBLISHED
   ▼
Hygraph public CDN endpoint  (eu-west-2.cdn.hygraph.com/.../cmq1xlnd.../master)
```

If the Hygraph request throws (network error, bad token, schema mismatch), the resilient
wrapper logs a warning and returns mock data instead — the page still renders.

### 3.2 Data flow — locked-area → Hygraph

```
Browser (locked-area)
   │  urql Client (src/api/client.ts)
   │  headers: { Authorization: Bearer <VITE_HYGRAPH_TOKEN_LOCKED> }
   ▼
Hygraph locked-area endpoint  (.../cmq8mzl79.../master)
   │  Returns: materials, pages, products, members
   ▼
Auth (src/auth/AuthContext.tsx)
   │  On login: queries `members(where: { email: $email })`,
   │  compares password, stores session in localStorage.
```

---

## 4. The Adapter Pattern (public-site)

The public-site never imports a data source directly. Pages and hooks import from
`src/api/client.ts`, which delegates to a swappable `ApiAdapter`. This lets the team
develop the UI against mock data and flip to live Hygraph without touching components.

### 4.1 The `ApiAdapter` interface (`src/api/adapter.ts`)

```ts
export interface ApiAdapter {
  fetchNews(): Promise<NewsArticle[]>;
  fetchNewsBySlug(slug: string): Promise<NewsArticle | null>;
  fetchTimeline(): Promise<TimelineEntry[]>;
  fetchResources(): Promise<Resource[]>;
  fetchResourcesByCategory(category: string): Promise<Resource[]>;
  fetchOpenPositions(): Promise<OpenPosition[]>;
  fetchTeamMembers(): Promise<TeamMember[]>;
  submitRegistration(data): Promise<{ success: boolean; delivered: boolean }>;
  submitContact(data): Promise<{ success: boolean; delivered: boolean }>;
}
```

`delivered` is `true` only when the submission reached a real backend. Until one exists,
adapters return `delivered: false` so the UI shows an honest "not actually sent" notice.

### 4.2 The three adapters

| Adapter | File | Purpose |
|---|---|---|
| `createMockAdapter` | `mock-adapter.ts` | Returns hardcoded sample data from `mock-data.ts` with a small artificial delay. Used in dev and as the production fallback. The contact form still POSTs to the real worker even in mock mode. |
| `createHygraphAdapter` | `hygraph-adapter.ts` | Builds a `GraphQLClient` against the public Hygraph CDN endpoint, runs typed GraphQL queries with `stage: PUBLISHED`, and maps the Hygraph field shapes (camelCase, rich-text ASTs, asset `{ url }` objects) into the app's domain types. |
| `createResilientAdapter` | `client.ts` | Wraps a primary + fallback adapter. Every read method is wrapped so that if the primary throws, the fallback runs and a warning is logged. Writes (`submitRegistration`, `submitContact`) are **not** wrapped — they pass straight through to the primary. |

### 4.3 How the active adapter is chosen (`client.ts`)

```ts
const useHygraph =
  import.meta.env.PROD || import.meta.env.VITE_USE_HYGRAPH === "true";

const DEFAULT_HYGRAPH_ENDPOINT =
  "https://eu-west-2.cdn.hygraph.com/content/cmq1xlnd2022t07w9jmsfkk5o/master";
const endpoint =
  import.meta.env.VITE_HYGRAPH_ENDPOINT ?? DEFAULT_HYGRAPH_ENDPOINT;

const adapter: ApiAdapter = (() => {
  if (!useHygraph) return createMockAdapter();
  if (!endpoint) { console.warn("..."); return createMockAdapter(); }
  return createResilientAdapter(
    createHygraphAdapter(endpoint, import.meta.env.VITE_HYGRAPH_TOKEN),
    createMockAdapter(),
  );
})();
```

- **In production builds** Hygraph is always on, with mock data as the safety net.
- **In dev** you opt in with `VITE_USE_HYGRAPH=true`.
- Setting `VITE_HYGRAPH_ENDPOINT=""` forces mock data even in production.

---

## 5. Locked-Area Auth Architecture

The member portal authenticates entirely in the browser — there is no server session.

```
Login page (src/pages/login.tsx)
   │  User enters email + password
   ▼
src/auth/passwordAuth.ts
   │  Hardcoded valid email: moh17670s@gmail.com
   │  Password compared to VITE_AUTH_PASSWORD (baked into the bundle)
   ▼
src/auth/AuthContext.tsx — validateSession()
   │  Reads fcr_session_email + fcr_session_hash from localStorage
   │  Queries Hygraph members(where: { email }) with the locked token
   │  Compares stored hash to member.password
   │  Checks member.isVerified
   ▼
React state: user | null   (Member { id, name, email, isVerified, isApproved, user })
```

A one-time cleanup removes the legacy `fcr_user` key that previously stored the whole
member object in plaintext.

**Known security issues with this design** (see §8):
- `VITE_AUTH_PASSWORD` and `VITE_HYGRAPH_TOKEN_LOCKED` are `VITE_`-prefixed, so they are
  bundled into the client JavaScript and readable by anyone who opens devtools.
- The session is a client-side localStorage entry; there is no httpOnly cookie or server
  validation step a user can't bypass.
- `member.password` is stored in Hygraph and compared in the browser.

---

## 6. CI/CD Pipeline

The pipeline lives in `.github/workflows/deploy.yml` and runs on every push to `main`
and on every pull request targeting `main`.

```
push to main (or PR)
        │
        ├─► build-public-site job
        │     working-directory: apps/public-site
        │     1. checkout
        │     2. setup Node 20, npm cache
        │     3. npm ci
        │     4. npx tsc --noEmit        (type check)
        │     5. npm run lint            (continue-on-error: true)
        │     6. npm run build           (Hygraph on by default in PROD)
        │     7. upload artifact public-site-dist
        │
        ├─► build-locked-area job
        │     working-directory: apps/locked-area
        │     1. checkout
        │     2. setup Node 20, npm cache
        │     3. npm ci
        │     4. npx tsc --noEmit
        │     5. npm run lint            (continue-on-error: true)
        │     6. npm run build
        │        env: VITE_HYGRAPH_URL, VITE_HYGRAPH_TOKEN_LOCKED, VITE_AUTH_PASSWORD
        │     7. upload artifact locked-area-dist
        │
        ├─► deploy-public-site job   (only on push to main)
        │     needs: build-public-site
        │     download artifact → npx wrangler pages deploy ./dist \
        │        --project-name=boost-public-site
        │
        └─► deploy-locked-area job   (only on push to main)
              needs: build-locked-area
              download artifact → npx wrangler pages deploy ./dist \
                 --project-name=boost-locked-area
```

**Secrets consumed by CI** (set in the GitHub repo settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — deploys both Pages projects.
- `CLOUDFLARE_ACCOUNT_ID` — scopes the deploy to the Boost Cloudflare account.
- `VITE_HYGRAPH_URL` — locked-area Hygraph endpoint (injected at build time).
- `VITE_HYGRAPH_TOKEN_LOCKED` — locked-area Hygraph Permanent Auth Token.
- `VITE_AUTH_PASSWORD` — locked-area login password.

The **contact-worker is not deployed by CI.** It is deployed manually with
`wrangler deploy` from `apps/contact-worker`.

> **Note:** the pipeline has no automated test step. `npm test` is not invoked in
> `deploy.yml`; the public-site's 243 tests run locally only.

---

## 7. Contact-Worker Architecture

```
Browser (public-site kontakt page)
   │  fetch(VITE_CONTACT_WORKER_URL || "https://contact-worker.boostbyfcr.workers.dev",
   │        { method: POST, body: { name, email, subject, message } })
   ▼
Cloudflare Worker — src/index.ts
   │  OPTIONS  → CORS preflight (Access-Control-Allow-Origin: *)
   │  non-POST → 405
   │  POST     → validate { name, email, subject, message } all present
   │             (else 400 "All fields required")
   ▼
Resend SDK  (new Resend(env.RESEND_API_KEY))
   │  resend.emails.send({
   │    from: env.RESEND_FROM_EMAIL,
   │    to:   env.RESEND_TO_EMAIL,
   │    replyTo: email,
   │    subject: `[Kontakt] ${subject}`,
   │    html / text body
   │  })
   ▼
Boost inbox  (email delivered)
```

- **Env bindings** (`Env` interface): `RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
  `RESEND_TO_EMAIL`. These are Cloudflare Worker secrets, not `VITE_` vars.
- **CORS** is wide open (`*`) because the worker is called directly from the browser.
- The worker is stateless — it forwards to Resend and returns `{ success, id }` or an
  error JSON.

---

## 8. Known Issues & Technical Debt

| Area | Issue | Impact / next step |
|---|---|---|
| **Locked-area auth** | Authentication is fully client-side. `VITE_AUTH_PASSWORD` and `VITE_HYGRAPH_TOKEN_LOCKED` are bundled into the client and readable in devtools. The session lives in `localStorage` with no server-side validation a user can't bypass. `member.password` is stored in and compared from Hygraph in the browser. | High security risk. Migrate to a server-validated session (e.g. Cloudflare Worker + httpOnly cookie, or a proper auth provider). Rotate the exposed token. |
| **Manual deploys bypass CI** | Mohand has been deploying the locked-area and contact-worker manually (direct `wrangler`/`wrangler pages deploy`), so the live site can diverge from what CI built from `main`. | The live build is not always reproducible from the repo. Enforce CI-only deploys and investigate drift when debugging. |
| **Cloudflare account ownership** | Both Pages projects and the worker live in **the Boost Cloudflare account** , now in the Boost Cloudflare account. | All infrastructure is now owned by Boost. |
| **Test coverage gap** | `public-site` has 243 passing tests; `locked-area` has **0** tests and no test runner configured. | Locked-area regressions ship undetected. Add Vitest + Testing Library and a CI test step. |
| **CI has no test step** | `deploy.yml` runs typecheck and lint (lint is `continue-on-error: true`) but never runs `npm test`. | The 243 public-site tests don't gate deploys. |
| **No automated worker deploy** | The contact-worker is deployed by hand with `wrangler deploy`; there is no CI job for it. | Worker changes can be forgotten. Add a deploy step to CI. |
| **Supabase keys in locked-area `.env`** | `apps/locked-area/.env` (committed) contains a Supabase anon key and the Hygraph locked token. | Secrets should not be committed; move to `.env.local` / CI secrets and rotate if exposed. |

---

## 9. Test Coverage Summary

| App | Test runner | Test files | Tests | Status |
|---|---|---|---|---|
| `apps/public-site` | Vitest + Testing Library (jsdom) | 32 | **243 passing** | Green |
| `apps/locked-area` | — | 0 | 0 | Not configured |
| `apps/contact-worker` | — | 0 | 0 | Not configured |

The public-site test suite covers the API adapter layer (mock, Hygraph mapping, resilient
fallback), all UI primitives, data hooks, page rendering, and utility functions. Run it
with `cd apps/public-site && npm test`.

---

*Last updated: August 2026. Verify against the live repo before relying on specifics.*
