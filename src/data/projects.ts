import type { Project } from "../types/project";
import entries from "./projectEntries.json";
import englishEntries from "./projectEntries.en.json";
import type { Language } from "../app/language-context";

export const projects: Project[] = entries.map((entry) => ({
  ...entry,
  cover: entry.cover as Project["cover"],
  layout: entry.layout as Project["layout"],
  status: entry.status as Project["status"],
  gallery: entry.gallery as Project["gallery"],
}));

export const englishProjects = englishEntries as Project[];

export function projectsForLanguage(language: Language) {
  return language === "en" ? englishProjects : projects;
}
