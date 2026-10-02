import { Section } from "../components/layout/Section";
import { ProjectGrid } from "../projects/ProjectGrid";
import { ProjectEmptyState } from "../projects/ProjectEmptyState";
import { projects } from "../data/projects";
import { site } from "../data/site";

export function Work() {
  const featured = projects.filter((project) => project.featured);
  if (
    projects.length === 0 &&
    !(import.meta.env.DEV && site.showEmptyProjectsInDevelopment)
  )
    return null;
  return (
    <Section id="work" className="work-section">
      <div className="section-heading">
        <h2>Projelerim.</h2>
        <p>Belirli bir ihtiyaca odaklanan sistemler, arayüzler ve deneyler.</p>
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
