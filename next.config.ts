import type { NextConfig } from "next";

/**
 * Only the GitHub Pages deployment build sets this (see
 * .github/workflows/deploy-pages.yml). Keying off NODE_ENV instead would
 * make every local `npm run build` (including CI's own build check and
 * Playwright's static preview server) silently require the
 * /ai-cockpit-explorer prefix too.
 */
const isGithubPagesBuild = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages";

const basePath = isGithubPagesBuild ? "/ai-cockpit-explorer" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: isGithubPagesBuild ? `${basePath}/` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
