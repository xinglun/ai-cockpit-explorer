export const supportedLocales = ["en", "ja", "zh-CN"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export function isSupportedLocale(value: string): value is Locale {
  return (supportedLocales as readonly string[]).includes(value);
}

/** Falls back to the default locale rather than throwing on an unknown value. */
export function toSupportedLocale(value: string | null | undefined): Locale {
  if (value && isSupportedLocale(value)) return value;
  return defaultLocale;
}
