import { getTranslations } from "@/lib/translations"
import { AboutPageClient } from "./about-client"
import { Language } from "@/lib/translations";

export async function generateStaticParams() {
  const languages = ['en', 'es', 'sr', 'ru', 'ka'];
  return languages.map(lang => ({ lang }));
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const t = await getTranslations(lang);
  const aboutT = t.about_page;

  return <AboutPageClient features={aboutT.features} stats={aboutT.stats} t={aboutT} lang={lang} />;
} 