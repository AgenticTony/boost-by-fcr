# Local Setup — Boost by FC Rosengård (30-minute onboarding)

Everything a new developer needs to clone the repo, install dependencies, configure
environment variables, run the dev servers, run the tests, and make their first change.
Target time from clone to running app: **about 30 minutes**.

> **Audience:** a developer joining the project. **Related:** `TEAM_GIT_WORKFLOW.md`
> (Git process), `TECH_ENVIRONMENTS.md` (full env reference),
> `TECH_ARCHITECTURE.md` (how it all fits together).

---

## 1. Prerequisites

| Tool | Version | Notes |
|---|---|---|
| **Node.js** | **20 or later** (CI uses 20) | Check with `node --version`. Use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) to manage versions. |
| **npm** | comes with Node | The repo uses `npm`, not yarn or pnpm. Each app has its own `package-lock.json`. |
| **Git** | any recent version | For cloning and the team workflow. |
| **GitHub CLI (`gh`)** | optional but recommended | Makes opening PRs from the terminal easier. |
| **Editor** | **VS Code** recommended | The team uses VS Code. Install the ESLint and Prettier extensions for the best experience. |
| **Cloudflare Wrangler** | only if you work on the worker or deploy | `npm install -g wrangler` (or use `npx wrangler`). Not needed just to run the frontends. |

You do **not** need a Hygraph, Cloudflare, or Resend account just to run the apps locally —
the public-site ships with mock data, and you can get the locked-area credentials from the
team.

---

## 2. Clone the Repository

```bash
# Pick somewhere to put it
cd ~/Projects    # or wherever you keep code

# Clone (repo is at github.com/AgenticTony/boost-by-fcr)
git clone https://github.com/AgenticTony/boost-by-fcr.git
cd boost-by-fcr
```

Confirm you're on `main` and up to date:

```bash
git checkout main
git pull origin main
```

The repo is a lightweight monorepo. Each app under `apps/` has its own `package.json` and
is installed independently — there is no top-level `npm install` that wires everything up.

```
boost-by-fcr/
├── apps/
│   ├── public-site/       ← start here (most active, has tests)
│   ├── locked-area/
│   ├── contact-worker/
│   └── meeting-slots-worker/
├── docs/                  ← you are here
├── package.json           ← root: convenience dev/build scripts
└── .github/workflows/deploy.yml
```

---

## 3. Install Dependencies (per app)

Install dependencies for the app(s) you'll work on. **Do this from inside each app's
directory.**

### 3.1 Public-site (recommended starting point)

```bash
cd apps/public-site
npm install
```

### 3.2 Locked-area

```bash
cd apps/locked-area
npm install
```

### 3.3 Contact-worker (only if you're touching the worker)

```bash
cd apps/contact-worker
npm install
```

> **Tip:** There is a root `package.json` with convenience scripts (`npm run dev:public`,
> `npm run dev:locked`, `npm run build`), but you still need to `npm install` inside each
> app first. For day-to-day work, just run commands from within the relevant app folder.

---

## 4. Set Up Environment Files

Each app reads environment variables from a `.env` file in its own directory.

### 4.1 Public-site

The public-site ships with a `.env.example`. Copy it and you're basically done — it runs on
mock data by default and already knows the production Hygraph URL and worker URL.

```bash
cd apps/public-site
cp .env.example .env
```

Then edit `apps/public-site/.env`. The defaults are fine to start; the only one you might
toggle is:

```bash
# Set to true to hit live Hygraph in dev (production builds always use Hygraph).
VITE_USE_HYGRAPH=true
```

Leave `VITE_HYGRAPH_TOKEN` empty for now — it's only needed for draft content.

### 4.2 Locked-area

The locked-area **requires** three values to start (the app throws at startup without
them). There is no committed `.env.example`, so create `.env.local` (preferred — it's
git-ignored by default) and ask Anthony or Mohand for the values:

```bash
# Create the file (use .env.local so secrets aren't committed)
cd apps/locked-area
# Then create apps/locked-area/.env.local with:
```

```bash
VITE_HYGRAPH_URL=https://eu-west-2.cdn.hygraph.com/content/cmq8mzl7900oo07wbs723qais/master
VITE_HYGRAPH_TOKEN_LOCKED=<ask the team for the Permanent Auth Token>
VITE_AUTH_PASSWORD=<ask the team for the login password>
VITE_EMAIL_WORKER_URL=
```

