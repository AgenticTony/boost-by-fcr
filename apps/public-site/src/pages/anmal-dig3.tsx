import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  ArrowRight,
  Info,
  AlertCircle,
} from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnmalDemoLayout } from "@/components/anmal-demo-layout";

/**
 * DEMO variant (/anmal-dig3) — "Lösning B": the on-brand form posts JSON to our
 * own /api/submit serverless function, which writes to a Supabase `submissions`
 * table (service-role key, server-side — never exposed to the browser). This
 * keeps the Boost styling AND gives reliable delivery, plus a real path to the
 * "booked slots disappear" feature (a `bookings` table + server-side filtering)
 * which Google Forms can never do.
 *
 * Three honest outcomes the page distinguishes:
 *   - delivered:true  -> green success (Supabase persisted the row)
 *   - demoMode:true   -> amber notice (Supabase env not set; validated only)
 *   - ok:false        -> inline error (validation/network/insert failure)
 *
 * Surrounding chrome (hero, trust bar, steps) is identical to /anmal-dig.
 */

/** Fallback meeting slots if /api/slots is unavailable (mirrors /anmal-dig). */
const FALLBACK_SLOTS = [
  "28 juli kl 15:00",
  "30 juli kl 15:00",
  "4 augusti kl 15:00",
  "6 augusti kl 15:00",
  "12 augusti kl 14:00",
  "12 augusti kl 15:00",
  "18 augusti kl 10:00",
  "19 augusti kl 10:00",
  "21 augusti kl 9:00",
  "21 augusti kl 10:00",
  "21 augusti kl 13:00",
  "28 augusti kl 9:00",
  "31 augusti kl 9:00",
  "31 augusti kl 10:30",
  "4 september kl 9:00",
];

const schema = z.object({
  name: z.string().min(1, "För- och efternamn är obligatoriskt"),
  personnummer: z.string().min(1, "Personnummer är obligatoriskt"),
  phone: z.string().optional(),
  email: z
    .string()
    .email("Ange en giltig e-postadress")
    .optional()
    .or(z.literal("")),
  handlerName: z.string().min(1, "Handläggarens namn är obligatoriskt"),
  handlerContact: z.string().optional(),
  meetingTime: z.string().min(1, "Välj en tid för inskrivningsmöte"),
  other: z.string().optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, "Du måste godkänna behandling av personuppgifter"),
  /** Honeypot — must be empty; checked server-side. */
  website: z.string().max(0).optional(),
});
type FormData = z.infer<typeof schema>;

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label} {required && <span className="text-brand-red">*</span>}
      </Label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (error?: string) =>
  `rounded-input h-11 ${error ? "border-error" : ""}`;
const selectCls = (error?: string) =>
  `flex h-11 w-full rounded-input border bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${
    error ? "border-error" : "border-input"
  }`;

