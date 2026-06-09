import { useSeo } from "@/hooks/use-seo";

export default function DataskyddspolicyPage() {
  useSeo({
    title: "Dataskyddspolicy",
    description:
      "Hur vi hanterar och skyddar din personliga information i enlighet med GDPR.",
  });

  return (
    <>
      <section className="bg-brand-navy text-white">
        <div className="container-page py-20 md:py-28">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Dataskyddspolicy
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed">
            Vi värnar om din personliga integritet.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <div className="prose prose-sm max-w-none text-text-muted leading-relaxed">
            <h2>Parter och ansvar för behandlingen av dina personuppgifter</h2>

            <p>
              Boost by FC Rosengård (802516-4461) har som ändamål att bedriva
              allmännyttig social hjälpverksamhet, utbildningsverksamhet eller
              annan likvärdig allmännyttig verksamhet, ge stöd till olika
              utsatta målgrupper. Boost by FC Rosengård är
              personuppgiftsansvarig för behandlingen av personuppgifter som
              sker inom ramen för föreningens verksamhet.
            </p>
            <p>
              Denna dataskyddspolicy förklarar hur vi samlar in och använder
              dina personuppgifter. Den beskriver också dina rättigheter
              gentemot oss och hur du kan göra dina rättigheter gällande. Du kan
              alltid kontakta oss vid frågor kring integritets- och dataskydd
              genom att skicka ett e-postmeddelande till oss på{" "}
              <a
                href="mailto:dataskydd@boostbyfcr.se"
                className="text-brand-navy hover:underline"
              >
                dataskydd@boostbyfcr.se
              </a>
              .
            </p>

            <h2>1. Vilken information samlar vi in?</h2>

            <h3>Information du ger till oss</h3>
            <p>
              Du kan direkt eller indirekt komma att ge oss information om dig
              själv på ett antal sätt. Till exempel:
            </p>
            <ul>
              <li>När du anmäler dig till någon av våra verksamheter</li>
              <li>När du deltar i någon av våra verksamheter</li>
              <li>När du besöker vår hemsida eller våra sociala medier</li>
            </ul>
            <p>Detta kan vara:</p>
            <ul>
              <li>Namn, födelsedatum, personnummer</li>
              <li>Adress</li>
              <li>Telefonnummer</li>
              <li>Arbetslivserfarenhet och studieresultat</li>
              <li>Dina myndighetskontakter</li>
              <li>Intressen</li>
            </ul>

            <h3>Information vi samlar in</h3>
            <p>
              Utöver den information du aktivt ger till oss kan vi samla in
              följande information:
            </p>
            <ul>
              <li>
                Uppgifter om ditt deltagande (närvaro, resultat) när du deltar i
                någon av våra verksamheter
              </li>
              <li>
                Information om hur du använder våra digitala verktyg när du är
                inne på dessa
              </li>
              <li>
                Enhetsinformation — t.ex. IP-adress, språkinställningar,
                webbläsarinställningar, tidszon, operativsystem, plattform och
                skärmupplösning när du är inne på vår hemsida
              </li>
            </ul>
            <p>
              Informationen du ger oss, såväl som den vi samlar in är generellt
              sett nödvändig för kunna delta i verksamhet som arrangeras av oss,
              medan den övriga informationen vi samlar in generellt sett är
              nödvändig för andra syften, såsom beskrivet nedan.
            </p>

            <h2>2. Vad gör vi med din information?</h2>

            <p>
              All data används för att tillhandahålla, utföra och förbättra vår
              verksamhet. Vi behandlar personuppgifter för följande syften
              baserat på följande lagliga grunder:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border border-border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-2 font-semibold text-text">
                      Ändamål med behandling
                    </th>
                    <th className="px-4 py-2 font-semibold text-text">
                      Laglig grund
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-2">Deltagande i verksamhet</td>
                    <td className="px-4 py-2">Intresseavvägning</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Insamling av kontaktuppgifter</td>
                    <td className="px-4 py-2">
                      Samtycke (deltagare) / Intresseavvägning
                      (samverkansparter)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      För att följa lagstiftning, såsom bokföringslagar
                    </td>
                    <td className="px-4 py-2">Rättslig förpliktelse</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Ansökan om bidrag</td>
                    <td className="px-4 py-2">Rättslig förpliktelse</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      Sammanställning av statistik och uppföljning
                    </td>
                    <td className="px-4 py-2">
                      Rättslig förpliktelse / Allmänt intresse
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Besök på vår hemsida</td>
                    <td className="px-4 py-2">Intresseavvägning</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      Publicering av material på hemsida och sociala medier
                    </td>
                    <td className="px-4 py-2">Samtycke</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Utskick av nyhetsbrev</td>
                    <td className="px-4 py-2">Samtycke</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>3. Vilka kan vi komma att dela din information till?</h2>
            <p>
              Vi kan komma att överföra till, eller dela din information med,
              utvalda tredje parter, enligt följande. Vi vidtar rimliga legala,
              tekniska och organisatoriska åtgärder för att säkerställa att din
              data hanteras säkert och med en adekvat skyddsnivå vid överföring
              till eller delning med sådana utvalda tredje parter.
            </p>

            <h3>Leverantörer och underleverantörer</h3>
            <p>
              Vi kan komma att dela dina personuppgifter till leverantörer eller
              underleverantörer för utförandet av våra åtaganden gentemot dig
              och för andra syften som framgår i denna dataskyddspolicy.
            </p>

            <h3>Medlemsorganisationer och samverkansparter</h3>
            <p>
              Vi kan komma att dela din information med den samverkanspart som
              vi arrangerar den verksamhet du deltar i för att de ska kunna
              administrera ditt deltagande. För de personuppgifter som delas med
              samverkanspart gäller partens dataskyddspolicy och
              personuppgiftshantering.
            </p>

            <h3>Myndigheter</h3>
            <p>
              Vi kan komma att lämna nödvändig information till myndigheter
              såsom Arbetsförmedlingen, Malmö stad, Svenska ESF-rådet,
              Statistiska centralbyrån eller andra myndigheter om vi är skyldiga
              att göra det enligt lag, förordning eller ett allmänt intresse.
            </p>

            <h3>Vad vi inte kommer att göra med din data</h3>
            <p>
              Vi kommer inte att sälja dina personuppgifter till tredje part.
            </p>

            <h2>4. Var behandlar vi dina personuppgifter?</h2>
            <p>
              Vi strävar efter att behandla din data inom EU/EES. I de fall data
              kan komma att överföras till, och behandlas i, land utanför EU/EES
              vidtar vi rimliga legala, tekniska och organisatoriska åtgärder
              för att säkerställa att din data hanteras säkert och med en
              adekvat skyddsnivå jämförbar med och i samma nivå som det skydd
              som erbjuds inom EU/EES.
            </p>
            <p>
              Vi använder oss idag av tjänster som Google tillhandahåller. Detta
              kan medföra att data överförs till, och behandlas i, land utanför
              EU/EES. Google är dock certifierad enligt Privacy Shield, vilket
              innebär att de kan anses behandla data på en jämförbar skyddsnivå.
            </p>

            <h2>5. Hur länge sparar vi dina personuppgifter?</h2>
            <p>
              Vi sparar din data endast så länge som det är nödvändigt för att
              utföra våra åtaganden gentemot dig och så länge det krävs enligt
              lagstadgade lagringstider. När vi sparar din data för andra syften
              än för våra åtaganden gentemot dig sparar vi datan endast så länge
              som det är nödvändigt och/eller lagstadgat för respektive syfte.
            </p>

            <h2>6. Vilka är mina rättigheter?</h2>

            <h3>Rätt att få tillgång till din data</h3>
            <p>
              Du kan begära en kopia av de uppgifter du skulle vilja veta och
              verifiera den information vi har om dig. Kopian är gratis att
              begära.
            </p>

            <h3>Rätt till rättelse</h3>
            <p>
              Du har rätt att få dina personuppgifter korrigerade om de är
              felaktiga, ofullständiga eller missvisande och rätt att begränsa
              behandlingen av personuppgifterna tills de blir ändrade.
            </p>

            <h3>Rätt att bli raderad (&quot;rätten att bli bortglömd&quot;)</h3>
            <p>
              Du har rätt att begära radering av dina personuppgifter för de
              fall att datan inte längre är nödvändig för det syfte den blev
              insamlad för. Det kan dock finnas legala skyldigheter för Boost by
              FC Rosengård, som hindrar oss från att omedelbart radera delar av
              din data. Dessa skyldigheter kan komma från exempelvis bokförings-
              och skattelagstiftning och förordningar från myndigheter Boost by
              FC Rosengård har ingått avtal med. Vad vi då gör är att blockera
              den data som vi är skyldiga att spara, från att kunna användas
              till andra syften än att uppfylla sådana legala skyldigheter.
            </p>
            <p>
              Du har också rätt att dra in ett samtycke, motsätta dig
              automatiskt beslutsfattande, profilering och invända mot
              direktmarknadsföring.
            </p>
            <p>
              Du kan när som helst utöva dina rättigheter genom att begära
              tillgång till och rättelse eller radering av personuppgifter,
              begära begränsning av behandling eller invända mot behandling.
              Kontakta oss på{" "}
              <a
                href="mailto:dataskydd@boostbyfcr.se"
                className="text-brand-navy hover:underline"
              >
                dataskydd@boostbyfcr.se
              </a>{" "}
              för att utöva dina rättigheter.
            </p>
            <p>
              Vidare har du rätt att ge klagomål på vår behandling av
              personuppgifter till Datainspektionen genom att besöka{" "}
              <a
                href="https://www.datainspektionen.se"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-navy hover:underline"
              >
                www.datainspektionen.se
              </a>
              .
            </p>

            <h2>7. Hur är det med cookies och liknande tekniker?</h2>
            <p>
              Vi använder cookies och liknande spårningstekniker i våra
              webbtjänster. För mer information om hur Boost by FC Rosengård
              använder cookies och liknande, se vår information om cookies på{" "}
              <a
                href="https://www.boostbyfcr.se/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-navy hover:underline"
              >
                www.boostbyfcr.se/cookies
              </a>
              .
            </p>

            <h2>8. Ändringar i policyn</h2>
            <p>
              Boost by FC Rosengård förbehåller sig rätten att när som helst
              ändra denna integritetspolicy genom att publicera den nya,
              reviderade, policyn på webbplatsen.
            </p>

            <h2>9. Kontakta oss</h2>
            <p>
              Om du har frågor kan du kontakta oss genom e-post till{" "}
              <a
                href="mailto:dataskydd@boostbyfcr.se"
                className="text-brand-navy hover:underline"
              >
                dataskydd@boostbyfcr.se
              </a>{" "}
              eller brev till Boost by FC Rosengård, Lantmannagatan 32 B, 214 48
              Malmö.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
