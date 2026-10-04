import { useLanguage } from "../app/useLanguage";
import { TransitionLink } from "../components/layout/TransitionLink";
import { ProjectMedia } from "./ProjectMedia";
import type { Project } from "../types/project";
import { englishProjectStatusLabels } from "../data/projectStatus";
import { projectStatusLabels } from "../data/projectStatus";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  return (
    <article
      className={`project-card project-card--${project.layout ?? "standard"}`}
    >
      <TransitionLink
        to={`/work/${project.slug}`}
        className="project-card__link"
        aria-label={t(
          `${project.title} projesini incele`,
          `Explore ${project.title}`,
        )}
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
            {t("Projeyi incele →", "Explore project →")}
          </span>
        </div>
        <div className="project-card__meta">
          <div>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
            {project.status && (
              <small className="project-card__status">
                {t(
                  projectStatusLabels[project.status],
                  englishProjectStatusLabels[project.status],
                )}
              </small>
            )}
          </div>
          <span>{project.year}</span>
        </div>
      </TransitionLink>
    </article>
  );
}
