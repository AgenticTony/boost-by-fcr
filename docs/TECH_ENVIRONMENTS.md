# Environment Variables — Boost by FC Rosengård

A complete reference for every environment variable used across the Boost by FCR
monorepo: what it does, which app reads it, where to set it, and whether it is a secret.

> **Golden rule:** any variable prefixed `VITE_` is inlined into the client-side bundle by
> Vite and is therefore **readable by anyone** who opens the deployed site. Never put a
> truly private key in a `VITE_` variable. See the "Security notes" column for each.

---

## 1. Variable Reference

### 1.1 Public-site (`apps/public-site`)

| Variable | App | Required | Where to set | Description | Secret? |
|---|---|---|---|---|---|
| `VITE_USE_HYGRAPH` | public-site | No (dev only) | local `.env` | Dev opt-in to use the Hygraph adapter instead of mock data. Set to `true` to hit live Hygraph locally. **Production builds ignore this and always use Hygraph** (see `src/api/client.ts`). | No |
| `VITE_HYGRAPH_ENDPOINT` | public-site | No | local `.env` / GitHub secret | The public, read-only Hygraph CDN URL the browser calls. Defaults to the production public-site project: `https://eu-west-2.cdn.hygraph.com/content/cmq1xlnd2022t07w9jmsfkk5o/master`. Override for a staging project, or set to `""` to force mock data. | No |
| `VITE_HYGRAPH_TOKEN` | public-site | No | local `.env` | Hygraph Permanent Auth Token. Only needed to read draft/private content. The public CDN endpoint serves published content without a token, so this is usually empty. | Yes (if set) |
| `VITE_CONTACT_WORKER_URL` | public-site | No | local `.env` | URL of the deployed contact-worker. Defaults to `https://contact-worker.boostbyfcr.workers.dev`. Override for a staging worker; leave unset for production. | No |
| `SUPABASE_URL` | public-site | No | Vercel Runtime env (server-side) | Supabase project URL. Read **server-side only** by `api/submit.ts` at runtime (the `/anmal-dig` registration path). Deliberately **not** `VITE_`-prefixed so it is never bundled into the client. When unset, `/api/submit` runs in honest "demo mode" (validates, does not persist). | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | public-site | No | Vercel Runtime env (server-side) | Supabase service-role key. Same handling as `SUPABASE_URL` — server-side only. Requires a `submissions` table (DDL is documented in the `api/submit.ts` header comment). | **Yes (high privilege)** |

### 1.2 Locked-area (`apps/locked-area`)

| Variable | App | Required | Where to set | Description | Secret? |
|---|---|---|---|---|---|
| `VITE_HYGRAPH_URL` | locked-area | **Yes** | local `.env` / GitHub secret | Locked-area Hygraph GraphQL endpoint: `https://eu-west-2.cdn.hygraph.com/content/cmq8mzl7900oo07wbs723qais/master`. `src/api/client.ts` throws at startup if this is missing. | No (URL) |
| `VITE_HYGRAPH_TOKEN_LOCKED` | locked-area | **Yes** | local `.env` / GitHub secret | Hygraph Permanent Auth Token for the locked-area project. Used as `Authorization: Bearer <token>` by the urql client and by the auth context. **Exposes in the client bundle.** | **Yes (exposed)** |
| `VITE_AUTH_PASSWORD` | locked-area | **Yes** | local `.env` / GitHub secret | The login password compared in `src/auth/passwordAuth.ts`. Hardcoded valid email is `moh17670s@gmail.com`. **Exposes in the client bundle** — see security note. | **Yes (exposed)** |
| `VITE_EMAIL_WORKER_URL` | locked-area | No | local `.env` | URL of a worker used for sending verification/reset email from the locked-area. | No |

### 1.3 Contact-worker (`apps/contact-worker`)

| Variable | App | Required | Where to set | Description | Secret? |
|---|---|---|---|---|---|
| `RESEND_API_KEY` | contact-worker | **Yes** | Cloudflare dashboard / `wrangler secret put` | Resend API key. Used by `new Resend(env.RESEND_API_KEY)` to send email. | **Yes** |
| `RESEND_FROM_EMAIL` | contact-worker | **Yes** | Cloudflare dashboard / `wrangler secret put` | `From` address for outbound email (e.g. `Boost by FCR <noreply@boostbyfcr.se>`). Must be a verified sender in Resend. | No |
| `RESEND_TO_EMAIL` | contact-worker | **Yes** | Cloudflare dashboard / `wrangler secret put` | `To` address — the Boost inbox that receives contact-form submissions. | No |

### 1.4 CI/CD secrets (GitHub Actions)

These are set in the GitHub repository under **Settings → Secrets and variables →
Actions**. They are consumed by `.github/workflows/deploy.yml`.

| Variable | Used by | Required | Description | Secret? |
|---|---|---|---|---|
| `CLOUDFLARE_API_TOKEN` | deploy jobs | **Yes** | Cloudflare API token with permission to deploy Pages to the Boost Cloudflare account. | **Yes** |
| `CLOUDFLARE_ACCOUNT_ID` | deploy jobs | **Yes** | Cloudflare account ID . Scopes the Pages deploy. | Yes |
| `VITE_HYGRAPH_URL` | build-locked-area | **Yes** | Injected as an env var during the locked-area build (becomes a `VITE_` var). Same value as the locked-area local `.env`. | Exposed in bundle |
| `VITE_HYGRAPH_TOKEN_LOCKED` | build-locked-area | **Yes** | Injected at build time. Becomes the Bearer token in the locked-area bundle. | **Yes (exposed)** |
| `VITE_AUTH_PASSWORD` | build-locked-area | **Yes** | Injected at build time. Becomes the login password in the locked-area bundle. | **Yes (exposed)** |

