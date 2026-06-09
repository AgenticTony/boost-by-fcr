import { Link, useSearchParams } from "react-router-dom";
import { Newspaper, ArrowRight } from "lucide-react";
import { formatDate, categoryLabels, categoryColors } from "@/lib/news-utils";
import { ResilientImage } from "@/components/ui/resilient-image";
import { useNews } from "@/hooks/use-news";
import { useSeo } from "@/hooks/use-seo";

export default function NyheterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("kategori") || "alla";
  const { data: allArticles = [], isLoading: loading, error } = useNews();
  const errorMsg = error ? "Kunde inte ladda nyheter." : null;

  const articles =
    category === "alla"
      ? allArticles
      : allArticles.filter((a) => a.category === category);

  useSeo({
    title: "Nyheter",
    description: "Nyheter och uppdateringar från Boost by FC Rosengård.",
  });

  return (
    <>
      <section className="bg-brand-navy text-white">
        <div className="container-page py-20 md:py-28">
          <p className="text-sm font-body font-medium text-brand-red tracking-widest uppercase mb-4">
            Aktuellt
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight">
            Nyheter och uppdateringar
          </h1>
        </div>
      </section>

      <section className="border-b border-border bg-white sticky top-16 md:top-20 z-30">
        <div className="container-page py-3 flex flex-wrap gap-2">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() =>
                setSearchParams(key === "alla" ? {} : { kategori: key })
              }
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === key
                  ? "bg-brand-navy text-white"
                  : "bg-muted text-text-muted hover:bg-muted/80"
              }`}
              aria-current={category === key ? "page" : undefined}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16" aria-busy={loading}>
        <div className="container-page">
          {loading ? (
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              aria-hidden="true"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse bg-muted/40 rounded-2xl"
                />
              ))}
            </div>
          ) : errorMsg ? (
            <div className="text-center py-20">
              <p className="text-text-muted">{errorMsg}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="h-12 w-12 text-text-muted/40 mx-auto mb-4" />
              <p className="text-text-muted">
                Inga nyheter att visa just nu. Kom tillbaka snart!
              </p>
            </div>
          ) : (
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              aria-live="polite"
            >
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/nyheter/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-border/60 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ResilientImage
                      src={article.imageUrl}
                      alt={article.imageAlt || article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      fallbackClassName="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/40 text-text-muted/30"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[article.category] || "bg-muted text-text-muted"}`}
                      >
                        {categoryLabels[article.category] || article.category}
                      </span>
                      <span className="text-xs text-text-muted">
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <h2 className="font-display font-semibold text-lg text-text mb-2 line-clamp-2 leading-snug">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-sm text-text-muted leading-relaxed line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy group-hover:gap-2.5 transition-all">
                      Läs mer <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
