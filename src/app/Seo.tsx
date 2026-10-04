import { useEffect } from "react";
import { useLocation } from "react-router";
import { site } from "../data/site";
import { routeMetadata } from "./routeMetadata";
import { useLanguage } from "./useLanguage";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function Seo({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const location = useLocation();
  const { language } = useLanguage();
  useEffect(() => {
    const metadata = routeMetadata(location.pathname, language);
    const url = new URL(
      location.pathname.replace(/\/+$/, "") || "/",
      site.canonicalUrl || window.location.origin,
    ).href;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:locale", language === "en" ? "en_US" : "tr_TR");
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta(
      "name",
      "robots",
      metadata.noindex ? "noindex, follow" : "index, follow",
    );
    upsertMeta("property", "og:image", new URL(metadata.image, url).href);
    upsertMeta("property", "og:image:alt", metadata.imageAlt);
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:image", new URL(metadata.image, url).href);
    upsertMeta("name", "twitter:image:alt", metadata.imageAlt);
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (metadata.noindex) {
      canonical?.remove();
      return;
    }
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, location.pathname, language]);
  return null;
}
