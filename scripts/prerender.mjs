import { build } from "vite";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const serverDir = resolve("node_modules/.cache/portfolio-ssr");
await build({
  build: {
    ssr: "src/entry-server.tsx",
    outDir: serverDir,
    emptyOutDir: true,
    copyPublicDir: false,
    minify: false,
    rolldownOptions: { output: { entryFileNames: "entry-server.mjs" } },
  },
});
const { render } = await import(
  pathToFileURL(resolve(serverDir, "entry-server.mjs")).href
);
const entries = JSON.parse(
  await readFile("src/data/projectEntries.json", "utf8"),
);
const template = await readFile("dist/index.html", "utf8");
const configured = process.env.SITE_URL || process.env.VITE_SITE_URL;
const origin = configured ? new URL(configured).origin : null;
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const routes = [
  "/",
  "/about",
  ...entries.map((p) => `/work/${p.slug}`),
  "/404",
];
for (const route of routes) {
  const { html, metadata } = await render(route);
  const url = origin ? new URL(route, origin).href : null;
  const image = origin ? new URL(metadata.image, origin).href : metadata.image;
  const head = [
    `<title>${escape(metadata.title)}</title>`,
    `<meta name="description" content="${escape(metadata.description)}">`,
    `<meta name="robots" content="${metadata.noindex ? "noindex, follow" : "index, follow"}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="tr_TR">`,
    `<meta property="og:site_name" content="Yiğit Ata">`,
    `<meta property="og:title" content="${escape(metadata.title)}">`,
    `<meta property="og:description" content="${escape(metadata.description)}">`,
    `<meta property="og:image" content="${escape(image)}">`,
    `<meta property="og:image:alt" content="${escape(metadata.imageAlt)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escape(metadata.title)}">`,
    `<meta name="twitter:description" content="${escape(metadata.description)}">`,
    `<meta name="twitter:image" content="${escape(image)}">`,
    `<meta name="twitter:image:alt" content="${escape(metadata.imageAlt)}">`,
    ...(url && !metadata.noindex
      ? [
          `<link rel="canonical" href="${escape(url)}">`,
          `<meta property="og:url" content="${escape(url)}">`,
        ]
      : []),
  ].join("\n");
  const output = template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(
      /<meta\s+(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[\s\S]*?>/g,
      "",
    )
    .replace("</head>", `${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const destination =
    route === "/"
      ? "dist/index.html"
      : route === "/404"
        ? "dist/404.html"
        : `dist${route}/index.html`;
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, output);
}
await rm(serverDir, { recursive: true, force: true });
await rm("dist/.DS_Store", { force: true });
console.info(
  `Pre-rendered ${routes.length} pages with route-specific content and metadata.`,
);
if (!origin)
  console.info(
    "SITE_URL is unset; absolute canonical/share URLs will be resolved by the browser until a publish origin is configured.",
  );