export default function AnmalDig3Page() {
  useSeo({
    title: "Anmäl dig (demo — Supabase)",
    description:
      "Demovariant: egna formuläret skickar till en Supabase-backend. Samma utseende som sajten, pålitlig leverans.",
    canonical: "/anmal-dig3",
  });

  const [submitted, setSubmitted] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      personnummer: "",
      phone: "",
      email: "",
      handlerName: "",
      handlerContact: "",
      meetingTime: "",
      other: "",
      consent: false,
      website: "",
    },
  });

  const [meetingSlots, setMeetingSlots] = useState<string[]>(FALLBACK_SLOTS);
  useEffect(() => {
    if (typeof fetch !== "function") return;
    fetch("/api/slots")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.slots) && data.slots.length > 0) {
          setMeetingSlots(data.slots);
        }
      })
      .catch(() => {
        /* keep fallback */
      });
  }, []);

  async function onSubmit(data: FormData) {
    setServerError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (body.demoMode) {
        setDemoMode(true);
        setSubmitted(true);
      } else if (body.ok && body.delivered) {
        setDemoMode(false);
        setSubmitted(true);
      } else {
        setServerError(body.error || "Något gick fel vid sändningen. Försök igen.");
      }
    } catch {
      setServerError("Nätverksfel — kolla anslutningen och försök igen.");
    }
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AnmalDemoLayout
        solutionLabel="Lösning B · Supabase-backend"
        solutionNote="samma Boost-utseende, pålitlig leverans, möjliggör bokningsstyrning"
      >
        <section className="py-16 md:py-24 bg-white">
          <div className="container-page max-w-2xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-[2.75rem] font-display font-extrabold text-text mb-4">
                Fyll i dina uppgifter
              </h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                Mötet som du anmäler dig till är ett individuellt möte på Boost By
                FC Rosengård, Norra Grängesbergsgatan 15, med den vägledare som du
                kommer att samarbeta med. För att kunna delta i ESF-projektet
                Bridge by FCR behöver du vara mellan 18–29 år och kunna ta dig
                till Malmö. Bokar du en tid som du sen inte kan komma till behöver
                du meddela det till info@boostbyfcr.se eller ring 070-992 17 66.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              {submitted ? (
                demoMode ? (
                  <div className="bg-amber-50 rounded-2xl p-8 md:p-12 border border-amber-200 text-center">
                    <Info className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-extrabold text-text mb-2">
                      Demoläge: Supabase inte ansluten
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      Dina uppgifter validerades, men sparas inte förrän
                      projektet är kopplat. När Anthony sätter{" "}
                      <code className="text-sm bg-amber-100 px-1 rounded">
                        SUPABASE_URL
                      </code>{" "}
                      och{" "}
                      <code className="text-sm bg-amber-100 px-1 rounded">
                        SUPABASE_SERVICE_ROLE_KEY
                      </code>{" "}
                      hamnar varje anmälan i tabellen{" "}
                      <code className="text-sm bg-amber-100 px-1 rounded">
                        submissions
                      </code>
                      .
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-8 md:p-12 border border-border/60 text-center">
                    <CheckCircle className="h-16 w-16 text-brand-navy mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-extrabold text-text mb-2">
                      Tack — din anmälan är mottagen
                    </h3>
                    <p className="text-text-muted leading-relaxed">
                      En vägledare kontaktar dig inom en arbetsdag. Behöver du
                      ändra eller avanmäla en tid? Mejla info@boostbyfcr.se eller
                      ring 070-992 17 66.
                    </p>
                  </div>
                )
              ) : (
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-border/60 shadow-sm">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Honeypot — hidden from users, bots fill it out */}
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register("website")}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        label="För- och efternamn"
                        htmlFor="name"
                        required
                        error={errors.name?.message}
                      >
                        <Input
                          id="name"
                          placeholder="För- och efternamn"
                          autoComplete="name"
                          aria-invalid={!!errors.name}
                          className={inputCls(errors.name?.message)}
                          {...register("name")}
                        />
                      </Field>
                      <Field
                        label="Personnummer (ÅÅMMDD-XXXX)"
                        htmlFor="personnummer"
                        required
                        error={errors.personnummer?.message}
                      >
                        <Input
                          id="personnummer"
                          placeholder="ÅÅMMDD-XXXX"
                          autoComplete="off"
                          aria-invalid={!!errors.personnummer}
                          className={inputCls(errors.personnummer?.message)}
                          {...register("personnummer")}
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        label="Telefonnummer"
                        htmlFor="phone"
                        error={errors.phone?.message}
                      >
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="07x-xxx xx xx"
                          autoComplete="tel"
                          className={inputCls(errors.phone?.message)}
                          {...register("phone")}
                        />
                      </Field>
                      <Field
                        label="Mejladress"
                        htmlFor="email"
                        error={errors.email?.message}
                      >
                        <Input
                          id="email"
                          type="email"
                          placeholder="din@email.se"
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                          className={inputCls(errors.email?.message)}
                          {...register("email")}
                        />
                      </Field>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        label="Handläggare, namn"
                        htmlFor="handlerName"
                        required
                        error={errors.handlerName?.message}
                      >
                        <Input
                          id="handlerName"
                          placeholder="Handläggarens namn"
                          className={inputCls(errors.handlerName?.message)}
                          {...register("handlerName")}
                        />
                      </Field>
                      <Field
                        label="Handläggare, mejl och telefonnummer"
                        htmlFor="handlerContact"
                        error={errors.handlerContact?.message}
                      >
                        <Input
                          id="handlerContact"
                          placeholder="mejl och telefon"
                          className={inputCls(errors.handlerContact?.message)}
                          {...register("handlerContact")}
                        />
                      </Field>
                    </div>

                    <Field
                      label="Tid för inskrivningsmöte"
                      htmlFor="meetingTime"
                      required
                      error={errors.meetingTime?.message}
                    >
                      <select
                        id="meetingTime"
                        aria-invalid={!!errors.meetingTime}
                        className={selectCls(errors.meetingTime?.message)}
                        {...register("meetingTime")}
                      >
                        <option value="" disabled>
                          Välj en tid
                        </option>
                        {meetingSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      label="Övrig information"
                      htmlFor="other"
                      error={errors.other?.message}
                    >
                      <Textarea
                        id="other"
                        placeholder="Valfritt — något vi bör veta?"
                        rows={4}
                        className="rounded-input"
                        {...register("other")}
                      />
                    </Field>

                    <div className="flex items-start gap-3 rounded-input border border-border/60 bg-surface p-4">
                      <input
                        id="consent"
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#C93320]"
                        aria-invalid={!!errors.consent}
                        {...register("consent")}
                      />
                      <Label
                        htmlFor="consent"
                        className="text-sm font-normal leading-relaxed text-text"
                      >
                        Jag godkänner behandling av mina personuppgifter.{" "}
                        <span className="text-brand-red">*</span>
                      </Label>
                    </div>
                    {errors.consent && (
                      <p className="text-sm text-error" role="alert">
                        {errors.consent.message}
                      </p>
                    )}
                    <p className="text-xs text-text-muted leading-relaxed">
                      <span className="text-brand-red">*</span> Vi behöver spara
                      och behandla dessa personuppgifter om dig så att vi vet
                      vilka som kommer till oss, och så att vi kan kontakta dig
                      för att ge information om inskrivningsmötet. Läs mer i vår{" "}
                      <Link
                        to="/dataskyddspolicy"
                        className="font-semibold text-brand-navy underline hover:text-brand-red"
                      >
                        dataskyddspolicy
                      </Link>
                      .
                    </p>

                    {serverError && (
                      <p
                        className="flex items-center justify-center gap-2 text-sm text-error text-center"
                        role="alert"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {serverError}
                      </p>
                    )}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-red-bright text-white hover:bg-brand-red-bright/90 font-display font-semibold rounded-full h-12 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-red-bright/20 hover:shadow-brand-red-bright/30 transition-all duration-300"
                    >
                      {isSubmitting ? "Skickar..." : "Skicka anmälan"}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>
      </AnmalDemoLayout>
    </>
  );
}
