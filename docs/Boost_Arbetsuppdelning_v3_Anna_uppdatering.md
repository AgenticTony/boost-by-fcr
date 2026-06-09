**Boost by FCR — Arbetsuppdelning**

*Alternativ B med Umbraco Headless*

4-personers teamfördelning — uppdaterad version

Version 2.0 | Maj 2026

# 1. Vad har ändrats sedan version 1?

Vi har bestämt oss för att använda Umbraco 13 som CMS i Alternativ B istället för att bygga adminpanelen från grunden. Det här är en stor förbättring — vi får det bästa av båda världarna:

* Anna får Umbracos beprövade backoffice (20+ års UX-förfining) för att hantera innehåll
* Teamet bygger fortfarande React + TypeScript-frontends (publik sida + låst Metodmaterial)
* P3:s största risk försvinner — vi behöver inte bygga ett helt CMS från grunden
* Microsoft for Nonprofits-bidraget täcker fortfarande allt (.NET + Azure)
* Mindre arbete totalt: ~290h istället för ~320h

|  |
| --- |
| **💡 Vad är "Umbraco Headless"?**  Umbraco körs som ett headless CMS — det vill säga, Anna hanterar innehåll i Umbracos backoffice, men hemsidan renderas inte av Umbraco. Istället exponerar Umbraco innehållet som JSON via dess inbyggda Delivery API. Vår React-app hämtar innehåll därifrån och renderar det med Tailwind. Anna ser ett moget CMS, besökare ser en modern React-sajt. |

# 1.5 Uppdatering: Förtydliganden från Anna (mejl 27 maj 2026)

Anna har svarat på våra frågor. Nedan sammanfattas vad som **bekräftats**, vad som **ändrats**, och en **ny risk**. Detaljerna är dessutom inflikade och gulmarkerade på relevanta ställen längre ner i dokumentet (under P1–P4) så att var och en ser vad som påverkar just sin roll.

**Teckenförklaring**

**BEKRÄFTAT**  Anna bekräftade planen — inget ändras.

**ÄNDRAT**  Något behöver justeras i bygget.

**NY RISK**  Kräver ett beslut av teamet.

**BEKRÄFTAT Anmälan behålls som Google Form**

Formuläret går direkt till Boost och sparas lokalt hos dem. INGA personuppgifter ska lagras på nätet (GDPR). Formuläret ska innehålla samma fält som idag — Boost har redan komprimerat det så mycket de kan. Vi bygger alltså ingen databas eller backend för anmälningar.

**Påverkar:** *P2 (bekräftar nuvarande plan)*

**BEKRÄFTAT Holistiskt arbetssätt = bara text**

Det holistiska arbetssättet är en filosofi (hela individen, inte bara CV) och kräver INGA särskilda funktioner. Det handlar bara om texten som uttrycker detta på Vårt arbetssätt-sidan. Ingen deltagar-profilering eller spårningsfunktion ska byggas.

**Påverkar:** *P2 (bekräftar nuvarande plan)*

**ÄNDRAT Finansiärer OCH partners — logga + en mening, även i footern**

Finansiärernas och samarbetspartnernas loggor ska visas i samband med projekten OCH längst ner på sidan (footern). Även Arbetsförmedlingen och Malmö stad ska med — alltså inte bara finansiärer utan även partners. Varje aktör behöver bara EN mening + en logga. Anna har redan tagit fram nya texter som ska ersätta de befintliga (vi bör be henne skicka dem).

**Påverkar:** *P1 (utöka Financier-modellen till att även rymma partners + en kort beskrivning) & P2 (footer med loggor)*

**ÄNDRAT Anna är ENDA redaktören**

Anna är enda kontaktperson och redaktör. Hennes kollegor arbetar operativt och är "mindre tekniska" — hon beskriver dem som "analfabeter inom området". Utbildning och dokumentation ska därför fokusera helt på Anna, och backoffice ska vara så enkel som möjligt för en icke-teknisk ensam användare.

**Påverkar:** *P3 (utbildning riktas mot Anna; förenkla backoffice ytterligare)*

