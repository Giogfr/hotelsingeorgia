import { hardcodedHotels } from "@/lib/hardcoded-hotels";
import HotelDetailsClient from "./hotel-details-client";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const languages = ['en', 'es', 'sr', 'ru', 'ka'];
  const params = languages.flatMap((lang) =>
    hardcodedHotels.map((hotel) => ({
      lang: lang,
      id: hotel.id,
    }))
  );
  return params;
}

async function getHotel(id: string) {
  const hotel = hardcodedHotels.find((hotel) => hotel.id === id);
  if (!hotel) {
    return null;
  }
  return hotel;
}

export default async function HotelDetailsPage({ params }: { params: { id: string, lang: string } }) {
  const hotel = await getHotel(params.id);

  if (!hotel) {
    notFound();
  }

  return <HotelDetailsClient hotel={hotel} />;
}