---

## 2. Which Hygraph Endpoint Does Each App Use?

| App | Hygraph project ID | Endpoint |
|---|---|---|
| `public-site` | `cmq1xlnd2022t07w9jmsfkk5o` | `https://eu-west-2.cdn.hygraph.com/content/cmq1xlnd2022t07w9jmsfkk5o/master` |
| `locked-area` | `cmq8mzl7900oo07wbs723qais` | `https://eu-west-2.cdn.hygraph.com/content/cmq8mzl7900oo07wbs723qais/master` |

- The **public-site** endpoint is a public CDN URL baked into `src/api/client.ts` as a
  default; it serves published content with no token. `VITE_HYGRAPH_ENDPOINT` overrides it.
- The **locked-area** endpoint requires a Bearer token (`VITE_HYGRAPH_TOKEN_LOCKED`) on
  every request. The urql client in `src/api/client.ts` throws at startup if either the
  URL or the token is missing.

---

## 3. Where to Set Each Variable

### 3.1 Local development — `.env` files

Each Vite app reads from a `.env` file in its own app directory. Copy the example file and
fill in values:

```bash
# public-site
cp apps/public-site/.env.example apps/public-site/.env
# then edit apps/public-site/.env

# locked-area — create the file (no committed example; see template below)
# edit apps/locked-area/.env.local   ← prefer .env.local so it isn't committed
```

**`apps/locked-area/.env.local` template** (use `.env.local`, not `.env`, to avoid
committing secrets):

```bash
VITE_HYGRAPH_URL=https://eu-west-2.cdn.hygraph.com/content/cmq8mzl7900oo07wbs723qais/master
VITE_HYGRAPH_TOKEN_LOCKED=<ask Mohand / Anthony for the Permanent Auth Token>
VITE_AUTH_PASSWORD=<ask for the login password>
VITE_EMAIL_WORKER_URL=
```

> **Security:** `.env` files should be git-ignored. The committed `apps/locked-area/.env`
> currently contains live tokens — treat those as compromised and rotate them. Prefer
> `.env.local` (Vite loads it and it is git-ignored by default).

### 3.2 Cloudflare dashboard (worker secrets)

The contact-worker's `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL` are
**Cloudflare Worker secrets**, not Vite env vars. Set them with the Wrangler CLI:

```bash
cd apps/contact-worker
npx wrangler secret put RESEND_API_KEY     # prompts for the value
npx wrangler secret put RESEND_FROM_EMAIL
npx wrangler secret put RESEND_TO_EMAIL
```

Or via the Cloudflare dashboard: **Workers & Pages → contact-worker → Settings →
Variables and Secrets**.

### 3.3 GitHub secrets (CI/CD)

Set under the repo at **github.com/AgenticTony/boost-by-fcr → Settings → Secrets and
variables → Actions → New repository secret**:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VITE_HYGRAPH_URL`
- `VITE_HYGRAPH_TOKEN_LOCKED`
- `VITE_AUTH_PASSWORD`

These are injected into the `build-locked-area` job as build-time env vars.

### 3.4 Vercel runtime env (public-site server-side)

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are **server-side only** and are read by
`api/submit.ts` at runtime. Set them as **Vercel Runtime environment variables** (not build
env) in the Vercel project dashboard. Do **not** prefix them with `VITE_`.

---

## 4. Security Notes & Known Exposures

- **`VITE_HYGRAPH_TOKEN_LOCKED`** and **`VITE_AUTH_PASSWORD`** are `VITE_`-prefixed, so
  Vite inlines them into the locked-area's client JavaScript. Anyone who opens the
  deployed site can read them from the bundle. This is a known issue — see
  `TECH_ARCHITECTURE.md` §8. Treat the current locked-area token as exposed and rotate it
  when moving to a server-validated auth model.
- **`SUPABASE_SERVICE_ROLE_KEY`** is the high-privilege Supabase key. It bypasses Row Level
  Security. It must **never** be `VITE_`-prefixed or shipped to the browser. It is
  correctly kept server-side only.
- The committed `apps/locked-area/.env` contains live tokens. Prefer `.env.local` and add
  `.env` to `.gitignore` if it isn't already.

---

## 5. Quick-Reference: What Do I Need to Run Locally?

**Minimum to run the public-site with mock data** (`apps/public-site/.env`):

```bash
# All optional — defaults to mock data + the production Hygraph CDN + the live worker
VITE_USE_HYGRAPH=true        # optional: hit live Hygraph in dev
```

**Minimum to run the locked-area** (`apps/locked-area/.env.local`):

```bash
VITE_HYGRAPH_URL=https://eu-west-2.cdn.hygraph.com/content/cmq8mzl7900oo07wbs723qais/master
VITE_HYGRAPH_TOKEN_LOCKED=<token>
VITE_AUTH_PASSWORD=<password>
```

The locked-area will throw `Missing Hygraph environment variables` at startup without
`VITE_HYGRAPH_URL` and `VITE_HYGRAPH_TOKEN_LOCKED`.

---

*Last updated: August 2026. Cross-check against `apps/*/.env.example` and
`.github/workflows/deploy.yml` before relying on specifics.*
