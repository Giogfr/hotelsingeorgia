import { hardcodedHotels, Hotel } from "@/lib/hardcoded-hotels";
import HotelDetailsClient from "./hotel-details-client";
import { Language, locales } from "@/lib/translations";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const params = [];
  for (const lang of locales) {
    for (const hotel of hardcodedHotels) {
      params.push({ lang, id: hotel.id });
    }
  }
  return params;
}

export default async function HotelDetailsPage({
  params,
}: {
  params: Promise<{ id: string; lang: Language }>;
}) {
  const { id, lang } = await params;
  const hotel = hardcodedHotels.find((h) => h.id === id);

  if (!hotel) {
    notFound();
  }

  return <HotelDetailsClient hotel={hotel} lang={lang} />;
}