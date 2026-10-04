import type { Project } from "../types/project";
import { projects, englishProjects } from "./projects";
import type { Language } from "../app/language-context";
import entries from "./projectEntries.json";
import { projectNarratives } from "./projectNarratives";
import { projectCaseStudies } from "./projectCaseStudies";
import { englishProjectNarratives } from "./projectNarratives.en";
import { englishProjectCaseStudies } from "./projectCaseStudies.en";

export const projectDetails: Project[] = projects.map((project) => ({
  ...project,
  narrative:
    projectNarratives[
      entries.find((entry) => entry.slug === project.slug)!
        .narrativeKey as keyof typeof projectNarratives
    ],
  caseStudy: projectCaseStudies[project.slug],
}));

const englishProjectDetails: Project[] = englishProjects.map((project) => ({
  ...project,
  narrative:
    englishProjectNarratives[
      entries.find((entry) => entry.slug === project.slug)!
        .narrativeKey as keyof typeof englishProjectNarratives
    ],
  caseStudy:
    englishProjectCaseStudies[
      project.slug as keyof typeof englishProjectCaseStudies
    ],
}));

export function projectDetailsForLanguage(language: Language) {
  return language === "en" ? englishProjectDetails : projectDetails;
}
