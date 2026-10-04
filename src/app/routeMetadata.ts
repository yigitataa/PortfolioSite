import projects from "../data/projectEntries.json";
import englishProjects from "../data/projectEntries.en.json";
import type { Language } from "./language-context";
import { site } from "../data/site";

export function routeMetadata(path: string, language: Language = "tr") {
  const english = language === "en";
  const imageAlt = english ? "Yiğit Ata portfolio" : "Yiğit Ata portföyü";
  const pathname = path.replace(/\/+$/, "") || "/";
  const project = (english ? englishProjects : projects).find(
    (item) => pathname === `/work/${item.slug}`,
  );
  if (project)
    return {
      title: `${project.title} | ${site.name}`,
      description: project.description,
      image: `/social/${project.slug}.png`,
      imageAlt: english
        ? `${project.title} project preview`
        : `${project.title} proje önizlemesi`,
      noindex: false,
    };
  if (pathname === "/about")
    return {
      title: `${english ? "About" : "Hakkımda"} | ${site.name}`,
      description: english
        ? "Yiğit Ata: computer engineering studies, a full-stack development internship, web applications, and learning by building."
        : "Yiğit Ata: bilgisayar mühendisliği eğitimi, full-stack geliştirme stajı, web uygulamaları ve üreterek öğrenme yaklaşımı.",
      image: "/social/portfolio.png",
      imageAlt,
      noindex: false,
    };
  if (pathname === "/")
    return {
      title: `${site.name} | ${english ? "Computer Engineering Student" : site.title}`,
      description: english
        ? "I build web applications with React and TypeScript interfaces, Express APIs, and databases."
        : site.description,
      image: "/social/portfolio.png",
      imageAlt,
      noindex: false,
    };
  return {
    title: `${english ? "Page not found" : "Sayfa bulunamadı"} | ${site.name}`,
    description: english
      ? "The page you are looking for could not be found."
      : "Aradığınız sayfa bulunamadı.",
    image: "/social/portfolio.png",
    imageAlt,
    noindex: true,
  };
}