> **Where to get the values:**
> - `VITE_HYGRAPH_URL` — the locked-area Hygraph endpoint (above). Find it in the Hygraph
>   dashboard for project `cmq8mzl7900oo07wbs723qais` → API Access.
> - `VITE_HYGRAPH_TOKEN_LOCKED` — a Permanent Auth Token from the same Hygraph project.
>   Ask Anthony or Mohand; it's also stored in the GitHub repo secrets.
> - `VITE_AUTH_PASSWORD` — the locked-area login password. Ask the team.
>
> See `TECH_ENVIRONMENTS.md` for the full reference and security notes (these `VITE_`
> values are exposed in the client bundle — a known issue).

### 4.3 Contact-worker (only if running the worker locally)

The worker reads `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL` from
Cloudflare secrets at runtime. For local dev, create a `.dev.vars` file:

```bash
cd apps/contact-worker
# Create apps/contact-worker/.dev.vars with:
```

```bash
RESEND_API_KEY=<ask the team>
RESEND_FROM_EMAIL=Boost by FCR <noreply@boostbyfcr.se>
RESEND_TO_EMAIL=<the Boost inbox>
```

Wrangler reads `.dev.vars` automatically for `wrangler dev`. You only need this if you're
testing email sending locally.

---

## 5. Run the Dev Servers

Each app is a Vite app with its own dev server.

### 5.1 Public-site

```bash
cd apps/public-site
npm run dev
```

- **URL:** http://localhost:5173
- Vite default port. Serves the app with hot module reload.
- With `VITE_USE_HYGRAPH` unset/false you'll see mock news, timeline, and resources. With
  it set to `true` you'll see live Hygraph content (with mock data as automatic fallback).

### 5.2 Locked-area

```bash
cd apps/locked-area
npm run dev
```

- **URL:** http://localhost:5174 (pinned in `vite.config.ts`)
- Login at the login page with `moh17670s@gmail.com` and the `VITE_AUTH_PASSWORD` value.

### 5.3 Contact-worker (optional)

```bash
cd apps/contact-worker
npm run dev      # runs: wrangler dev   (port 8787, per wrangler.toml)
```

### 5.4 Run both frontends at once (optional)

From the repo root:

```bash
npm run dev      # starts public-site and locked-area together
```

---

## 6. Run the Tests

The public-site has a full test suite; the locked-area currently has none.

### 6.1 Public-site — 243 tests

```bash
cd apps/public-site
npm test                # runs all tests once (vitest run)
```

- **Runner:** Vitest + Testing Library, jsdom environment.
- **Coverage:** 32 test files, 243 tests — covers the API adapter layer (mock, Hygraph
  mapping, resilient fallback), UI primitives, data hooks, pages, and utilities.
- Watch mode during development:

  ```bash
  npm run test:watch
  ```

- Coverage report:

  ```bash
  npm run test:coverage
  ```

### 6.2 Locked-area — 0 tests

There is no test runner configured for the locked-area. If you're adding tests, start with
Vitest + Testing Library (mirror the public-site setup in its `vite.config.ts`).

---

## 7. Build for Production

Builds compile TypeScript and bundle the app into `dist/`. This is what CI deploys.

### 7.1 Public-site

```bash
cd apps/public-site
npm run build           # runs: tsc -b && vite build   →  dist/
npm run preview         # serve the production build locally to verify it
```

- Hygraph is **on by default** in production builds (no env flag needed).
- Source maps are disabled (`sourcemap: false` in `vite.config.ts`) — don't re-enable them
  without a plan, see the comment in the config.

### 7.2 Locked-area

```bash
cd apps/locked-area

# The build needs the three VITE_ vars at build time:
export VITE_HYGRAPH_URL="https://eu-west-2.cdn.hygraph.com/content/cmq8mzl7900oo07wbs723qais/master"
export VITE_HYGRAPH_TOKEN_LOCKED="<token>"
export VITE_AUTH_PASSWORD="<password>"

npm run build           # runs: tsc && vite build   →  dist/
npm run preview
```

