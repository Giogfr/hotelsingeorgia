import { HomePageClient } from "./home-page-client";
import { hardcodedHotels } from "@/lib/hardcoded-hotels";
import { locales } from "@/lib/translations";

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

const cityImages = [
  { name: "Tbilisi", img: "https://source.unsplash.com/random/600x600?tbilisi" },
  { name: "Batumi", img: "https://source.unsplash.com/random/600x600?batumi" },
  { name: "Kutaisi", img: "https://source.unsplash.com/random/600x600?kutaisi" },
  { name: "Gudauri", img: "https://source.unsplash.com/random/600x600?gudauri,ski" },
]

export default async function LandingPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    
    const cityImagesWithCounts = cityImages.map(city => {
        const count = hardcodedHotels.filter(hotel => hotel.city === city.name).length;
        // A special case for Gudauri, as its hotels might be listed under different nearby names
        if (city.name === "Gudauri") {
            const gudauriCount = hardcodedHotels.filter(hotel => 
                hotel.city === "Gudauri" || hotel.city === "Stepantsminda"
            ).length;
            return { ...city, hotels: gudauriCount };
        }
        return { ...city, hotels: count };
    });

    return <HomePageClient cityImages={cityImagesWithCounts} lang={lang} />;
}
