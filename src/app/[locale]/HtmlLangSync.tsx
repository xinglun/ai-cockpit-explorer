"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/locales";

/**
 * The root layout (src/app/layout.tsx) owns the single <html> tag and
 * can't itself see the [locale] segment, so this syncs the actual
 * rendered `lang` attribute once the locale route hydrates. The
 * per-locale <title>/description are already correct at build time
 * via generateMetadata; only this attribute needs a client sync given
 * the fully-static, no-server-side-localization constraint.
 */
export function HtmlLangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
