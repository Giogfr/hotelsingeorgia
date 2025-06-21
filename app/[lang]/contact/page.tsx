import { getDictionary } from "@/lib/translations"
import { ContactPageClient } from "./contact-client"

export async function generateStaticParams() {
  const languages = ['en', 'es', 'sr', 'ru', 'ka'];
  return languages.map(lang => ({ lang }));
}

export default async function ContactPage({ params: { lang } }: { params: { lang: string } }) {
  const t = await getDictionary(lang);
  return <ContactPageClient t={t} />;
}
