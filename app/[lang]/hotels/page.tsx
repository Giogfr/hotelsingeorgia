import { hardcodedHotels } from '@/lib/hardcoded-hotels';
import HotelsClient from './hotels-client';
import { Language, locales } from '@/lib/translations';

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export default async function HotelsPage({ params }: { params: Promise<{ lang: Language }> }) {
  const { lang } = await params;
  return <HotelsClient hotels={hardcodedHotels} lang={lang} />;
} 