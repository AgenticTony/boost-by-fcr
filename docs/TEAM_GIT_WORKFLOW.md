# Boost by FCR — Team Git Workflow

**Repo:** https://github.com/AgenticTony/boost-by-fcr
**Owner:** Anthony (AgenticTony)
**Senast uppdaterad:** 2026-05-28

---

## Daglig rutin — innan du börjar koda

```bash
# 1. Gå till repo-mappen
cd boost-by-fcr

# 2. Hämta senaste ändringar
git checkout main
git pull origin main

# 3. Skapa din feature-branch för dagen
git checkout -b feature/pX-kort-beskrivning
```

**Branch-namnkonvention:**

| Prefix | Används for | Exempel |
|--------|-------------|---------|
| `feature/p1-` | Ny funktionalitet | `feature/p1-projects-doc-type` |
| `feature/p2-` | Ny funktionalitet | `feature/p2-homepage` |
| `feature/p3-` | Ny funktionalitet | `feature/p3-backoffice-branding` |
| `feature/p4-` | Ny funktionalitet | `feature/p4-login-page` |
| `fix/pX-` | Buggfix | `fix/p2-mobile-nav` |
| `chore/pX-` | Konfiguration, deps | `chore/p4-ci-pipeline` |

---

## Nar du är klar — pusha & skapa PR

### Steg 1: Spara dina andringar

```bash
# Se vad du andrat
git status

# Lagg till dina filer (anvand specifika filer, inte alltid -A)
git add apps/public-site/src/pages/Home.tsx
git add apps/public-site/src/components/Header.tsx

# Eller om du andrat manga filer i din app
git add apps/public-site/

# Committa med beskrivande meddelande
git commit -m "feat(p2): add homepage with hero section and initiative highlights"
```

### Commit-meddelanden

Format: `typ(scope): beskrivning`

| Typ | Anvands for |
|-----|-------------|
| `feat` | Ny funktion eller sida |
| `fix` | Buggfix |
| `style` | CSS, styling, inga logikandringar |
| `refactor` | Omstrukturering utan beteendeandring |
| `chore` | Konfiguration, dependencies, build |
| `docs` | Dokumentation |

**Scope** = din roll: `p1`, `p2`, `p3`, `p4`

Exempel:
```
feat(p1): add Project document type with all fields
feat(p2): add FAQ page with accordion component
fix(p3): hide developer tools from Anna's view
chore(p4): set up GitHub Actions CI pipeline
```

### Steg 2: Pusha till GitHub

```bash
git push origin feature/p2-homepage
```

### Steg 3: Skapa Pull Request

```bash
# Snabbaste sättet — via terminalen
gh pr create --title "feat(p2): homepage with hero and initiatives" --body ""
```

Eller ga till https://github.com/AgenticTony/boost-by-fcr — det dyker upp en gron knapp "Compare & pull request".

### Steg 4: Be om review

Informera teamet i teamchatten:

> "PR uppe for homepage, kan nsn reviewa? #p2"

Vem som helst kan reviewa. Hall koll:
- **Rutin-PRs** (nya sidor, styling) → nasta tillgangliga person reviewar
- **Cross-cutting PRs** (shared-types, CI/CD) → Robert (TL) reviewar
- **Reviewa inte din egen kod** — alltid nagon annan

### Steg 5: Efter godkand review

```bash
# Squasha och merge via GitHub (rekommenderas)
gh pr merge <PR-nummer> --squash

# Rensa din lokala branch
git checkout main
git pull origin main
git branch -d feature/p2-homepage
```

---

## Regler

1. **ALDRIG** pusha direkt till `main` — alltid via PR
2. **ALDRIG** andra filer i nagon annans app-mapp utan att prata med dem forst
3. **EN review** kravs for att mergea
4. **Pulla main** innan du borjar koda varje dag
5. **Sma PRs** — en funktion/sida per PR, inte en hel sprint
6. **Committa ofta** — hellre 5 sma commits an 1 jatte

---

## Karta — vem ror vad

```
boost-by-fcr/
├── apps/
│   ├── cms/            ← MARCUS (P1) + ROBERT (P3)
│   ├── public-site/    ← ANTHONY (P2)
│   └── locked-area/    ← MOHAND (P4)
├── packages/
│   └── shared-types/   ← ALLA (andras sallan, koordinera vid andring)
├── .github/workflows/  ← MOHAND (P4)
├── docs/               ← ALLA
└── README.md           ← ALLA
```

Om du MASTE andra nagot utanfor din mapp:
1. Skapa en issue eller skriv i chatten
2. Lat personen som ager mappen gora andringen, ELLER
3. Skapa en PR och lat agaren reviewa

---

## Problem-losning

### "Jag har skrivit kod i main av misstag"
```bash
git checkout -b feature/p2-my-changes
git push origin feature/p2-my-changes
git checkout main
git reset --hard origin/main
```

### "Merge conflict nar jag pullar main"
```bash
git pull origin main
# Oppna filerna som har konflikter
# Leta efter <<<<<<< HEAD
# Valj ratt kod, ta bort markorerna
git add .
git commit -m "fix: resolve merge conflicts"
```

### "Jag vill ogora min senaste commit (inte pushad annu)"
```bash
git reset --soft HEAD~1
# Andringarna finns kvar som unstaged
```

---

## Snabb-referens

```bash
# Starta dagen
git checkout main && git pull origin main
git checkout -b feature/p2-what-im-doing

# Slut pa dagen
git add apps/public-site/
git commit -m "feat(p2): what i built"
git push origin feature/p2-what-im-doing
gh pr create --title "feat(p2): what i built" --body ""

# Nasta morgon — borja om fran toppen
```
