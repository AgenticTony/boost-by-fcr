import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FileText,
  Briefcase,
  Heart,
  MessageSquare,
  BookOpen,
  Download,
} from "lucide-react";
import { fetchResources } from "@/api/client";
import { resourceCategoryLabels, formatFileSize } from "@/lib/resource-utils";
import type { Resource } from "@/api/mock-data";

const categoryIconMap: Record<string, React.ElementType> = {
  normer: MessageSquare,
  halsa: Heart,
  arbetsmarknad: Briefcase,
  handbocker: BookOpen,
};

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = categoryIconMap[resource.category] || FileText;
  return (
    <div className="bg-white rounded-2xl border border-border/60 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-gold text-brand-navy shrink-0">
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
          {resource.fileUrl && (
            <a
              href={resource.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:text-brand-navy/80 bg-brand-gold hover:bg-brand-gold/90 px-4 py-2 rounded-cta font-display transition-colors"
            >
              <Download className="h-4 w-4" /> Ladda ner
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResurserPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("kategori") || "alla";
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchResources()
      .then((data) => {
        const filtered =
          category === "alla"
            ? data
            : data.filter((r) => r.category === category);
        setResources(filtered);
      })
      .catch(() => setError("Kunde inte ladda resurser."))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <>
      <section className="bg-brand-navy text-white">
        <div className="container-page py-20 md:py-28">
          <p className="text-sm font-body font-medium text-brand-gold tracking-widest uppercase mb-4">
            Metodmaterial
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-tight max-w-2xl">
            Verktyg för ett mer inkluderande arbetsliv
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-xl leading-relaxed">
            Här delar vi med oss av de metoder och material vi arbetar med.
          </p>
        </div>
      </section>

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
                aria-current={category === key ? "page" : undefined}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-surface" aria-busy={loading}>
        <div className="container-page">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-text">
              Öppet material
            </h2>
            <p className="mt-2 text-text-muted">
              Fritt tillgängliga material att ladda ner och använda.
            </p>
          </div>
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
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-text-muted">{error}</p>
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
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
