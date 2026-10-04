import { useLanguage } from "../app/useLanguage";
import { Section } from "../components/layout/Section";
import { ProjectGrid } from "../projects/ProjectGrid";
import { ProjectEmptyState } from "../projects/ProjectEmptyState";
import { projectsForLanguage } from "../data/projects";
import { site } from "../data/site";

export function Work() {
  const { t, language } = useLanguage();
  const projects = projectsForLanguage(language);
  const featured = projects.filter((project) => project.featured);
  if (
    projects.length === 0 &&
    !(import.meta.env.DEV && site.showEmptyProjectsInDevelopment)
  )
    return null;
  return (
    <Section id="work" className="work-section">
      <div className="section-heading">
        <h2>{t("Projelerim.", "My projects.")}</h2>
        <p>
          {t(
            "Belirli bir ihtiyaca odaklanan sistemler, arayüzler ve deneyler.",
            "Systems, interfaces, and experiments built around specific needs.",
          )}
        </p>
      </div>
      {featured.length ? (
        <ProjectGrid items={featured} />
      ) : projects.length ? (
        <ProjectGrid items={projects} />
      ) : (
        <ProjectEmptyState />
      )}
    </Section>
  );
}
