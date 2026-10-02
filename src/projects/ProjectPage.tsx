import { useParams } from "react-router";
import { projectDetails } from "../data/projectDetails";
import { site } from "../data/site";
import { Seo } from "../app/Seo";
import { NotFoundPage } from "../app/NotFoundPage";
import { ProjectDetail } from "./ProjectDetail";

export default function ProjectPage() {
  const { slug } = useParams();
  const sorted = [...projectDetails].sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999),
  );
  const index = sorted.findIndex((project) => project.slug === slug);
  const project = sorted[index];
  if (!project) return <NotFoundPage />;
  return (
    <>
      <Seo
        title={`${project.title} | ${site.name}`}
        description={project.description}
      />
      <ProjectDetail project={project} nextProject={sorted[index + 1]} />
    </>
  );
}
