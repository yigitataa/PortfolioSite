import manifest from "../data/imageManifest.json";

interface ImageAsset {
  width: number;
  height: number;
  sources: Array<{ src: string; width: number }>;
}

export function imageAttributes(src: string, thumbnail = false) {
  const asset = (manifest as Record<string, ImageAsset>)[src];
  if (!asset) return { src };
  return {
    src: asset.sources[thumbnail ? 0 : asset.sources.length - 1]?.src ?? src,
    srcSet: thumbnail
      ? undefined
      : asset.sources
          .map((source) => `${source.src} ${source.width}w`)
          .join(", "),
    width: asset.width,
    height: asset.height,
  };
}
