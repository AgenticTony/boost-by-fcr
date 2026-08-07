# Deployment — Boost by FC Rosengård

How the Boost by FCR platform gets from a commit on `main` to a live URL. Covers the
normal CI/CD flow, the Cloudflare Pages projects, the contact-worker, manual deploys for
when CI is broken, DNS, and the known ownership issues to fix.

> **Audience:** developers who ship the site. **Related:** `TECH_ARCHITECTURE.md`,
> `TECH_ENVIRONMENTS.md`.

---

## 1. Normal CI/CD Flow (the happy path)

The pipeline is defined in `.github/workflows/deploy.yml`. It triggers on every push to
`main` and on every pull request targeting `main`.

```
1. Developer opens a PR  →  CI runs build jobs (no deploy)
2. PR is reviewed + merged into main
3. Push to main triggers the full pipeline:
     a. build-public-site   → npm ci, tsc --noEmit, lint, build  → artifact
     b. build-locked-area   → npm ci, tsc --noEmit, lint, build  → artifact
        (locked-area build injects VITE_HYGRAPH_URL, VITE_HYGRAPH_TOKEN_LOCKED,
         VITE_AUTH_PASSWORD from GitHub secrets)
     c. deploy-public-site  → wrangler pages deploy ./dist --project-name=boost-public-site
     d. deploy-locked-area  → wrangler pages deploy ./dist --project-name=boost-locked-area
4. Cloudflare Pages serves the new build at the project URL (within ~1–2 min)
```

**Notes about the pipeline:**

- The deploy jobs only run `if: github.ref == 'refs/heads/main'`. PRs build and typecheck
  but do **not** deploy.
- Lint is `continue-on-error: true` — lint warnings do not block a deploy.
- The pipeline does **not** run `npm test`. The public-site's 243 tests are local-only.
- Wrangler authenticates with `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from
  GitHub secrets — it does **not** create a GitHub deployment record.
- The **contact-worker is not in CI.** It is deployed manually (see §3).

### Required GitHub secrets

Set in **github.com/AgenticTony/boost-by-fcr → Settings → Secrets and variables → Actions**:

| Secret | Purpose |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Deploys both Pages projects. |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account to deploy into . |
| `VITE_HYGRAPH_URL` | Locked-area Hygraph endpoint (build-time injection). |
| `VITE_HYGRAPH_TOKEN_LOCKED` | Locked-area Hygraph token (build-time injection). |
| `VITE_AUTH_PASSWORD` | Locked-area login password (build-time injection). |

---

## 2. Cloudflare Pages Projects

Both frontends are hosted on **Cloudflare Pages**. Today both live in **Mohand's personal
Cloudflare account ** — see §6.

| Project name | Live URL | Source | Build output |
|---|---|---|---|
| `boost-public-site` | **boostbyfcr.se** (custom domain) | `apps/public-site` | `apps/public-site/dist` |
| `boost-locked-area` | **boost-by-fcr-locked-area.pages.dev** | `apps/locked-area` | `apps/locked-area/dist` |

- The public-site is served from the custom domain `boostbyfcr.se` (see §5 for DNS).
- The locked-area is served from its default `*.pages.dev` subdomain; it has no custom
  domain attached.
- Each deploy replaces the production alias. Cloudflare keeps a history of deployments you
  can roll back to from the dashboard.

---

## 3. Contact-Worker Deployment

The contact-worker (`apps/contact-worker`) is a Cloudflare Worker deployed with Wrangler.
**It is not deployed by CI** — deploy it manually.

### One-time: set worker secrets

```bash
cd apps/contact-worker
npx wrangler login                      # first time only
npx wrangler secret put RESEND_API_KEY  # prompts for the value
npx wrangler secret put RESEND_FROM_EMAIL
npx wrangler secret put RESEND_TO_EMAIL
```

### Deploy

```bash
cd apps/contact-worker
npm run deploy        # runs: wrangler deploy
```

- Live URL: `https://contact-worker.boostbyfcr.workers.dev`
- The worker is defined by `name = "contact-worker"` in `wrangler.toml`, entry point
  `src/index.ts`.
- After deploying, verify with a `POST` (see `TECH_ARCHITECTURE.md` §7 for the payload
  shape) or by submitting the public-site contact form.

> **Todo:** add a `deploy-contact-worker` job to `.github/workflows/deploy.yml` so worker
> changes are not forgotten.

---

## 4. Manual Deploys (when CI is broken)

Use these only if the GitHub Actions pipeline is broken or you need to ship a hotfix
outside CI. **Prefer CI** — manual deploys are how the live site has drifted from the repo
in the past.

### 4.1 Prerequisites for manual deploys

- Node.js 20+ and npm.
- The Wrangler CLI: `npm install -g wrangler` (or use `npx wrangler`).
- `wrangler login` against the Cloudflare account that owns the projects , or
  set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your shell.

### 4.2 Manual deploy — public-site

```bash
cd apps/public-site
npm ci
npm run build                      # produces dist/
# Hygraph is on by default in production builds; no extra env needed.
npx wrangler pages deploy ./dist --project-name=boost-public-site
```

### 4.3 Manual deploy — locked-area

The locked-area build **requires** the three `VITE_` secrets at build time:

