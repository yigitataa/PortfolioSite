import type { Project } from "../types/project";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({
  items,
  featuredOnly = false,
}: {
  items: Project[];
  featuredOnly?: boolean;
}) {
  const sorted = [...items]
    .filter((item) => !featuredOnly || item.featured)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || b.year - a.year);
  return (
    <div className="project-grid">
      {sorted.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
