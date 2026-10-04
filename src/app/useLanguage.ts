import { useContext } from "react";
import { LanguageContext } from "./language-context";
import { site } from "../data/site";

export function useLanguage() {
  const context = useContext(LanguageContext);
  return {
    ...context,
    t: (turkish: string, english: string) =>
      context.language === "en" ? english : turkish,
  };
}

export function useSite() {
  const { t } = useLanguage();
  return {
    ...site,
    title: t(site.title, "Computer Engineering Student"),
    hero: { subtitle: t(site.hero.subtitle, "I just keep building.") },
    description: t(
      site.description,
      "I build web applications with React and TypeScript interfaces, Express APIs, and databases.",
    ),
    positioning: t(
      site.positioning,
      "Software, interfaces, and the space between them.",
    ),
    intro: t(
      site.intro,
      "A thoughtful interface makes complex technology understandable and approachable.",
    ),
  };
}
