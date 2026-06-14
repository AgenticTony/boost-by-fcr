import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Shield,
  MessageCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { submitRegistration } from "@/api/client";
import { useSeo } from "@/hooks/use-seo";

const schema = z.object({
  firstName: z.string().min(1, "Förnamn är obligatoriskt"),
  lastName: z.string().min(1, "Efternamn är obligatoriskt"),
  email: z.string().email("Ange en giltig e-postadress"),
  phone: z
    .string()
    .min(7, "Ange ett giltigt telefonnummer")
    .regex(/^[0-9+\-\s()]+$/, "Ange ett giltigt telefonnummer")
    .refine(
      (v) => v.replace(/\D/g, "").length >= 7,
      "Ange ett giltigt telefonnummer",
    ),
  track: z.string().min(1, "Välj ett spår"),
  about: z.string().optional(),
  /** Honeypot — must be empty. */
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

const tracks = [
  "Arbetsspåret",
  "Studiespåret",
  "Hälsospåret",
  "Bridge by FCR",
  "Vet ej — hjälp mig välja",
];
const steps = [
  "Vi läser din anmälan",
  "En vägledare kontaktar dig",
  "Vi bokar ett första möte",
];

export default function AnmalDigPage() {
  useSeo({
    title: "Anmäl dig",
    description:
      "Ta första steget — det tar tre minuter. Vi hör av oss inom en arbetsdag.",
    canonical: "/anmal-dig",
  });
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    // Honeypot check — bots fill this field
    if (data.website) {
      setSubmitted(true);
      return;
    }
    setServerError("");
    try {
      const result = await submitRegistration(data);
      if (result.success) setSubmitted(true);
      else setServerError("Något gick fel. Försök igen.");
    } catch {
      setServerError("Något gick fel. Försök igen.");
    }
  }

  return (
    <>
      <section className="bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-navy/10 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs font-body font-medium text-brand-navy tracking-widest uppercase mb-4">
            Kom igång
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Ta första steget.
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed">
            Det tar ungefär tre minuter. Du behöver inte ha allt klart — bara
            vara redo att börja.
          </p>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="container-page">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { icon: Clock, label: "Tar 3 minuter" },
              { icon: Shield, label: "Dina uppgifter är trygga" },
              { icon: MessageCircle, label: "Vi hör av oss inom en arbetsdag" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2"
              >
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-navy text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-text">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-surface">
        <div className="container-page max-w-2xl">
          <h2 className="text-3xl font-display font-extrabold text-text mb-8">
            Fyll i dina uppgifter
          </h2>
          {submitted ? (
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-border/60 text-center">
              <CheckCircle className="h-16 w-16 text-brand-navy mx-auto mb-4" />
              <h3 className="text-2xl font-display font-extrabold text-text mb-2">
                Tack — vi hör av oss snart
              </h3>
              <p className="text-text-muted leading-relaxed">
                Din anmälan är mottagen. En vägledare kontaktar dig inom en
                arbetsdag.
              </p>
            </div>
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
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      Förnamn <span className="text-brand-red">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Ditt förnamn"
                      required
                      autoComplete="given-name"
                      aria-describedby={
                        errors.firstName ? "firstName-error" : undefined
                      }
                      aria-invalid={!!errors.firstName}
                      className={`rounded-input h-11 ${errors.firstName ? "border-error" : ""}`}
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p
                        id="firstName-error"
                        className="text-sm text-error"
                        role="alert"
                      >
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Efternamn <span className="text-brand-red">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Ditt efternamn"
                      required
                      autoComplete="family-name"
                      aria-describedby={
                        errors.lastName ? "lastName-error" : undefined
                      }
                      aria-invalid={!!errors.lastName}
                      className={`rounded-input h-11 ${errors.lastName ? "border-error" : ""}`}
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p
                        id="lastName-error"
                        className="text-sm text-error"
                        role="alert"
                      >
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      E-post <span className="text-brand-red">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="din@email.se"
                      required
                      autoComplete="email"
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      aria-invalid={!!errors.email}
                      className={`rounded-input h-11 ${errors.email ? "border-error" : ""}`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-sm text-error"
                        role="alert"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Telefon <span className="text-brand-red">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="07x-xxx xx xx"
                      required
                      autoComplete="tel"
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                      aria-invalid={!!errors.phone}
                      className={`rounded-input h-11 ${errors.phone ? "border-error" : ""}`}
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p
                        id="phone-error"
                        className="text-sm text-error"
                        role="alert"
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="track">
                    Vilket spår? <span className="text-brand-red">*</span>
                  </Label>
                  <select
                    id="track"
                    aria-describedby={errors.track ? "track-error" : undefined}
                    aria-invalid={!!errors.track}
                    className={`flex h-11 w-full rounded-input border bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${errors.track ? "border-error" : "border-input"}`}
                    defaultValue=""
                    {...register("track")}
                  >
                    <option value="" disabled>
                      Välj ett spår
                    </option>
                    {tracks.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.track && (
                    <p
                      id="track-error"
                      className="text-sm text-error"
                      role="alert"
                    >
                      {errors.track.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about">Berätta kort om dig</Label>
                  <Textarea
                    id="about"
                    placeholder="Valfritt — berätta något om din situation eller vad du hoppas på"
                    rows={4}
                    className="rounded-input"
                    {...register("about")}
                  />
                </div>
                {serverError && (
                  <p className="text-sm text-error text-center" role="alert">
                    {serverError}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-red text-brand-navy hover:bg-brand-red/90 font-display font-semibold rounded-cta h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Skickar..." : "Skicka anmälan"}
                  {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="container-page py-12 md:py-16">
          <h2 className="text-3xl font-display font-extrabold text-center mb-12">
            Vad händer sen?
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="hidden md:block absolute top-6 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-brand-red" />
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((step, i) => (
                <div key={step} className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-red text-brand-navy font-display font-extrabold text-lg mb-4 relative z-10">
                    {i + 1}
                  </div>
                  <p className="text-white/90 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
