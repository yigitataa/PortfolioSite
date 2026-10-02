export const site = {
  name: "Yiğit ATA",
  title: "Bilgisayar Mühendisliği Öğrencisi",
  hero: { subtitle: "Sadece üretiyorum." },
  description:
    "React ve TypeScript arayüzleri, Express API'leri ve veritabanlarıyla çalışan web uygulamaları geliştiriyorum.",
  positioning: "Yazılım, arayüzler ve ikisinin arasındaki alan.",
  intro:
    "İyi düşünülmüş bir arayüz, karmaşık teknolojiyi anlaşılır ve insana yakın kılar.",
  email: "yatafb@gmail.com",
  github: "https://github.com/yigitataa",
  linkedin: "https://www.linkedin.com/in/yi%C4%9Fit-ata/",
  cv: "/documents/yigit-ata-cv.pdf",
  canonicalUrl: import.meta.env.VITE_SITE_URL || "",
  timeZone: "Europe/Istanbul",
  availability: false,
  showEmptyProjectsInDevelopment: true,
} as const;
