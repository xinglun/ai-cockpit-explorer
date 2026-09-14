"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale, isSupportedLocale, type Locale } from "@/i18n/locales";

/**
 * The bare root is a detector, not the primary access path — every
 * locale already has its own stable, directly-linkable, statically
 * generated route (/en/, /ja/, /zh-CN/). This only chooses an initial
 * locale for a visitor who lands on the un-localized root URL.
 */
function detectLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;
  const candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    if (!candidate) continue;
    if (isSupportedLocale(candidate)) return candidate;
    const base = candidate.split("-")[0];
    if (base === "zh") return "zh-CN";
    if (isSupportedLocale(base)) return base;
  }
  return defaultLocale;
}

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${detectLocale()}/`);
  }, [router]);

  return null;
}
