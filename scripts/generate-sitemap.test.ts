import { afterEach, expect, it } from "vitest";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve, join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const run = promisify(execFile);
const temporary: string[] = [];
afterEach(async () => {
  await Promise.all(
    temporary
      .splice(0)
      .map((path) => rm(path, { recursive: true, force: true })),
  );
});
it("generates every published route and robots URL from the actual project registry", async () => {
  const directory = await mkdtemp(join(tmpdir(), "portfolio-sitemap-"));
  temporary.push(directory);
  await run(process.execPath, [resolve("scripts/generate-sitemap.mjs")], {
    env: {
      ...process.env,
      SITE_URL: "https://portfolio.example",
      OUTPUT_DIR: directory,
    },
  });
  const sitemap = await readFile(join(directory, "sitemap.xml"), "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  expect(urls).toEqual([
    "https://portfolio.example/",
    "https://portfolio.example/about",
    ...[
      "techball-web",
      "yatatodo",
      "yataquizing",
      "yataclimate",
      "yata-market",
      "kisisel-kitaplik",
      "yataoil",
    ].map((slug) => `https://portfolio.example/work/${slug}`),
  ]);
  expect(await readFile(join(directory, "robots.txt"), "utf8")).toContain(
    "Sitemap: https://portfolio.example/sitemap.xml",
  );
});
it("rejects a non-web publish origin", async () => {
  await expect(
    run(process.execPath, [resolve("scripts/generate-sitemap.mjs")], {
      env: { ...process.env, SITE_URL: "mailto:someone@example.com" },
    }),
  ).rejects.toThrow();
});
