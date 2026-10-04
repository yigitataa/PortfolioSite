export const projectStatusLabels = {
  shipped: "Yayınlandı",
  active: "Geliştiriliyor",
  archive: "Arşiv",
  prototype: "Yerel prototip",
  demo: "Demo uygulama",
  educational: "Yerel eğitim projesi",
} as const;

export const englishProjectStatusLabels: Record<
  keyof typeof projectStatusLabels,
  string
> = {
  shipped: "Published",
  active: "In development",
  archive: "Archive",
  prototype: "Local prototype",
  demo: "Demo application",
  educational: "Local learning project",
};
