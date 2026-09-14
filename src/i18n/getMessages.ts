import { en } from "./en";
import { ja } from "./ja";
import { zhCN } from "./zh-CN";
import { toSupportedLocale, type Locale } from "./locales";
import type { ExplorerMessages } from "./types";

const messagesByLocale: Record<Locale, ExplorerMessages> = {
  en,
  ja,
  "zh-CN": zhCN,
};

/** Falls back to the default locale's messages for an unsupported value. */
export function getMessages(locale: string | Locale): ExplorerMessages {
  return messagesByLocale[toSupportedLocale(locale)];
}
