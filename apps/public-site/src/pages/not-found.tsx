import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

export default function NotFoundPage() {
  useSeo({ title: "Sidan hittades inte", description: "" });

  return (
    <section className="py-32 md:py-40">
      <div className="container-page text-center max-w-lg">
        <p className="text-6xl font-display font-extrabold text-brand-red mb-4">
          404
        </p>
        <h1 className="text-3xl font-display font-extrabold text-text mb-4">
          Sidan hittades inte
        </h1>
        <p className="text-text-muted leading-relaxed mb-8">
          Det verkar som att den här sidan inte finns — eller har flyttat. Låt
          oss hjälpa dig hitta rätt.
        </p>
        <Button
          asChild
          className="bg-brand-red text-brand-navy hover:bg-brand-red/90 font-display font-semibold rounded-cta"
        >
          <Link to="/">
            Tillbaka till startsidan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
