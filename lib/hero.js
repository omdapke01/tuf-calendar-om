export const heroImages = [
  {
    title: "Morning focus",
    caption: "Plan the work that deserves your clearest hours.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
    accent: "#22c55e",
    accentSoft: "rgba(34, 197, 94, 0.22)"
  },
  {
    title: "Quiet momentum",
    caption: "Give the week a shape before the week gives you one.",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=85",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.22)"
  },
  {
    title: "Deep work",
    caption: "Block the time, protect the energy, keep the promise.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85",
    accent: "#06b6d4",
    accentSoft: "rgba(6, 182, 212, 0.22)"
  },
  {
    title: "Open horizon",
    caption: "A calm map for dates, notes, and small bright plans.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85",
    accent: "#fb7185",
    accentSoft: "rgba(251, 113, 133, 0.22)"
  }
];

export function getHeroForMonth(monthDate) {
  return heroImages[monthDate.getMonth() % heroImages.length];
}