(If your `.env.local` is set up, `npm run build` will pick those up automatically and you
won't need the `export` lines.)

### 7.3 Contact-worker

No build step — `npm run build` is a no-op. The worker is deployed directly with
`wrangler deploy`. See `TECH_DEPLOYMENT.md` §3.

---

## 8. Git Workflow Summary

The full process is in **`docs/TEAM_GIT_WORKFLOW.md`** — read it once. The short version:

1. **Start each day on main, pull latest:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a feature branch** (never commit to `main`):
   ```bash
   git checkout -b feature/pX-my-task      # pX = your role prefix
   ```

3. **Code, commit often** with messages like `feature/p2: added news card`.
4. **Push and open a PR** on github.com/AgenticTony/boost-by-fcr.
5. **Get one review**, then merge. CI builds and deploys on merge to `main`.

**Ownership (don't edit others' folders without talking):**
- `apps/public-site/` — Anthony (P2)
- `apps/locked-area/`, `apps/contact-worker/`, `.github/workflows/` — Mohand (P4)
- `docs/` — everyone

> **Before opening a PR for the public-site**, run `cd apps/public-site && npm test` — CI
> doesn't run tests, so catching regressions locally is on you.

---

## 9. Common Issues & Solutions

### "Locked-area crashes on startup: `Missing Hygraph environment variables`"

`src/api/client.ts` throws if `VITE_HYGRAPH_URL` or `VITE_HYGRAPH_TOKEN_LOCKED` is missing.
Create `apps/locked-area/.env.local` with the three required values (§4.2) and restart the
dev server.

### "Public-site shows no news / empty sections"

You're in mock mode (default in dev) and mock data is sparse, **or** Hygraph is unreachable.
Either set `VITE_USE_HYGRAPH=true` in `apps/public-site/.env` to fetch live content, or
check the browser console for `[api] ... failed, falling back to mock data` warnings.

### "Port 5173 / 5174 is already in use"

Another Vite instance is running. Stop it, or Vite will offer the next free port — note the
new URL it prints. The locked-area is pinned to 5174 in `vite.config.ts`.

### "`npm install` fails or is slow"

Make sure you're on Node 20+ (`node --version`). Delete `node_modules` and the lockfile's
cache and retry:

```bash
rm -rf node_modules
npm install
```

### "TypeScript errors block the build"

Run the type checker to see them clearly:

```bash
cd apps/public-site    # or apps/locked-area
npx tsc --noEmit
```

CI runs this same check; fix type errors before pushing.

### "Tests fail locally but pass for others"

Make sure dependencies are installed (`npm install`) and you're on the same Node version
(20). Some tests rely on jsdom timing; if a test is flaky, re-run it in isolation:

```bash
npx vitest run path/to/file.test.ts
```

### "Login to the locked-area fails"

Check that `VITE_AUTH_PASSWORD` in `.env.local` matches the current password, and that the
email is exactly `moh17670s@gmail.com` (hardcoded in `src/auth/passwordAuth.ts`). Also
confirm `VITE_HYGRAPH_URL` and `VITE_HYGRAPH_TOKEN_LOCKED` are correct — login validates
against the Hygraph `members` table.

### "I committed a `.env` with secrets by mistake"

Stop and tell Anthony or Mohand. Treat any committed token as compromised and rotate it:
re-issue the Hygraph token in the Hygraph dashboard and update the GitHub secret. Going
forward, use `.env.local` (git-ignored by Vite's default template).

### "`git` or `gh` command not found"

Install Git from git-scm.com and the GitHub CLI from cli.github.com. Ask Anthony or Robert
if you're stuck.

---

## 10. Where to Go Next

- **`docs/TEAM_GIT_WORKFLOW.md`** — the team's Git process (read this on day one).
- **`docs/TECH_ARCHITECTURE.md`** — how the adapter pattern, Hygraph, and CI fit together.
- **`docs/TECH_ENVIRONMENTS.md`** — every env var, what it does, and where to set it.
- **`docs/TECH_DEPLOYMENT.md`** — how code reaches boostbyfcr.se.
- **`docs/PROJECT_OVERVIEW.md`** — a non-technical overview of the platforms (Hygraph,
  Cloudflare, GitHub, Resend) for context.

Welcome to the team — if anything in this guide is wrong or unclear, fix it in a PR or ask
in the team chat.

---

*Last updated: August 2026.*
