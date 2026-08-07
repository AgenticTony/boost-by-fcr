# Projektöversikt — Boost by FC Rosengård

Den här översikten är skriven för dig som inte är utvecklare. Den förklarar vad projektet är, vilka plattformar som används och vem som gör vad.

---

## Vad är projektet?

Boost by FC Rosengård har fått en ny hemsida. Den består av två delar:

| Webbplats | Adress | Syfte |
|---|---|---|
| **Publika hemsidan** | boostbyfcr.se | Den allmänna hemsidan med nyheter, information om verksamheten, kontaktformulär m.m. |
| **Medlemsportalen** | boost-by-fcr-locked-area.pages.dev | En lösenordsskyddad sida för ledare och medarbetare med övningsbibliotek, resurser och handböcker |

Båda webbplatserna är byggda med samma design så de upplevs som en enda webbplats.

---

## Vilka plattformar används?

Projektet använder fyra plattformar. Här är vad varje plattform gör — på enkla svenska:

### 1. Hygraph — Innehållssystem (CMS)

**Vad det är:** Ett system där du (Anna) skriver in allt innehåll — nyheter, teammedlemmar, lediga tjänster.

**Vad du behöver veta:** Du loggar in på Hygraph, skriver dina artiklar och trycker Publicera. Då visas innehållet på hemsidan automatiskt. Du behöver inte kunna kodning.

**Jämförelse:** Tänk på Hygraph som Word-dokumentet där du skriver — och hemsidan som papperet som visas för besökaren.

### 2. Cloudflare — Publicering (hosting)

**Vad det är:** Den tjänst som "lägger ut" hemsidan på internet så att besökare kan se den.

**Vad du behöver veta:** Normalt sett behöver du inte logga in här. Men om hemsidan är nere eller inte uppdateras kan problemet ligga i Cloudflare.

**Jämförelse:** Tänk på Cloudflare som tryckeriet som tar ditt Word-dokument och gör det till en tidning som folk kan köpa.

### 3. GitHub — Kodlagring

**Vad det är:** Där all kod för hemsidan sparas. Utvecklarna arbetar här.

**Vad du behöver veta:** Du behöver normalt inte bry dig om GitHub. Det är utvecklarnas arbetsyta.

**Jämförelse:** Tänk på GitHub som ritningsarkivet för ett hus. Hemsidan är huset, GitHub är ritningarna.

### 4. Resend — E-post

**Vad det är:** Tjänsten som skickar e-post från hemsidan (t.ex. verifieringsmejl för medlemsportalen och bekräftelser från kontaktformuläret).

**Vad du behöver veta:** Om besökare inte får bekräftelsemejl kan problemet ligga i Resend. Domänen `boostbyfcr.se` måste vara verifierad i Resend för att e-post ska skickas till andra än administratören.

---

## Hur hänger allt ihop?

Här är flödet i fyra steg:

1. **Anna skriver innehåll** i Hygraph (nyhet, teammedlem, tjänst)
2. **Hygraph sparar** innehållet i sin databas
3. **Hemsidan hämtar** innehållet från Hygraph när en besökare öppnar sidan
4. **Besökaren ser** innehållet i sin webbläsare

Detta kallas en "headless CMS-arkitektur" — innehållet (Hygraph) är separerat från presentationen (hemsidan). Fördelen är att du kan ändra innehållet när som helst utan att behöva en utvecklare.

---

## Kontaktformuläret

När någon fyller i kontaktformuläret på boostbyfcr.se sker följande:

1. Besökaren fyller i formuläret och klickar Skicka
2. Hemsidan skickar meddelandet till en liten server (Cloudflare Worker)
3. Servern skickar ett e-postmeddelande till Boosts inkorg via Resend

Om formuläret inte fungerar kan felet ligga i antingen Cloudflare Worker eller Resend.

---

## Vem kontaktar jag?

| Problem | Vem du kontaktar |
|---|---|
| **Ändra innehåll** (nyheter, team, tjänster) | Anna gör det själv i Hygraph |
| **Kan inte logga in i Hygraph** | Alan eller utvecklarteamet |
| **Hemsidan är nere** | Utvecklarteamet (Alan koordinerar) |
| **E-post fungerar inte** (kontaktformulär, medlemsportalen) | Utvecklarteamet |
| **Något ser konstigt ut** på hemsidan | Ta en skärmdump och skicka till utvecklarteamet |
| **Vill ha ny funktion** | Prata med Alan som prioriterar med utvecklarteamet |
| **Fakturering** (Hygraph, Cloudflare, Resend) | Alan |

---

## Bra att veta

- **Hemsidan uppdateras inte omedelbart.** När du publicerar i Hygraph kan det ta 5-15 minuter innan ändringen syns på hemsidan (på grund av caching).
- **Två Hygraph-projekt.** Det finns två separata projekt i Hygraph — ett för den publika hemsidan och ett för medlemsportalen. Anna använder det publika projektet för dagligt innehåll.
- **Medlemsportalen kräver inloggning.** Nya användare måste skapa ett konto och bli godkända av en administratör innan de får tillgång.
- **Allt sparas.** Både Hygraph och GitHub sparar historik, så ingenting försvinner permanent av misstag.

---

*Senast uppdaterad: augusti 2026*
