import { Link } from "react-router";
import { Container } from "../components/layout/Container";
import { ProjectGallery } from "./ProjectGallery";
import { projectStatusLabels } from "../data/projectStatus";
import type { Project } from "../types/project";

export function ProjectDetail({
  project,
  nextProject,
}: {
  project: Project;
  nextProject?: Project;
}) {
  const narrative = project.narrative;
  const study = project.caseStudy;
  return (
    <article className="project-detail">
      <Container>
        <div className="project-detail__topline">
          <Link to="/#work" className="text-link">
            ← Tüm projeler
          </Link>
          <span className="section-index">
            {project.year} /{" "}
            {project.status ? projectStatusLabels[project.status] : "Proje"}
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
                  Canlı projeyi aç ↗
                </a>
              )}
              {project.links?.github && (
                <a
                  className="text-link"
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kaynak kodu gör ↗
                </a>
              )}
              {!project.links?.live && (
                <span className="project-detail__availability">
                  Canlı demo henüz paylaşılmadı.
                </span>
              )}
            </div>
            <dl className="project-detail__facts">
              {project.role && (
                <div>
                  <dt>Rol</dt>
                  <dd>{project.role}</dd>
                </div>
              )}
              <div>
                <dt>Teknolojiler</dt>
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
                  ["solution", "Çözüm", study.solution],
                  ["decision", "Teknik karar", study.decision],
                  ["limits", "Mevcut sınırlar", study.limits],
                  ["evidence", "Ekranlar ve doğrulama kapsamı", study.evidence],
                ].map(([id, title, text]) => (
                  <section key={id} aria-labelledby={`project-${id}`}>
                    <h2 id={`project-${id}`}>{title}</h2>
                    <p>{text}</p>
                  </section>
                ))}
              {narrative && (
                <>
                  <details className="project-detail__full-story">
                    <summary>Projenin hikâyesi ve uygulama ayrıntıları</summary>
                    {narrative.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </details>
                  {narrative.dataAndPrivacy && (
                    <aside aria-labelledby="project-privacy-heading">
                      <h2 id="project-privacy-heading">Veri ve gizlilik</h2>
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
              Sonraki proje: {nextProject.title} →
            </Link>
          )}
          <Link to="/#work">Tüm projelere dön →</Link>
        </div>
      </Container>
    </article>
  );
}
