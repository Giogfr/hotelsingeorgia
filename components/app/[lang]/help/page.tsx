import { getTranslations } from "@/lib/translations"
import { HelpPageClient } from "./help-client"
import { Language } from "@/lib/translations";

export async function generateStaticParams() {
  const languages = ['en', 'es', 'sr', 'ru', 'ka'];
  return languages.map(lang => ({ lang }));
}

export default async function HelpPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const t: any = getTranslations(lang);
  return <HelpPageClient t={t.help} lang={lang} />;
}