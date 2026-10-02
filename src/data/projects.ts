import type { Project } from "../types/project";
import entries from "./projectEntries.json";

export const projects: Project[] = entries.map((entry) => ({
  ...entry,
  cover: entry.cover as Project["cover"],
  layout: entry.layout as Project["layout"],
  status: entry.status as Project["status"],
  gallery: entry.gallery as Project["gallery"],
}));
