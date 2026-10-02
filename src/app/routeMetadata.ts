import projects from "../data/projectEntries.json";
import { site } from "../data/site";

export function routeMetadata(path: string) {
  const pathname = path.replace(/\/+$/, "") || "/";
  const project = projects.find((item) => pathname === `/work/${item.slug}`);
  if (project)
    return {
      title: `${project.title} | ${site.name}`,
      description: project.description,
      image: `/social/${project.slug}.png`,
      imageAlt: `${project.title} proje önizlemesi`,
      noindex: false,
    };
  if (pathname === "/about")
    return {
      title: `Hakkımda | ${site.name}`,
      description:
        "Yiğit Ata: bilgisayar mühendisliği eğitimi, full-stack geliştirme stajı, web uygulamaları ve üreterek öğrenme yaklaşımı.",
      image: "/social/portfolio.png",
      imageAlt: "Yiğit Ata portföyü",
      noindex: false,
    };
  if (pathname === "/")
    return {
      title: `${site.name} | ${site.title}`,
      description: site.description,
      image: "/social/portfolio.png",
      imageAlt: "Yiğit Ata portföyü",
      noindex: false,
    };
  return {
    title: `Sayfa bulunamadı | ${site.name}`,
    description: "Aradığınız sayfa bulunamadı.",
    image: "/social/portfolio.png",
    imageAlt: "Yiğit Ata portföyü",
    noindex: true,
  };
}
