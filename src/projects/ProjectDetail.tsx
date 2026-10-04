import { useLanguage } from "../app/useLanguage";
import { Link } from "react-router";
import { Container } from "../components/layout/Container";
import { ProjectGallery } from "./ProjectGallery";
import { englishProjectStatusLabels } from "../data/projectStatus";
import { projectStatusLabels } from "../data/projectStatus";
import type { Project } from "../types/project";

export function ProjectDetail({
  project,
  nextProject,
}: {
  project: Project;
  nextProject?: Project;
}) {
  const { t } = useLanguage();
  const narrative = project.narrative;
  const study = project.caseStudy;
  return (
    <article className="project-detail">
      <Container>
        <div className="project-detail__topline">
          <Link to="/#work" className="text-link">
            {t("← Tüm projeler", "← All projects")}
          </Link>
          <span className="section-index">
            {project.year} /{" "}
            {project.status
              ? t(
                  projectStatusLabels[project.status],
                  englishProjectStatusLabels[project.status],
                )
              : t("Proje", "Project")}
          </span>
        </div>
        <div className="project-detail__overview">
          <header className="project-detail__header">
            <h1>{project.title}</h1>
            <p className="project-detail__lead">
              {project.detailDescription ?? project.description}
            </p>
            <div className="project-detail__links">
              {project.links?.live && (
                <a
                  className="glass-button glass-button--primary"
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Canlı projeyi aç ↗", "Open live project ↗")}
                </a>
              )}
              {project.links?.github && (
                <a
                  className="text-link"
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Kaynak kodu gör ↗", "View source code ↗")}
                </a>
              )}
              {!project.links?.live && (
                <span className="project-detail__availability">
                  {t(
                    "Canlı demo henüz paylaşılmadı.",
                    "A live demo has not been shared yet.",
                  )}
                </span>
              )}
            </div>
            <dl className="project-detail__facts">
              {project.role && (
                <div>
                  <dt>{t("Rol", "Role")}</dt>
                  <dd>{project.role}</dd>
                </div>
              )}
              <div>
                <dt>{t("Teknolojiler", "Technologies")}</dt>
                <dd>{project.stack.join(" · ")}</dd>
              </div>
            </dl>
          </header>
          <ProjectGallery key={project.slug} project={project} />
          <div className="project-detail__body">
            <div className="project-detail__narrative">
              {study &&
                [
                  ["problem", "Problem", study.problem],
                  ["solution", t("Çözüm", "Solution"), study.solution],
                  [
                    "decision",
                    t("Teknik karar", "Technical decision"),
                    study.decision,
                  ],
                  [
                    "limits",
                    t("Mevcut sınırlar", "Current limitations"),
                    study.limits,
                  ],
                  [
                    "evidence",
                    t(
                      "Ekranlar ve doğrulama kapsamı",
                      "Screenshots and verification scope",
                    ),
                    study.evidence,
                  ],
                ].map(([id, title, text]) => (
                  <section key={id} aria-labelledby={`project-${id}`}>
                    <h2 id={`project-${id}`}>{title}</h2>
                    <p>{text}</p>
                  </section>
                ))}
              {narrative && (
                <>
                  <details className="project-detail__full-story">
                    <summary>
                      {t(
                        "Projenin hikâyesi ve uygulama ayrıntıları",
                        "Project story and implementation details",
                      )}
                    </summary>
                    {narrative.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </details>
                  {narrative.dataAndPrivacy && (
                    <aside aria-labelledby="project-privacy-heading">
                      <h2 id="project-privacy-heading">
                        {t("Veri ve gizlilik", "Data and privacy")}
                      </h2>
                      {narrative.dataAndPrivacy.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </aside>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="project-detail__outro">
          {nextProject && (
            <Link to={`/work/${nextProject.slug}`}>
              {t("Sonraki proje:", "Next project:")} {nextProject.title} →
            </Link>
          )}
          <Link to="/#work">
            {t("Tüm projelere dön →", "Back to all projects →")}
          </Link>
        </div>
      </Container>
    </article>
  );
}
