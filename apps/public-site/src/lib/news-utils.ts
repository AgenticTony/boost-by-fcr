export const categoryLabels: Record<string, string> = {
  alla: "Alla",
  projekt: "Projekt",
  resultat: "Resultat",
  team: "Team",
  samarbeten: "Samarbeten",
};

export const categoryColors: Record<string, string> = {
  projekt: "bg-brand-teal text-white",
  resultat: "bg-brand-gold text-brand-navy",
  team: "bg-brand-navy text-white",
  samarbeten: "bg-success text-white",
};

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
