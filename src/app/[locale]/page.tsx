import type { Metadata } from "next";
import { ExplorerShell } from "@/ui/ExplorerShell";
import { getMessages } from "@/i18n/getMessages";
import { supportedLocales, toSupportedLocale } from "@/i18n/locales";

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(toSupportedLocale(locale));
  return {
    title: messages.html.title,
    description: messages.html.description,
  };
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ExplorerShell locale={toSupportedLocale(locale)} />;
}
