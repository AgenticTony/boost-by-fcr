# Boost by FCR — Varumärkesfärger & Typografi

**Källa:** Anna Nettrup (projektledare) riktlinjer juni 2026
**Font:** Montserrat (Google Fonts)

---

## Riktlinjer från Anna

> "Det som vi har att förhåll oss till rent grafiskt är att följa färgkoden på vår logo - det blå, röda och vitt. Det innebär dock inte att hela hemsidan behöver vara i dessa färger, men att vi inte kan använda en stark, annan färg. Typsnittet vi brukar använda heter Montserrat."

## Huvudfärger

| Roll | Färgnamn | Hex | Användning |
|------|----------|-----|------------|
| **Navy (primary)** | Boost Navy | `#002A5C` | Huvudfärg — rubriker, navy-sektioner, footer |
| **Red (accent)** | Boost Red | `#D32F2F` | CTA-knappar, accent, stats-nummer |
| **White** | Vit | `#FFFFFF` | Bakgrunder, text på mörkt |

## Mjukare nyanser

| Roll | Hex | Användning |
|------|-----|------------|
| Light red | `#FFEBEE` | Mjuka bakgrunder, hover-states |
| Light blue | `#E3F2FD` | Mjuka bakgrunder |
| Blue accent | `#1565C0` | Tredje spåret (hälsa) |
| Surface | `#F8F7F4` | Sidbakgrund |
| Text | `#333333` | Brödtext |
| Text muted | `#6B7280` | Sekundär text |
| Border | `#E5E7EB` | Kantlinjer |

## Font

| Roll | Värde |
|------|-------|
| Display + Body | `Montserrat`, sans-serif |
| Vikter | 400, 500, 600, 700, 800 |

## Tailwind Theme Tokens

```css
@theme {
  --color-brand-navy: #002A5C;
  --color-brand-red: #D32F2F;
  --color-brand-red-light: #FFEBEE;
  --color-brand-blue-light: #E3F2FD;
  --color-surface: #F8F7F4;
  --color-surface-dark: #002A5C;
  --color-text: #333333;
  --color-text-muted: #6B7280;
  --color-success: #4CAF50;
  --color-error: #D32F2F;
  --color-border: #E5E7EB;
  --font-display: "Montserrat", sans-serif;
  --font-body: "Montserrat", sans-serif;
}
```

## Designprinciper (Anna + inspiration)

- **Mjuk känsla** — runda hörn (rounded-2xl), inga hårda kanter
- **Stora symboler/ikoner** — h-14 w-14, rounded-2xl, mjuka bakgrunder
- **Framträdande statistik** — stora siffror i brand-red (7 500 unga, 3 800 resultat)
- **Träd/rötter-motiv** — hälsosymbol, inte implementerat ännu (behöver grafik)
- **Avatarer istället för foton** — initialer i navy cirklar för personal
- **Inga starka färgkonkurrenter** — endast blå, röd, vit med mjuka nyanser

## Logotyper (URLs)

| Logga | URL |
|-------|-----|
| Boost logo (dark) | `/images/logo_boostbyfcr_dark.png` |
| ESF | `/images/eu-logo-jordbruksfonden.png` |
| FC Rosengård | `/images/FCR_logo_2014_CMYK.png` |
| Arbetsförmedlingen | `/images/af-logo.png` |
| Malmö stad | `/images/malmostad-logo2013-inv.png` |
