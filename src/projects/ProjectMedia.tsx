import { useState } from "react";
import type { Project } from "../types/project";
import { imageAttributes } from "../lib/images";

export function ProjectMedia({
  project,
  media,
  hero = false,
}: {
  project: Project;
  media?: Project["cover"];
  hero?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const cover = media ?? project.cover;
  if (!cover.src || failed || cover.type === "interactive")
    return (
      <div
        className="project-media project-media--fallback"
        role="img"
        aria-label={`${project.title} için ekran görüntüsü henüz eklenmedi`}
      >
        <span>{project.shortTitle ?? project.title}</span>
        <small>Ekran görüntüsü yakında</small>
      </div>
    );
  if (cover.type === "video")
    return (
      <video
        className="project-media"
        src={cover.src}
        poster={project.gallery?.find((item) => item.type === "image")?.src}
        muted
        playsInline
        controls
        preload="none"
        aria-label={cover.alt}
        onError={() => setFailed(true)}
      />
    );
  return (
    <img
      className="project-media"
      {...imageAttributes(cover.src)}
      sizes={
        hero
          ? "(min-width: 1101px) 55vw, 100vw"
          : project.layout === "wide"
            ? "100vw"
            : "(min-width: 768px) 50vw, 100vw"
      }
      alt={cover.alt}
      loading={hero ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
