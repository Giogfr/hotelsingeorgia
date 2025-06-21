import { getDictionary } from "@/lib/translations"
import { HelpPageClient } from "./help-client"

export async function generateStaticParams() {
  const languages = ['en', 'es', 'sr', 'ru', 'ka'];
  return languages.map(lang => ({ lang }));
}

export default async function HelpPage({ params: { lang } }: { params: { lang: string } }) {
  const t = await getDictionary(lang);
  return <HelpPageClient t={t} />;
}
