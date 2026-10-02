import type { Project } from "../types/project";
import { projects } from "./projects";
import entries from "./projectEntries.json";
import { projectNarratives } from "./projectNarratives";
import { projectCaseStudies } from "./projectCaseStudies";

export const projectDetails: Project[] = projects.map((project) => ({
  ...project,
  narrative:
    projectNarratives[
      entries.find((entry) => entry.slug === project.slug)!
        .narrativeKey as keyof typeof projectNarratives
    ],
  caseStudy: projectCaseStudies[project.slug],
}));
