import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const configuredUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;
if (!configuredUrl) {
  console.info("SITE_URL is unset; sitemap generation skipped.");
  process.exit(0);
}

const origin = new URL(configuredUrl).origin;
if (!/^https?:\/\//.test(origin))
  throw new Error("SITE_URL must use http or https.");
const outputDirectory =
  process.env.OUTPUT_DIR || new URL("../dist/", import.meta.url).pathname;
const projects = JSON.parse(
  await readFile(
    new URL("../src/data/projectEntries.json", import.meta.url),
    "utf8",
  ),
);
const paths = [
  "/",
  "/about",
  ...projects.map((project) => `/work/${encodeURIComponent(project.slug)}`),
];
const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${escapeXml(new URL(path, origin).href)}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(resolve(outputDirectory, "sitemap.xml"), sitemap);
await writeFile(
  resolve(outputDirectory, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
console.info(`Generated sitemap for ${paths.length} routes at ${origin}.`);
