/**
 * Mirrors next.config.ts's basePath logic. Read directly (not imported
 * from next.config.ts, which only runs in the Node build process) so
 * client code —  e.g. LanguageSwitcher's plain <a> tags, which don't
 * get Next's automatic basePath injection the way next/link does —
 * can prefix a path correctly. Both reads key off the same
 * NEXT_PUBLIC_ env var, which Next.js inlines into the client bundle.
 */
export const basePath =
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages" ? "/ai-cockpit-explorer" : "";
