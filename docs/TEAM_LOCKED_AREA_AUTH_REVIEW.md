# Locked Area — Auth Architecture Review

**Date:** 2026-07-07
**Scope:** `apps/locked-area/` only (P4 — Mohand's domain)
**Audience:** Mohand (P4), Alan (TL), Anthony (P2)
**Purpose:** Flag architectural issues in the locked-area auth before the project is
handed over to the client. This is a findings + options document, not a blame
post-mortem — the goal is a clear path to "safe to hand over."

---

## TL;DR

The locked-area login form got real server-side logic in #67/#69 (good progress),
but the **auth architecture underneath is still not protectable**, because Hygraph
is being used as the user/auth database. Hygraph is a CMS — it has no auth
primitives, and the way it's wired here puts a write-capable API token in the
browser bundle. This needs an architectural decision before handover, not a patch.

**The public site (`apps/public-site`) has none of these issues** — it has no user
accounts, so this is strictly a locked-area conversation.

---

## What the locked area is

A separate app (`boost-locked-area`, deployed to its own `*.pages.dev` URL, not
linked from the public site) holding Boost's internal methodology material for
leaders/coaches:

- `/handbook` — Metodhandbok för Ledare
- `/library`, `/exercise/:id` — exercises
- `/knowledge`, `/resources` — knowledge articles + professional contacts
- `/admin/approvals` — admin screen to approve/deny new member signups (#69)

Access: staff go to the locked-area URL directly → `/login`. Self-registration is
enabled, which creates a draft Member an admin approves before they can sign in.

---

## The core problem: Hygraph is being used as the auth database

Hygraph is a headless CMS. It stores **content** behind a token-secured GraphQL
API. It has no concept of users, sessions, passwords, hashing, rate-limiting, or
role-based access control.

But the current auth uses a Hygraph **content model** (`Member`) as the users
table:

- **Login** = a GraphQL query that fetches the `Member` by email and compares the
  stored password field (`AuthContext.tsx:78-106`).
- **Register** = a `createMember` + `publishMember` GraphQL mutation that writes
  a content entry (`AuthContext.tsx:154-191`).
- **Passwords** = a field on that content entry, "hashed" with a custom
  client-side function (`AuthContext.tsx:60-70`).

This wasn't the original design — the brief (`Boost_Arbetsuppdelning:95,116`)
specified *"Umbraco Members + JWT."* When the stack moved from Umbraco to Hygraph,
a dedicated auth provider wasn't added, and Hygraph was asked to do two jobs.

---

## Specific findings (all high confidence, with file:line)

### 1. The Hygraph token is in the client bundle — and it's a write token
**File:** `apps/locked-area/src/auth/AuthContext.tsx:27-28, 48-58, 154-191`

`VITE_HYGRAPH_TOKEN_LOCKED` is sent from the browser. Because any `VITE_`-prefixed
variable is inlined into the built JS, **anyone can extract this token**. It's
used for `createMember` / `publishMember` **mutations**, not just reads.

**Impact:** Anyone who reads the token from the bundle can create, publish, or
delete Member records directly via the Hygraph API — **bypassing the login form,
the `isApproved` check, and the admin approval flow entirely.** The app's auth
checks become cosmetic. This is the most serious finding and it got *worse* in #69
(read token → write token).

**Fix:** the Hygraph token must move server-side (Worker or BFF). The browser must
never hold it.

### 2. The session is forgeable (the original bypass still works)
**File:** `AuthContext.tsx:36-46, 124-125` · `components/ProtectedRoute.tsx:9,22`

On load, auth state is read from `localStorage['fcr_user']` and trusted blindly
(`isAuthenticated = !!user`). `ProtectedRoute` trusts that.

**Impact:** anyone can open DevTools and run:
```js
localStorage.setItem('fcr_user',
  JSON.stringify({id:"x",email:"anyone@x.com",isVerified:true,isApproved:true}))
```
…then reload → full access to all protected content. The login form got harder;
the session it produces didn't change. This is the same bypass flagged in the
original audit, untouched by #67/#69.

**Fix:** auth state must come from a **server-issued, signed, short-lived token**
stored in an httpOnly + Secure + SameSite cookie — not from localStorage. The
client must not be able to mint or edit it.

### 3. "Admin" is decided by a hardcoded email — and it's forgeable
**File:** `AuthContext.tsx:211`

```ts
isAdmin: user?.email === 'moh17670s@gmail.com',
```

**Impact:** combined with finding #2, anyone who sets that exact email in
`localStorage['fcr_user']` becomes an admin and reaches `/admin/approvals`. There
is no server-side authorization at all.

**Fix:** roles must be a server-side property of the session, verified on every
protected request — never a client-side string comparison.

### 4. Passwords are stored as a CMS field with a custom "hash"
**File:** `AuthContext.tsx:60-70` (hash), `:148-159` (stored on create)

`hashPassword` is a DJB2-style transform with a **hardcoded salt**
(`'fcr-salt-2026'`), run client-side. It is deterministic and trivially
reproducible from the bundle — it is not real password hashing.

**Impact:** Member password values in Hygraph are effectively recoverable. Anyone
with Hygraph admin access, an environment clone, or a data export can read the
"hashes" and reproduce the transform for any candidate password.

**Fix:** password hashing must be done **server-side** with a proper slow KDF
(bcrypt, argon2, or scrypt), and the Member content model must **not** store
passwords at all. (If you adopt a real auth provider per option A below, this
disappears automatically.)

### 5. Dead auth files still in the tree
**Files:** `apps/locked-area/src/auth/passwordAuth.ts`, `auth/hygraphAuth.ts`

These were the original trivially-bypassable auth (client-side string compare
against `VITE_AUTH_PASSWORD`). They're no longer imported anywhere —
`main.tsx`/`App.tsx`/`login.tsx` all use `AuthContext` now — but the files remain
and still contain the old `VITE_AUTH_PASSWORD` reference.

**Fix:** delete them. `passwordAuth.ts` still hardcodes `moh17670s@gmail.com`
too.

---

## What this means for handover

The locked area is **not handover-ready** on its current path. Findings #1 and #2
mean the area isn't actually protected — and #1 specifically means a malicious
visitor can corrupt the member data in Hygraph. A client handover would transfer
that liability to Boost.

**However**, the locked area is genuinely **separable** from the public-site
handover: it's a different app, a different URL, unlinked from the public site,
and its content (`resurser.tsx` says "under uppbyggnad") isn't finished anyway.
A reasonable phased handover is:

- **Phase 1 (now):** hand over the **public site** — it's clean.
- **Phase 2 (later):** ship the locked area once auth is rebuilt per one of the
  options below and the methodology content exists.

---

## Options for fixing (pick one)

Both options move auth off the client and keep Hygraph as a pure content store.

### Option A — Adopt a dedicated auth provider (recommended)
Use **Supabase Auth**, **Clerk**, or **Auth0** (all have free/cheap tiers).

- The provider owns users, passwords (hashed correctly), sessions, email
  verification, and password reset.
- The locked-area app talks to the provider for auth; Hygraph stays content-only,
  token kept server-side.
- The admin-approval flow (#69) maps onto the provider's roles/metadata.
- **Effort:** ~1–2 days to wire in. Least risk, least ongoing maintenance.

### Option B — A small Cloudflare Worker as the auth boundary
A Worker holds the Hygraph token and the auth logic.

- Endpoints: `POST /login`, `POST /register`, `POST /logout`, middleware that
  validates a signed session cookie.
- Passwords hashed server-side (bcrypt/argon2 via `@noble/hashes` or Web Crypto
  + scrypt). Sessions = httpOnly + Secure + SameSite cookies holding a signed JWT
  the Worker validates per request.
- Hygraph token never leaves the Worker; the browser only ever sees the session
  cookie.
- **Effort:** ~2–4 days. More control, more code to maintain.

**Either way:** the `Member` content model in Hygraph should stop storing
passwords, and the locked-area app should not read/write Members via the Hygraph
token from the browser.

---

## Recommended next step

Decision from the TL + Mohand on **Option A vs Option B**, scoped as a tracked
item in `TEAM_REMAINING_WORK.md` under P4. Until then, the public-site handover
can proceed independently.

---

*Authored by Anthony (P2) following the full-project audit. Corrections welcome —
this is meant to start the conversation, not close it.*
