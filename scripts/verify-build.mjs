import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { JSDOM } from "jsdom";
const projects = JSON.parse(
  await readFile("src/data/projectEntries.json", "utf8"),
);
const routes = [
  ["/", "Yiğit ATA"],
  ["/about", "Ürettikçe öğreniyorum."],
  ...projects.map((p) => [`/work/${p.slug}`, p.title]),
  ["/404", "Bu sayfa bulunamadı."],
];
const configured = process.env.SITE_URL || process.env.VITE_SITE_URL;
const origin = configured ? new URL(configured).origin : null;
for (const [route, heading] of routes) {
  const file =
    route === "/"
      ? "dist/index.html"
      : route === "/404"
        ? "dist/404.html"
        : `dist${route}/index.html`;
  const html = await readFile(file, "utf8");
  const { document } = new JSDOM(html).window;
  assert.ok(
    document.querySelector("main h1")?.textContent.includes(heading),
    `Static content missing: ${route}`,
  );
  assert.equal(document.querySelectorAll("title").length, 1);
  assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);
  assert.equal(
    document.querySelectorAll('meta[property="og:image"]').length,
    1,
  );
  assert.equal(
    document.querySelector('meta[name="robots"]').content,
    route === "/404" ? "noindex, follow" : "index, follow",
  );
  const canonical = document.querySelector('link[rel="canonical"]');
  if (origin && route !== "/404")
    assert.equal(canonical?.href, new URL(route, origin).href);
  else assert.equal(canonical, null);
  assert.ok(
    document.querySelector('a[href="/documents/yigit-ata-cv.pdf"][download]'),
  );
  for (const element of document.querySelectorAll(
    'img[src], script[src], link[rel="stylesheet"]',
  )) {
    const path = element.getAttribute("src") || element.getAttribute("href");
    if (path?.startsWith("/")) await access(`dist${path}`);
  }
  const social = document.querySelector('meta[property="og:image"]').content;
  await access(`dist${new URL(social, "https://local.example").pathname}`);
  if (route.startsWith("/work/")) {
    for (const section of [
      "Problem",
      "Çözüm",
      "Teknik karar",
      "Mevcut sınırlar",
      "Ekranlar ve doğrulama kapsamı",
    ])
      assert.ok(
        [...document.querySelectorAll("h2")].some(
          (h) => h.textContent === section,
        ),
      );
    assert.ok(
      !document
        .querySelector(".project-detail__header")
        ?.getAttribute("style")
        ?.includes("opacity:0"),
    );
  }
}
if (origin) {
  const xml = await readFile("dist/sitemap.xml", "utf8");
  assert.equal([...xml.matchAll(/<loc>/g)].length, 9);
  assert.ok(
    (await readFile("dist/robots.txt", "utf8")).includes(
      `${origin}/sitemap.xml`,
    ),
  );
}
try {
  await access("dist/.DS_Store");
  assert.fail("Finder metadata leaked into dist");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
console.info(
  "Verified 10 static pages, metadata, canonical/noindex state, local assets, CV links, and project sections.",
);
if (process.env.PREVIEW_URL) {
  for (const [route, heading] of [
    ...routes.slice(0, -1),
    ["/bilinmeyen-kontrol-adresi", "Bu sayfa bulunamadı."],
  ]) {
    const response = await fetch(new URL(route, process.env.PREVIEW_URL));
    const { document } = new JSDOM(await response.text()).window;
    assert.equal(
      response.status,
      route === "/bilinmeyen-kontrol-adresi" ? 404 : 200,
    );
    assert.ok(
      document.querySelector("main h1")?.textContent.includes(heading),
      `Server returned the wrong page: ${route}`,
    );
  }
  console.info("Verified direct HTTP routes and unknown-route 404 response.");
}
