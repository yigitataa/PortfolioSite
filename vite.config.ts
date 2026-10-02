import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import projects from "./src/data/projectEntries.json" with { type: "json" };

export default defineConfig({
  plugins: [
    react(),
    {
      name: "prerendered-route-preview",
      configurePreviewServer(server) {
        const routes = new Set([
          "/",
          "/about",
          ...projects.map((project) => `/work/${project.slug}`),
        ]);
        server.middlewares.use(async (request, response, next) => {
          const path =
            new URL(request.url || "/", "http://localhost").pathname.replace(
              /\/+$/,
              "",
            ) || "/";
          if (
            !["GET", "HEAD"].includes(request.method || "") ||
            (path.includes(".") && path !== "/404.html")
          )
            return next();
          const found = routes.has(path);
          const file = found
            ? path === "/"
              ? "index.html"
              : `${path.slice(1)}/index.html`
            : "404.html";
          try {
            const html = await readFile(
              resolve(server.config.root, server.config.build.outDir, file),
            );
            response.statusCode = found ? 200 : 404;
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.end(request.method === "HEAD" ? undefined : html);
          } catch (error) {
            next(error);
          }
        });
      },
    },
  ],
  define: {
    "import.meta.env.VITE_SITE_URL": JSON.stringify(
      process.env.SITE_URL || process.env.VITE_SITE_URL || "",
    ),
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
