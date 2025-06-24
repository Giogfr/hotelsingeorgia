import { getTranslations } from "@/lib/translations"
import { ContactPageClient } from "./contact-client"
import { Language } from "@/lib/translations";
import { en } from "@/lib/locales/en";

export async function generateStaticParams() {
  const languages = ['en', 'es', 'sr', 'ru', 'ka'];
  return languages.map(lang => ({ lang }));
}

export default async function ContactPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  const t = await getTranslations(lang);
  const common = await getTranslations(lang, "common");

  return <ContactPageClient t={{...t.contact, ...common}} lang={lang} />;
}