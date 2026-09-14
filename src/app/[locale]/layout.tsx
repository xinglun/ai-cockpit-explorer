import type { ReactNode } from "react";
import { toSupportedLocale } from "@/i18n/locales";
import { HtmlLangSync } from "./HtmlLangSync";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <HtmlLangSync locale={toSupportedLocale(locale)} />
      {children}
    </>
  );
}