**BEKRÄFTAT Välmåendearenan bekräftad som modell + input på väg**

Välmåendearenan (valmaendearenan.se) är rätt modell för hur metodboken ska fungera på sidan. BONUS: Anna har bett några av Boosts unga deltagare om exempel på hemsidor de gillar — värdefull användarinput vi bör efterfråga. Hon pekar ut "Alan" som teknisk kontaktperson hos er för hur sidan sätts upp.

**Påverkar:** *P4 (bekräftar valmaendearenan-stil; samla in ungdomarnas exempel)*

**NY RISK Microsoft for Nonprofits — Anna kommer inte åt kontot**

Anna har försökt men någon skapade ett konto för flera år sedan och hon har inte tillgång till uppgifterna — och inte tid att fortsätta jaga det. Det betyder att Azure-hosting via bidraget INTE är säkrat. Vi behöver en Plan B. Rekommendation: hosta på Hetzner (~140 €/år ex moms för en CX33-server, se P4 + Risker). Beslut behövs på mötet.

**Påverkar:** *P4 (hosting-strategi) — beslut för hela teamet*

**BEKRÄFTAT Boost betalar domänförnyelsen**

Boost står för förnyelsen av boostbyfcr.se (~100–150 kr/år). Inget vi behöver lösa.

**Påverkar:** *P4 (ingen åtgärd)*

**ÄNDRAT Om oss utökas med en "historier"-del**

Relationen till FC Rosengård ska presenteras under Om oss. Anna vill dessutom ha en del med historier — Boosts egen historia (som även sammanfattar relationen till FCR) plus berättelser som deltagare vill dela. Det gör Om oss-sidan större än tidigare planerat: Tidslinje + historik + deltagarberättelser. Finansiärer presenteras bara med en mening + logga (inte fulla porträtt).

**Påverkar:** *P2 (Om oss blir en rikare sida än enbart Tidslinjen)*

**Obs:** *Anna kan inte delta på mötet (konferens/mässa resten av veckan) men svarar på mejl. Frågor vi bör mejla henne: be om de nya finansiär-/partnertexterna, samt ungdomarnas exempel-sajter.*

# 2. Arkitekturöversikt

Systemet består av tre huvudkomponenter:

**1. React Publik Sida (P2)**

Byggd med React + Vite + TypeScript + Tailwind. Hämtar innehåll via Umbracos Delivery API. Det är detta besökare ser på boostbyfcr.se.

**2. React Låst Yta (P4)**

Separat React-app för Metodmaterial-handboken. Använder Umbracos Members API för autentisering.

**3. Umbraco 13 (P1 + P3)**

Hanterar all innehållsstruktur, Anna loggar in här. Exponerar Delivery API för React-apparna. Inkluderar Members-system för låst yta.

# 3. Teknikstack — uppdaterad

## Backend & CMS

|  |  |
| --- | --- |
| **Komponent** | **Val** |
| Runtime | .NET 8 (LTS) |
| Språk | C# 12 |
| CMS | **Umbraco 13 (LTS) — headless mode** |
| Ramverk | ASP.NET Core 8 (under Umbraco) |
| ORM | Entity Framework Core 8 (hanteras av Umbraco) |
| Databas (dev) | SQLite |
| Databas (prod) | Azure SQL Database (Basic) |
| Content API | **Umbraco Delivery API (inbyggt)** |
| Medlems-auth (låst yta) | **Umbraco Members + JWT** |
| Filuppladdning | Umbraco Media + Azure Blob Storage |
| E-post (formulär) | MailKit + Resend (gratisnivå) |
| Loggning | Serilog + Application Insights |

## Frontend (publik sida + låst Metodmaterial)

|  |  |
| --- | --- |
| **Komponent** | **Val** |
| Ramverk | React 18 |
| Språk | TypeScript 5 |
| Build-verktyg | Vite |
| Routing | React Router v6 |
| Server-state | TanStack Query (React Query) |
| Formulär | React Hook Form + Zod |
| Styling | Tailwind CSS |
| UI-komponenter | shadcn/ui |
| Ikoner | Lucide React |
| Animationer | Framer Motion (för Tidslinje) |

