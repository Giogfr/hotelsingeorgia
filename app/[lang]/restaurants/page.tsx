import { RestaurantsClient } from "./restaurants-client";
import { hardcodedRestaurants } from "@/lib/hardcoded-restaurants";
import { getTranslations, Language, locales } from "@/lib/translations";

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export default async function RestaurantsPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const t = await getTranslations(lang);
  const restaurants = hardcodedRestaurants;

  return <RestaurantsClient restaurants={restaurants} t={t} lang={lang} />;
} 