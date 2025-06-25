import { HomePageClient } from "./home-page-client";
import { hardcodedHotels } from "@/lib/hardcoded-hotels";
import { hardcodedRestaurants } from "@/lib/hardcoded-restaurants";
import { locales } from "@/lib/translations";

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

const cityImages = [
  { name: "Tbilisi", img: "https://source.unsplash.com/random/600x600?tbilisi" },
  { name: "Batumi", img: "https://source.unsplash.com/random/600x600?batumi" },
  { name: "Kutaisi", img: "https://source.unsplash.com/random/600x600?kutaisi" },
  { name: "Bakuriani", img: "https://source.unsplash.com/random/600x600?bakuriani,ski" },
];

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getCityRestaurants(cityName: string) {
  // Try to match by city name in region or name
  return hardcodedRestaurants.filter(r =>
    r.region.toLowerCase().includes(cityName.toLowerCase()) ||
    r.name.toLowerCase().includes(cityName.toLowerCase())
  );
}

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const mixedCityItems = cityImages.map(city => {
    // Hotels for this city
    let hotels = hardcodedHotels.filter(hotel => hotel.city === city.name);
    // Restaurants for this city
    const restaurants = getCityRestaurants(city.name);
    // Pick up to 2 random hotels and 2 random restaurants
    const selectedHotels = shuffleArray([...hotels]).slice(0, 2).map(h => ({ ...h, type: "hotel" }));
    const selectedRestaurants = shuffleArray([...restaurants]).slice(0, 2).map(r => ({ ...r, type: "restaurant" }));
    // Mix and shuffle
    const mixed = shuffleArray([...selectedHotels, ...selectedRestaurants]);
    return { ...city, items: mixed };
  });

  return <HomePageClient cityImages={cityImages} lang={lang} mixedCityItems={mixedCityItems} />;
}
