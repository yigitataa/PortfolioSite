import { TransitionLink } from "../components/layout/TransitionLink";
import { ProjectMedia } from "./ProjectMedia";
import type { Project } from "../types/project";
import { projectStatusLabels } from "../data/projectStatus";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`project-card project-card--${project.layout ?? "standard"}`}
    >
      <TransitionLink
        to={`/work/${project.slug}`}
        className="project-card__link"
        aria-label={`${project.title} projesini incele`}
      >
        <div
          className="project-card__media"
          style={{ viewTransitionName: `project-${project.slug}` }}
        >
          <ProjectMedia project={project} />
          <span
            className="project-card__action glass glass--pill"
            aria-hidden="true"
          >
            Projeyi incele →
          </span>
        </div>
        <div className="project-card__meta">
          <div>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
            {project.status && (
              <small className="project-card__status">
                {projectStatusLabels[project.status]}
              </small>
            )}
          </div>
          <span>{project.year}</span>
        </div>
      </TransitionLink>
    </article>
  );
}
