import { useState } from "react";
import type { Project } from "../types/project";
import { ProjectMedia } from "./ProjectMedia";
import { imageAttributes } from "../lib/images";

type GalleryMedia = { type: "image" | "video"; src: string; alt: string };

export function ProjectGallery({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cover: GalleryMedia | undefined =
    project.cover.src && project.cover.type !== "interactive"
      ? {
          type: project.cover.type,
          src: project.cover.src,
          alt: project.cover.alt,
        }
      : undefined;
  const media = [...(cover ? [cover] : []), ...(project.gallery ?? [])];
  const active = media[activeIndex];

  return (
    <div className="project-detail__media">
      <figure className="project-detail__media-stage">
        <div
          className="project-detail__hero"
          style={{ viewTransitionName: `project-${project.slug}` }}
        >
          <ProjectMedia
            key={active?.src}
            project={project}
            media={active}
            hero
          />
        </div>
        {active && (
          <figcaption className="project-detail__media-caption">
            <span>
              Görsel {activeIndex + 1} / {media.length}
            </span>
            <a href={active.src} target="_blank" rel="noopener noreferrer">
              Görseli büyüt ↗
            </a>
          </figcaption>
        )}
      </figure>
      {media.length > 1 && (
        <div
          className="project-detail__media-choices"
          role="group"
          aria-label={`${project.title} ekran görüntüleri`}
        >
          {media.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className="project-detail__media-choice"
              aria-label={`Görsel ${index + 1}: ${item.alt}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              {item.type === "image" ? (
                <img
                  {...imageAttributes(item.src, true)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="project-detail__video-thumb">Video</span>
              )}
              <span className="project-detail__media-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