## Infrastruktur

|  |  |
| --- | --- |
| **Komponent** | **Val** |
| Hosting (Umbraco) | Azure App Service B1 (Linux) |
| Hosting (React-appar) | Azure Static Web Apps eller Cloudflare Pages |
| Lagring (media) | Azure Blob Storage |
| Övervakning | Application Insights |
| DNS | Cloudflare DNS (gratis) |
| Versionshantering | Git + GitHub (Team Plan via NGO-program) |
| CI/CD | GitHub Actions |
| Finansiering | **Microsoft for Nonprofits ($2,000/år Azure-krediter)** |

# 4. Repo-struktur

Monorepo med Umbraco i mitten och två React-appar runt:

**boost-by-fcr/**

├── .github/workflows/ — CI/CD-pipelines

├── apps/

│ ├── cms/ — Umbraco 13 (P1 + P3)

│ │ ├── Boost.Cms/ — Umbraco-projekt

│ │ ├── App\_Plugins/ — Anpassade backoffice-tillägg (P3)

│ │ └── DocumentTypes/ — Innehållsmodeller (P1)

│ ├── public-site/ — React SPA för besökare (P2)

│ │ ├── src/pages/

│ │ ├── src/components/

│ │ └── src/api/ — Umbraco Delivery API-klient

│ └── locked-area/ — React SPA för låst Metodmaterial (P4)

│ ├── src/pages/

│ └── src/auth/ — Umbraco Members-integration

├── packages/

│ └── shared-types/ — Delade TypeScript-typer (auto-genererade från Umbraco)

└── README.md

# 5. Arbetsuppdelning — översikt

Varje person äger en tydlig vertikal del. Total estimerad tid: ~290 timmar fördelat över ~10 veckor (30h mindre än ren custom-version).

|  |  |  |  |
| --- | --- | --- | --- |
| **Roll** | **Ansvarsområde** | **Huvudleverans** | **Timmar** |
| **P1** | Umbraco-konfiguration & Backend | Umbraco 13 setup, document types, Delivery API, custom endpoints | ~70h |
| **P2** | Publik frontend | React-app som hämtar innehåll från Umbracos Delivery API | ~75h |
| **P3** | Umbraco-anpassning & Annas upplevelse | Backoffice-anpassning, custom property editors, utbildning | ~70h |
| **P4** | Låst yta & deployment | Metodmaterial-bibliotek, Members-auth, CI/CD, Azure | ~75h |

|  |
| --- |
| **P1 — Umbraco-konfiguration & Backend** · ~70 timmar |

## Huvuduppdrag

P1 sätter upp Umbraco 13, designar alla document types och säkerställer att Delivery API exponerar rätt innehåll till React-apparna. Mindre arbete än ren custom-version eftersom vi inte behöver bygga adminpanel.

## Ansvarsområden — Umbraco-uppsättning

* Installera Umbraco 13 (LTS) i headless-konfiguration
* Installera NuGet-paket: Umbraco.Cms, Umbraco.StorageProviders.AzureBlob, Serilog
* Konfigurera SQLite för dev, Azure SQL för prod
* Aktivera och konfigurera Umbraco Delivery API
* Aktivera Umbraco Members-system (för låst Metodmaterial)
* Skapa seed-data: admin-användare, 20+ års tidslinje-historik från befintlig sajt

## Ansvarsområden — Document Types (innehållsmodeller)

* Project — Aktiva initiativ (Title, Description, Method, Financier, IsActive, StartDate, EndDate)
* Initiative — Tidslinjeposter (Year, Title, Description, LogoUrl, Financier)
* Page — Generella redigerbara sidor (Slug, Title, Content som rich text)
* Faq — Vanliga frågor (Question, Answer, DisplayOrder)
* Post — Nyheter/blogg (Title, Content, ImageUrl, PublishedAt)
* Material — Metodmaterial (Title, Description, FileUrl, IsPublic, Category)
* Exercise — Övningar i valmaendearenan-stil (Title, Category, Duration, TargetGroup)
* MethodArticle — Långform metodartiklar (Title, Content, Images)
* Financier — Återanvändbar finansiärs-modell (Name, Logo, Url) — kopplas till Projects/Initiatives

**▶ ÄNDRAT (Annas mejl 27/5):**  *Utöka denna modell så den även rymmer PARTNERS (Arbetsförmedlingen, Malmö stad), inte bara finansiärer. Lägg till ett kort beskrivningsfält (en mening) utöver Name/Logo/Url. Loggorna ska kunna visas både vid projekten och i footern.*

## Ansvarsområden — Custom endpoints

* POST /api/contact — Kontaktformulär med MailKit + Resend-integration
* POST /api/members/login — Inloggning till låst Metodmaterial
* GET /api/members/verify — JWT-verifiering för låsta resurser
* Konfigurera CORS för React-apparna
* Swagger/OpenAPI-dokumentation för custom endpoints

## Beroenden

**Blockerar:** P2 (väntar på document types + Delivery API), P3 (väntar på Umbraco-installation)

**Beroende av:** P4 för Azure-databas och nyckelhantering

## Viktiga leveranser per vecka

* Vecka 1: Umbraco installerat lokalt, första document type (Project) klar, Delivery API live
* Vecka 2: Alla document types klara, P3 kan börja anpassa backoffice
* Vecka 3-4: Members-system konfigurerat, custom endpoints (contact, member auth)
* Vecka 5-6: Stötta P2/P4 med API-frågor, finjustera content delivery
* Vecka 7-10: Buggfixar, dokumentation, deployment-stöd

|  |
| --- |
| **✓ P1:s arbete är nu mycket lägre risk**  Eftersom Umbraco hanterar 80% av backend-arbetet (auth, content management, file storage, rich text) kan P1 fokusera på att modellera innehåll korrekt istället för att bygga grundläggande infrastruktur. ~15h sparade jämfört med ren custom-version. |

|  |
| --- |
| **P2 — Publik Frontend** · ~75 timmar |

## Huvuduppdrag

P2 bygger den publika React-sajten som besökare ser på boostbyfcr.se. Hämtar innehåll från Umbracos Delivery API istället för custom API. Resten av jobbet är detsamma — fokus på mobilförst, snabbhet, SEO och tillgänglighet.

## Ansvarsområden

* Sätt upp React 18 + Vite + TypeScript + Tailwind CSS-projekt
* Konfigurera Tailwind med Boosts varumärkesfärger (navy/vit) i tailwind.config.js
* Bygga delade komponenter: Header, Footer, Navigation (mobilförst), Button, Card, Container
* Implementera React Router för alla publika rutter
* Integrera TanStack Query för Umbraco Delivery API-anrop med caching
* Generera TypeScript-typer från Umbracos schema (delade i packages/shared-types)
* Bygga sida: Hem (med aktiva initiativ-höjdpunkter + finansiärslogotyper)

**▶ ÄNDRAT (Annas mejl 27/5):**  *Footern ska visa loggor för finansiärer OCH partners (ESF, Arvsfonden, Arbetsförmedlingen, Malmö stad, FC Rosengård). En mening + logga per aktör.*

* Bygga sida: Anmälan (inbäddad Google Form)

**▶ BEKRÄFTAT (Annas mejl 27/5):**  *Behåll som Google Form. Går direkt till Boost, sparas lokalt hos dem — ingen backend, inga personuppgifter på nätet (GDPR). Samma fält som dagens formulär.*

* Bygga sida: Aktiva initiativ (lista + detaljvy)
* Bygga sida: Vårt arbetssätt & metod (rich text från Umbraco)

**▶ BEKRÄFTAT (Annas mejl 27/5):**  *Bara text/rich text — inga särskilda funktioner för det holistiska arbetssättet. Anna skickar färdiga texter.*

* Bygga sida: Vanliga frågor (FAQ-ackordeon)
* Bygga sida: Företag & samarbeten
* Bygga sida: Om oss → Tidslinje (visuell mittpunkt — 20+ år)

**▶ ÄNDRAT (Annas mejl 27/5):**  *Utöka denna sida: utöver Tidslinjen ska Om oss innehålla Boosts historia, relationen till FC Rosengård och en del med deltagarberättelser ("historier"). Planera detta som en rikare, redaktionell sida — inte bara tidslinjen.*

* Bygga sida: Nyheter / blogg
* Bygga sida: Publik Metodmaterial
* Bygga sida: Kontakt (formulär kopplat till P1:s custom endpoint)
* Implementera SEO meta-taggar + Open Graph
* Tillgänglighet: tangentbordsnavigering, alt-texter, kontrastförhållanden, semantisk HTML
* Lighthouse-tester: Performance ≥90, Accessibility ≥95, SEO ≥95
* Loading- och errorstates på alla sidor

## Beroenden

**Blockerar:** Ingen — P2 jobbar mest fristående

**Beroende av:** P1 (Delivery API + document types definierade)

## Viktiga leveranser per vecka

* Vecka 1: Projekt uppsatt, layout + Hem-sida (med mock-data)
* Vecka 2-3: Alla statiska sidor klara, första integration med Umbraco
* Vecka 4-5: Dynamiska sidor (Initiativ, Nyheter, FAQ) integrerade med Delivery API
* Vecka 6: Tidslinje-komponent klar
* Vecka 7-8: Tillgänglighets- och prestandafixar
* Vecka 9-10: Polering, buggfixar, finjustering

|  |
| --- |
| **💡 Tips för P2**  Umbraco Delivery API returnerar välstrukturerad JSON. Skapa en typad API-klient med autogenererade TypeScript-typer från Umbraco. Använd mock-data första veckan så du inte blockeras av P1. |

|  |
| --- |
| **P3 — Umbraco-anpassning & Annas upplevelse** · ~70 timmar |

## Huvuduppdrag

P3:s roll har förändrats markant. Istället för att bygga en adminpanel från grunden (högrisk, 85h) fokuserar P3 nu på att göra Umbraco strålande för Anna. Det är högre värde och betydligt lägre risk.

## Ansvarsområden — Backoffice-anpassning

* Anpassa Umbraco-backoffice med Boosts varumärke (logotyp, färger)
* Konfigurera section permissions så Anna bara ser det hon behöver
* Strukturera content tree logiskt: Hem, Initiativ, Sidor, Nyheter, Metodmaterial, Tidslinje
* Dölj onödiga Umbraco-funktioner som kan förvirra (t.ex. avancerade utvecklarverktyg)
* Konfigurera språkpaket — säkerställ att Umbraco är på svenska
* Sätt upp användarroller: Admin (full access) + Editor (begränsad)

## Ansvarsområden — Custom Property Editors

* Bygga finansiärsväljare (dropdown med ESF, Arvsfonden, etc. + möjlighet att lägga till nya)
* Bygga årsväljare för Tidslinje-poster (snyggare än Umbracos default datumväljare)
* Bygga kategoriväljare för övningar (individuell / samarbete / samtal)
* Bygga logotyp-uppladdare med crop-funktion för finansiärs-logotyper
* Bygga "target group"-multiselect för övningar

## Ansvarsområden — Editorial UX

* Skapa content templates för "Lägg till nytt projekt" (förifyllda fält som Anna bara behöver komplettera)
* Konfigurera Umbraco-previews så Anna kan se ändringar innan publicering
* Sätta upp validering på obligatoriska fält
* Skapa hjälptexter på alla fält så Anna förstår vad varje fält gör

## Ansvarsområden — Utbildning & dokumentation

* Skriv svensk användarguide med skärmdumpar (en sektion per vanlig uppgift)
* Spela in 8-10 korta Loom-videor (varje 2-3 minuter):
  + "Så lägger du till ett nytt initiativ"
  + "Så uppdaterar du Vårt arbetssätt-sidan"
  + "Så publicerar du en ny nyhet"
  + "Så lägger du till en Tidslinje-post"
  + "Så hanterar du behörigheter till Metodmaterial"
  + "Så använder du rich text-editorn"
  + "Så lägger du till bilder"
  + "Så förhandsgranskar du innan du publicerar"
* Genomför 3-4 hands-on utbildningstillfällen med Anna och hennes kollega

**▶ ÄNDRAT (Annas mejl 27/5):**  *Anna är ENDA redaktören — kollegorna är "mindre tekniska". Rikta all utbildning och dokumentation mot Anna och håll backoffice så enkel som möjligt för en ensam icke-teknisk användare.*

* Skapa en FAQ-sida i dokumentationen för vanliga problem

## Beroenden

**Blockerar:** Anna (kan börja testa systemet så snart Umbraco är uppe)

**Beroende av:** P1 (Umbraco installerat + document types definierade)

## Viktiga leveranser per vecka

* Vecka 1: Lär sig Umbraco (officiell dokumentation), planera anpassningar
* Vecka 2: Backoffice-branding klar, content tree strukturerat
* Vecka 3-4: Custom property editors (finansiär, år, kategori) klara
* Vecka 5: Anna kan börja testa — första utbildningstillfället
* Vecka 6-7: Content templates, valideringar, hjälptexter
* Vecka 8: Skriva dokumentation + spela in Loom-videor
* Vecka 9: Andra utbildningstillfället med Anna
* Vecka 10: Tredje utbildningen + slutgiltiga finjusteringar

|  |
| --- |
| **🎯 P3:s nya uppdrag är högre värde**  Genom att använda Umbraco istället för att bygga från grunden får P3 tid att fokusera på det som faktiskt påverkar Annas vardag: skräddarsydda fält, vackra hjälptexter, polerade workflows, omfattande utbildning. Det här är \*kvalitativt bättre\* än en custom adminpanel någonsin skulle vara. |

|  |
| --- |
| **P4 — Låst yta, Deployment & Integration** · ~75 timmar |

## Huvuduppdrag

P4 äger två stora områden: (1) det låsta Metodmaterial-biblioteket i valmaendearenan-stil med Umbraco Members-auth, och (2) all infrastruktur, CI/CD och driftsättning. Måste leverera CI/CD tidigt så övriga kan deploya från dag 1.

## Ansvarsområden — Infrastruktur

* Sätt upp Git-repo, branch-strategi (main, develop, feature-branches), PR-mallar
* Skapa Dockerfile för Umbraco-appen
* Sätt upp GitHub Actions CI/CD-pipeline för alla tre appar (cms, public-site, locked-area)
* Provisionera Azure-resurser via Microsoft for Nonprofits-bidraget:
  + Azure App Service (B1, Linux) för Umbraco
  + Azure SQL Database (Basic) för data
  + Azure Blob Storage för Umbraco Media
  + Azure Static Web Apps eller Cloudflare Pages för React-apparna
  + Application Insights för övervakning

**▶ NY RISK (Annas mejl 27/5):**  *Microsoft-bidraget är OSÄKERT — Anna kommer inte åt det gamla kontot och har inte tid att jaga det. Förbered Plan B: hosta på Hetzner (CX33 ~140 €/år ex moms) i stället för Azure. Bygg portabelt (Docker + PostgreSQL) så vi inte är låsta till Azure. Beslut tas på mötet.*

* Konfigurera Azure-secrets och environment variables
* Sätt upp domän boostbyfcr.se + SSL/HTTPS
* Planera och utföra DNS-cutover från befintlig WordPress

## Ansvarsområden — Låst Metodmaterial (valmaendearenan-stil)

* Bygga separat React-app för låst yta

**▶ BEKRÄFTAT (Annas mejl 27/5):**  *Välmåendearenan bekräftad som modell. Anna samlar in exempel-sajter från Boosts unga deltagare — be om dessa, de är värdefull användarinput. Teknisk kontaktperson hos Boost: "Alan".*

* Inloggningssida (POST till P1:s /api/members/login)
* Protected route-system som verifierar JWT mot Umbraco Members
* Strukturerat övningsbibliotek (kategoriserat: individuell / samarbete / samtal)
* Filtrerbar översikt med metadata (tid, målgrupp, kategori)
* Metodartikelläsare (långform med rich text + bilder från Umbraco)
* Handboksläsare med kapitelnavigation
* Behörig-användare-bara nedladdningar för premium-PDF:er
* Kunskapssektion (educational mini-articles)
* Externa resurser + krisnummer-strip

## Ansvarsområden — Integration & QA

* End-to-end-testning av kritiska användarflöden (Playwright)
* Buggtriage och buggfixar
* Prestandaoptimering
* Skriva deployment runbook (hur man deployar nya versioner)
* Skriva handover-dokumentation för Boost

## Beroenden

**Blockerar:** Alla deployment och produktionsmiljö

**Beroende av:** P1 (Members-auth endpoints), Microsoft for Nonprofits-bidragsbeslut

## Viktiga leveranser per vecka

* Vecka 1: Git-repo, CI/CD-pipeline grundläggande, staging-miljö live
* Vecka 2: Azure-resurser provisionerade, Umbraco deployar från GitHub
* Vecka 3-4: Låst yta-app uppsatt, inloggning fungerar mot Umbraco Members
* Vecka 5-6: Övningsbiblioteket (valmaendearenan-stil) klart
* Vecka 7: Handbokläsare klar
* Vecka 8: End-to-end-tester, prestandafix
* Vecka 9: Domän-cutover, produktionsdeploy
* Vecka 10: Dokumentation, handover

|  |
| --- |
| **🎯 P4 är differentieraren**  Det låsta Metodmaterial-biblioteket i valmaendearenan-stil är det som kommer få Annas kollegor att sluta vara avundsjuka och börja vara stolta. Det är projektets "wow-faktor". Lägg tid på UX:en där. |

# 6. Beroenden mellan rollerna

De viktigaste beroenden teamet måste hantera:

|  |  |  |
| --- | --- | --- |
| **Vem** | **Väntar på** | **Vad / mitigering** |
| P2 | P1 | Document types + Delivery API. Mitigering: P2 jobbar med mock-data första veckorna. |
| P3 | P1 | Umbraco installerat + document types. Mitigering: P3 läser Umbraco-dokumentation vecka 1. |
| P4 (låst yta) | P1 | Members-auth endpoints. Mitigering: P1 levererar member-auth senast vecka 4. |
| Alla | P4 | CI/CD-pipeline. Mitigering: P4 prioriterar pipeline + staging-miljö i vecka 1. |
| Anna | P1 + P3 | Tillgång till Umbraco-backoffice för testning. Mitigering: P1 levererar grundläggande Umbraco vecka 2, P3 första anpassningar vecka 3. |

# 7. Vecka 1 — konkret plan

Målet för slutet av vecka 1: en deployad "Hello World"-version där varje utvecklare har mergat något till main och det syns i staging. Det bevisar att pipelinen fungerar.

### P1 — Vecka 1

* Skapa Umbraco 13-projekt under apps/cms
* Installera NuGet-paket (Umbraco.Cms, AzureBlob storage provider, Serilog)
* Konfigurera SQLite för dev
* Aktivera Delivery API i appsettings.json
* Skapa första document type: Project (med alla fält)
* Skapa testinnehåll så Delivery API returnerar något
* Dela API-endpoint med P2

### P2 — Vecka 1

* Skapa Vite + React + TypeScript-projekt under apps/public-site
* Konfigurera Tailwind med Boost-färger
* Bygga Header + Footer + Navigation
* Skapa typad API-klient för Umbraco Delivery API
* Bygga Hem-sida (med mock-data eller P1:s första endpoint)

### P3 — Vecka 1

* Läs Umbraco 13 officiell dokumentation (Backoffice + Document Types)
* Sätt upp lokal Umbraco-miljö för experimenter
* Planera anpassningar — vilka fält behöver Anna, vilka kan döljas?
* Skissa svenska hjälptexter för varje fält
* Möte med Anna för att förstå hennes nuvarande redaktörsflöde

### P4 — Vecka 1

* Skapa GitHub-repo + bjuda in alla teammedlemmar
* Sätt upp branch protection-regler på main
* Skapa grundläggande GitHub Actions workflow för varje app
* Provisionera Azure-resurser (App Service + SQL DB + Blob)
* Konfigurera staging-miljö så alla appar kan deploya dit
* Boka 15-minuters dagliga standups med teamet

# 8. Risker att hantera

Med Umbraco i mixen har de största riskerna minskat dramatiskt. Här är vad som återstår:

**NY RISK (Annas mejl 27/5):**  Microsoft for Nonprofits-bidraget är inte säkrat — Anna kommer inte åt det gamla kontot. **Mitigering:** Plan B = Hetzner-hosting (~140 €/år ex moms, ~172 €/år ink. moms för CX33). Bygg portabelt med Docker + PostgreSQL så vi kan deploya till antingen Azure (om bidraget löser sig) eller Hetzner utan omskrivning. Frontends + media ligger ändå gratis på Cloudflare Pages + R2.

|  |  |  |
| --- | --- | --- |
| **Risk** | **Vad som händer** | **Mitigering** |
| Teamet kan inte Umbraco | Inledande inlärningskurva sänker farten i vecka 1-2. | P1 + P3 läser Umbraco-dokumentation vecka 1. Umbraco har excellent docs. |
| Microsoft-bidrag försenas | Vi kan inte deploya till Azure utan finansiering. | Kör allt lokalt + staging på gratisnivå tills bidraget är klart. P4 förbereder Azure-konfiguration parallellt. |
| Delivery API-begränsningar | Umbraco Delivery API kanske inte stödjer alla queries vi behöver. | Verifiera tidigt vecka 2 att alla våra use cases fungerar. Skapa custom controllers för specialfall. |
| Members-auth komplikation | Umbraco Members + JWT till separat React-app kan vara knepigt. | P1 + P4 testar auth-flödet tidigt (senast vecka 3). Använd Umbraco-community för hjälp. |
| Underhåll efter handover | När praktiken är slut — vem underhåller systemet? | Umbraco är mainstream i Sverige. Lätt att hitta hjälp. Skriv omfattande dokumentation. |

|  |
| --- |
| **✓ Risker som har försvunnit jämfört med ren custom-version**  • Scope creep i adminpanelen (Umbraco har redan funktionerna) • Custom auth säkerhetshål (Umbracos auth är beprövad) • P3 fastnar och blockerar Anna (Anna kan börja testa Umbraco vecka 2) • Egen kod = svår handover (Umbraco-kunskap är vanlig) |

# 9. Nästa steg

1. Bekräfta med Anna att Microsoft for Nonprofits-registrering är på gång (krävs för Azure-bidraget)

**▶ ÄNDRAT (Annas mejl 27/5):**  *Microsoft-kontot är blockerat (Anna saknar åtkomst). Nytt nästa steg: teamet beslutar hosting på mötet — antingen försöka återställa Microsoft-kontot, ELLER gå direkt på Plan B (Hetzner ~140 €/år). Be Boost bekräfta om de kan stå för den kostnaden.*

1. Skicka samlat mejl till Anna med alla 24 frågor (se föregående briefing)
2. Boka handledarsamtal för att bekräfta arkitekturvalet
3. Sätt upp monorepo + bjuda in teamet på GitHub
4. Tilldela rollerna P1, P2, P3, P4 baserat på styrkor
5. Boka dagliga 15-min standups (vardagar kl 09:00 t.ex.)
6. Börja koda enligt vecka 1-planen ovan

## Förslag på rollfördelning

* P1 (Umbraco + Backend): den med starkast C#/.NET-erfarenhet — vill lära sig Umbraco
* P2 (Publik frontend): den med starkast React/CSS-erfarenhet — vill bygga vackra UI:n
* P3 (Umbraco-anpassning + utbildning): den som är bäst på att kommunicera med icke-tekniska användare — tålamod är viktigare än teknisk briljans här
* P4 (Låst yta + DevOps): den med mest infrastruktur-intresse — gillar att deploya saker

*— Slut på arbetsuppdelning v2.0 —*