```bash
cd apps/locked-area
npm ci

# Provide the build-time env vars (use the real values from GitHub secrets / .env.local)
export VITE_HYGRAPH_URL="https://eu-west-2.cdn.hygraph.com/content/cmq8mzl7900oo07wbs723qais/master"
export VITE_HYGRAPH_TOKEN_LOCKED="<the locked token>"
export VITE_AUTH_PASSWORD="<the login password>"

npm run build                      # produces dist/
npx wrangler pages deploy ./dist --project-name=boost-locked-area
```

> **Drift warning:** if you deploy manually with different env values than CI uses, the
> live site will differ from a future CI rebuild. Always reconcile values with the GitHub
> secrets afterward.

---

## 5. DNS Configuration

The custom domain **boostbyfcr.se** points to Cloudflare Pages.

- **Nameservers:** the `boostbyfcr.se` domain must use Cloudflare's nameservers (set at the
  registrar). Cloudflare then manages all DNS for the zone.
- **Public-site:** a custom domain (`boostbyfcr.se`, and typically `www.boostbyfcr.se`)
  is bound to the `boost-public-site` Pages project in the Cloudflare dashboard under
  **Workers & Pages → boost-public-site → Custom domains**. Cloudflare auto-provisions the
  SSL certificate and the required CNAME/AAAA records.
- **Locked-area:** no custom domain is configured; it is reached via its
  `boost-by-fcr-locked-area.pages.dev` URL.
- **Email (Resend):** the domain `boostbyfcr.se` must be verified in Resend for the
  contact-worker and verification emails to send to recipients other than the account
  owner. Check this in the Resend dashboard under **Domains**.

### After a DNS or custom-domain change

- Allow a few minutes for Cloudflare to issue the SSL certificate.
- Confirm `https://boostbyfcr.se` resolves and serves the current build.
- If the deploy looks stale, check the **Deployments** tab in the Pages project to confirm
  the latest deployment is aliased to production.

---

## 6. Cloudflare Account Ownership — Action Required

> **Important:** all Cloudflare resources for this project currently live in **Mohand's
> previous account **, now in the Boost Cloudflare account.

This applies to:

- The `boost-public-site` Pages project (and the `boostbyfcr.se` custom domain).
- The `boost-locked-area` Pages project.
- The `contact-worker` Worker.
- The DNS zone for `boostbyfcr.se`.

**Why this matters:**

- **Billing** is tied to one individual.
- **Access control** — only Mohand can manage the projects, domains, secrets, and
  deployments directly.
- **Bus factor** — if Mohand is unavailable, the team cannot deploy, roll back, rotate
  keys, or change DNS.
- **Token scope** — the `CLOUDFLARE_API_TOKEN` used by CI is scoped to the Boost account.

**Recommended migration:**

1. Create a **Boost organization Cloudflare account** (or a dedicated shared account).
2. Transfer ownership of the Pages projects and the Worker, or recreate them in the new
   account. (Cloudflare does not support cross-account project transfer; recreation + DNS
   repoint is the usual path.)
3. Move the `boostbyfcr.se` zone into the new account (change nameservers at the
   registrar).
4. Re-issue the `CLOUDFLARE_API_TOKEN` against the new account and update the GitHub
   secret `CLOUDFLARE_ACCOUNT_ID` (and the token).
5. Re-set the contact-worker secrets (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`,
   `RESEND_TO_EMAIL`) in the new account.
6. Re-bind the `boostbyfcr.se` custom domain to the new Pages project.

---

## 7. Known Deployment Issues

| Issue | Detail | Mitigation |
|---|---|---|
| **Manual deploys bypass CI** | Mohand has been deploying the locked-area (and the contact-worker) directly with Wrangler, skipping the GitHub Actions pipeline. The live build can diverge from what `main` produces. | Enforce CI-only deploys. When debugging a "works locally but not live" issue, suspect env-value drift between manual deploys and CI secrets. |
| **Worker not in CI** | The contact-worker has no deploy job in `.github/workflows/deploy.yml`. | Add a `deploy-contact-worker` job so worker changes ship automatically. |
| **No test gate** | CI never runs `npm test`. The 243 public-site tests do not block a deploy. | Add an `npm test` step to `build-public-site` before the build. |
| **Account ownership** | Everything is now in the Boost account (see §6). | Already migrated to Boost Cloudflare account. |
| **Exposed secrets in locked-area bundle** | `VITE_HYGRAPH_TOKEN_LOCKED` and `VITE_AUTH_PASSWORD` are inlined into the client bundle on every build, so each deploy publishes them. | Move auth server-side; rotate the token. |

---

## 8. Deploy Checklist (run through before/after every release)

**Before merge:**
- [ ] PR targets `main` and CI is green (build + typecheck pass).
- [ ] Lint introduces no new errors.
- [ ] Local `cd apps/public-site && npm test` is green (243 tests).
- [ ] No new secrets are committed; `VITE_` secrets match the GitHub secrets values.

**After merge to main:**
- [ ] GitHub Actions run completes; both deploy jobs succeed.
- [ ] `https://boostbyfcr.se` loads the new build (hard-refresh).
- [ ] `https://boost-by-fcr-locked-area.pages.dev` loads and login works.
- [ ] If the contact-worker changed, it was deployed with `wrangler deploy` and the contact
      form sends email.

**Rollback:**
- Cloudflare Pages → project → **Deployments** → pick a previous deployment →
  **Rollback to this deployment**. (Rollback is a Pages feature; for the worker, re-deploy
  the previous code with `wrangler deploy`.)

---

*Last updated: August 2026. Verify against `.github/workflows/deploy.yml` and the
Cloudflare dashboard before relying on specifics.*
