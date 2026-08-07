# Handbok för innehållsredigerare — Hygraph

Den här handboken beskriver hur du skapar och hanterar innehåll på boostbyfcr.se med hjälp av Hygraph.

---

## Innehåll

1. [Komma igång](#1-komma-igång)
2. [Skapa en nyhetsartikel](#2-skapa-en-nyhetsartikel)
3. [Hantera teammedlemmar](#3-hantera-teammedlemmar)
4. [Hantera lediga tjänster](#4-hantera-lediga-tjänster)
5. [Ladda upp bilder](#5-ladda-upp-bilder)
6. [Publicera och avpublicera](#6-publicera-och-avpublicera)
7. [När visas ändringar på hemsidan?](#7-när-visas-ändringar-på-hemsidan)

---

## 1. Komma igång

### Logga in i Hygraph

1. Gå till [https://app.hygraph.com](https://app.hygraph.com)
2. Logga in med din e-postadress och lösenord
3. Välj projektet **Boost by FC Rosengård** (det finns två projekt — välj det för den publika hemsidan)

### Vad är Hygraph?

Hygraph är ett publiceringssystem (CMS). Tänk på det som ordbehandling för din hemsida: du skriver text, lägger till bilder och trycker på Publicera — så visas innehållet på boostbyfcr.se.

Du behöver inte kunna kodning. Allt hanteras genom ett enkelt gränssnitt med formulär.

---

## 2. Skapa en nyhetsartikel

### Steg för steg

1. Klicka på **Content** i vänstermenyn
2. Välj modellen **News Items** (under sedan "Boost by FC Rosengård")
3. Klicka på knappen **+ Add entry** (överst till höger)
4. Fyll i formuläret:

| Fält | Vad du fyller i |
|---|---|
| **Title** | Rubriken på artikeln (t.ex. "Ny samarbetspartnerskap med Malmö Stad") |
| **Slug** | Lämna tomt — Hygraph skapar denna automatiskt från rubriken |
| **Preview** | En kort sammanfattning som visas i listan (1-2 meningar) |
| **Tag** | Välj en kategori från rullgardinsmenyn |
| **Cover Image** | Ladda upp eller välj en bild (se avsnitt 5) |
| **Content** | Skriv själva artikeln här (se nedan om RichText) |

### RichText-redigeraren

Fältet **Content** använder en RichText-redigerare (som Word eller Google Docs). Du kan:
- Formatera text med **fetstil**, *kursiv* och rubriker
- Lägga till länkar (markera texten → klicka på länkikonen)
- Lägga till bilder (klicka på bildikonen)
- Skapa listor

### Spara och publicera

5. Klicka på **Save** (diskettikonen) för att spara som utkast
6. Klicka på **Publish** (gröna knappen) för att publicera på hemsidan

> **Viktigt:** Artikeln visas inte på hemsidan förrän du klickar på **Publish**. Att spara räcker inte.

---

## 3. Hantera teammedlemmar

Teammedlemmarna visas på sidan "Om oss" (/vem-vi-ar).

1. Klicka på **Content** i vänstermenyn
2. Välj modellen **Team Members**
3. För att lägga till en ny medlem: klicka **+ Add entry**
4. Fyll i:

| Fält | Vad du fyller i |
|---|---|
| **Name** | Fullständigt namn (t.ex. "Anna Nettrup") |
| **Title** | Jobbtitel (t.ex. "Projektledare") |
| **Email** | E-postadress (visas på hemsidan som en klickbar länk) |
| **Slug** | Lämna tomt — skapas automatiskt |
| **Image** | Ladda upp en profilbild (valfritt — utan bild visas initialer) |

5. Spara och publicera

För att ta bort en medlem: öppna personen → klicka på **Delete** (papperskorgen).

---

## 4. Hantera lediga tjänster

Lediga tjänster visas på sidan "Lediga tjänster" (/lediga-tjanster).

1. Klicka på **Content** i vänstermenyn
2. Välj modellen **Open Positions**
3. För att lägga till en tjänst: klicka **+ Add entry**
4. Fyll i:

| Fält | Vad du fyller i |
|---|---|
| **Title** | Jobbtitel (t.ex. "Projektledare") |
| **Slug** | Lämna tomt — skapas automatiskt |
| **Preview** | Kort beskrivning som visas i listan (1-2 meningar) |
| **Content** | Fullständig annons (RichText — se avsnitt 2) |
| **Image** | Valfri bild |

5. Spara och publicera

> När du tar bort en tjänst (eller avpublicerar den) försvinner den automatiskt från hemsidan. Sidan visar då "Just nu har vi inga lediga tjänster" om inga aktiva tjänster finns.

---

## 5. Ladda upp bilder

### Från din dator

1. Klicka på **Add asset** eller **Upload** i bildfältet
2. Välj bilden från din dator
3. Vänta tills uppladdningen är klar

### Från bildbiblioteket

1. Klicka på **Browse** eller **Select** i bildfältet
2. Välj en tidigare uppladdad bild

### Tips för bilder

- Använd **JPG** för foton och **PNG** för grafik/logotyper
- Max rekommenderad storlek: **500 KB** (större bilder gör hemsidan långsam)
- Rekommenderad bredd: **1200-1600 px**
- Du kan beskära bilden i Hygraph efter uppladdning

---

## 6. Publicera och avpublicera

### Publicera (göra synligt på hemsidan)

1. Öppna innehållet du vill publicera
2. Klicka på **Publish** (grön knapp uppe till höger)
3. Bekräfta

### Avpublicera (gömma från hemsidan)

1. Öppna innehållet
2. Klicka på **Unpublish** (bredvid Publish-knappen)
3. Bekräfta

> Avpublicering raderar **inte** innehållet — det gömmer det bara. Du kan alltid publicera igen senare.

### Radera helt

1. Öppna innehållet
2. Klicka på **Delete** (papperskorgen)
3. Bekräfta

> **Varning:** Radering kan inte ångras. Om du är osäker — avpublicera istället.

---

## 7. När visas ändringar på hemsidan?

När du publicerar eller ändrar innehåll i Hygraph sker följande:

1. Hygraph sparar ändringen direkt
2. Hemsidan hämtar det nya innehållet inom **5-15 minuter**
3. Besökare kan behöva **ladda om sidan** för att se ändringen

### Varför tar det tid?

Hemsidan använder ett CDN (Content Delivery Network) som sparar en kopia av innehållet för att ladda snabbt. CDN:en uppdateras några gånger per timme, så det kan dröja upp till 15 minuter innan ändringar syns.

### Snabbare uppdatering

Om du behöver att en ändring ska synas omedelbart, kontakta en utvecklare som kan rensa CDN-cachen manuellt.

---

## Bra att veta

- **Spara ofta** — Hygraph sparar inte automatiskt medan du skriver
- **Förhandsgranska** — använd Draft-läget för att spara ett utkast utan att publicera
- **Inloggningsproblem** — kontakta Alan eller utvecklarteamet om du inte kan logga in
- **Backup** — Hygraph sparar alla tidigare versioner, så du kan alltid ångra ändringar

---

*Senast uppdaterad: augusti 2026*
