"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { supportedLocales, type Locale } from "@/i18n/locales";
import { buildLocalePath } from "@/interaction/explorerUrlState";
import { colors } from "@/design-system/semanticColors";

const localeDisplayName: Record<Locale, string> = {
  en: "EN",
  ja: "日本語",
  "zh-CN": "中文",
};

interface LanguageSwitcherProps {
  locale: Locale;
  ariaLabel: string;
}

/**
 * Small, visible, top-right — not hidden in a settings menu. Switching
 * locale is a real route change to a sibling /{locale}/ URL, carrying
 * the current mode/selection/tour-step search params along so the
 * experience isn't reset.
 */
export function LanguageSwitcher({ locale, ariaLabel }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const searchParams = useSearchParams();

  return (
    <nav aria-label={ariaLabel} className="flex gap-1">
      {supportedLocales.map((candidate) => {
        const isActive = candidate === locale;
        return (
          <Link
            key={candidate}
            href={buildLocalePath(pathname, candidate, searchParams)}
            aria-current={isActive ? "true" : undefined}
            style={{
              borderColor: isActive ? colors.informationFlow : colors.border,
              color: isActive ? colors.textPrimary : colors.textMuted,
            }}
            className="rounded border px-2 py-1 text-xs transition-colors"
          >
            {localeDisplayName[candidate]}
          </Link>
        );
      })}
    </nav>
  );
}
