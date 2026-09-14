"use client";

import { usePathname } from "next/navigation";
import { supportedLocales, type Locale } from "@/i18n/locales";
import { buildLocalePath, explorerStateToSearchParams, type ExplorerUrlState } from "@/interaction/explorerUrlState";
import { basePath } from "@/i18n/basePath";
import { colors } from "@/design-system/semanticColors";

const localeDisplayName: Record<Locale, string> = {
  en: "EN",
  ja: "日本語",
  "zh-CN": "中文",
};

interface LanguageSwitcherProps {
  locale: Locale;
  ariaLabel: string;
  /** The live mode/selection/tour-step, carried into the sibling-locale link. */
  currentState: ExplorerUrlState;
}

/**
 * Small, visible, top-right — not hidden in a settings menu. Uses a
 * plain <a> (a real, full navigation) rather than next/link: a soft
 * client-side transition re-renders this page's component tree before
 * the browser's own location reflects the destination URL, which made
 * the target locale's initial-state read of window.location.search
 * unreliable. A full navigation reloads the target /{locale}/ page
 * with the URL already correct, restoring mode/selection/tour-step
 * exactly the way a shared/reloaded URL does elsewhere in the app.
 */
export function LanguageSwitcher({ locale, ariaLabel, currentState }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const searchParams = explorerStateToSearchParams(currentState);

  return (
    <nav aria-label={ariaLabel} className="flex gap-1">
      {supportedLocales.map((candidate) => {
        const isActive = candidate === locale;
        return (
          <a
            key={candidate}
            href={`${basePath}${buildLocalePath(pathname, candidate, searchParams)}`}
            aria-current={isActive ? "true" : undefined}
            style={{
              borderColor: isActive ? colors.informationFlow : colors.border,
              color: isActive ? colors.textPrimary : colors.textMuted,
            }}
            className="rounded border px-2 py-1 text-xs transition-colors"
          >
            {localeDisplayName[candidate]}
          </a>
        );
      })}
    </nav>
  );
}
