import { useSearchParams } from "react-router-dom";
import {
  FileText,
  Briefcase,
  Heart,
  MessageSquare,
  BookOpen,
  Download,
} from "lucide-react";
import { resourceCategoryLabels, formatFileSize } from "@/lib/resource-utils";
import { useResources } from "@/hooks/use-resources";
import { useSeo } from "@/hooks/use-seo";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { WaveDivider } from "@/components/ui/wave-divider";
import type { Resource } from "@/types";

const categoryIconMap: Record<string, React.ElementType> = {
  normer: MessageSquare,
  halsa: Heart,
  arbetsmarknad: Briefcase,
  handbocker: BookOpen,
};

function ResourceCard({
  resource,
  index,
}: {
  resource: Resource;
  index: number;
}) {
  const Icon = categoryIconMap[resource.category] || FileText;
  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="bg-white rounded-2xl border border-border/60 overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-red text-brand-navy shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-lg text-text leading-snug">
                {resource.title}
              </h3>
              <p className="text-sm text-text-muted mt-1 line-clamp-3 leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
            <div className="flex items-center gap-2">
              {resource.fileType && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-text-muted">
                  {resource.fileType}
                </span>
              )}
              {resource.fileSize && (
                <span className="text-xs text-text-muted">
                  {formatFileSize(resource.fileSize)}
                </span>
              )}
            </div>
            {resource.fileUrl && /^https?:\/\//i.test(resource.fileUrl) && (
              <a
                href={resource.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-navy/80 bg-brand-red hover:bg-brand-red/90 px-4 py-2 rounded-full font-display transition-colors"
              >
                <Download className="h-4 w-4" /> Ladda ner
              </a>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ResurserPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("kategori") || "alla";
  const {
    data: resources = [],
    isLoading: loading,
    error,
  } = useResources(category);
  const errorMsg = error ? "Kunde inte ladda resurser." : null;

  useSeo({
    title: "Resurser",
    description:
      "Verktyg och metodmaterial för ett mer inkluderande arbetsliv — fritt tillgängliga att ladda ner.",
    canonical: "/resurser",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-brand-navy/10 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <ScrollReveal>
            <p className="text-xs font-body font-medium text-brand-red-bright tracking-widest uppercase mb-4">
              Metodmaterial
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight max-w-2xl">
              Verktyg för ett mer inkluderande arbetsliv
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl leading-relaxed">
              Här delar vi med oss av de metoder och material vi arbetar med.
            </p>
          </ScrollReveal>
        </div>
        <WaveDivider color="navy" layered />
      </section>

      {/* Category filter */}
      <section className="border-b border-border bg-white sticky top-16 md:top-20 z-30">
        <div className="container-page py-3 flex flex-wrap gap-2">
          {Object.entries(resourceCategoryLabels).map(([key, label]) => {
            const Icon = categoryIconMap[key];
            return (
              <button
                key={key}
                onClick={() =>
                  setSearchParams(key === "alla" ? {} : { kategori: key })
                }
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === key
                    ? "bg-brand-navy text-white"
                    : "bg-muted text-text-muted hover:bg-muted/80"
                }`}
                aria-pressed={category === key}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Resource grid */}
      <section className="py-16 md:py-24 bg-surface" aria-busy={loading}>
        <div className="container-page">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl md:text-[2.75rem] font-display font-extrabold text-text">
                Öppet material
              </h2>
              <p className="mt-2 text-text-muted">
                Fritt tillgängliga material att ladda ner och använda.
              </p>
            </div>
          </ScrollReveal>
          {loading ? (
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              aria-hidden="true"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse bg-muted/40 rounded-2xl"
                />
              ))}
            </div>
          ) : errorMsg ? (
            <div className="text-center py-20">
              <p className="text-text-muted">{errorMsg}</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="h-12 w-12 text-text-muted/40 mx-auto mb-4" />
              <p className="text-text-muted">
                Inga resurser att visa just nu. Kom tillbaka snart!
              </p>
            </div>
          ) : (
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              aria-live="polite"
            >
              {resources.map((resource, i) => (
                <ResourceCard key={resource.id} resource={resource} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
