import { spawnSync } from "node:child_process";

const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  (productionDomain ? `https://${productionDomain}` : "");

if (!siteUrl)
  throw new Error(
    "Set SITE_URL or enable Vercel System Environment Variables before deploying.",
  );

process.env.SITE_URL = new URL(siteUrl).origin;

const commands = [
  [process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"]],
  [process.execPath, ["scripts/verify-build.mjs"]],
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
