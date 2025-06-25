"use client";

import { Hotel } from "@/lib/hardcoded-hotels";
import { Language } from "@/lib/translations";
import { useCurrency } from "@/contexts/currency-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function HotelDetailsClient({
  hotel,
  lang,
}: {
  hotel: Hotel;
  lang: Language;
}) {
  const { currency } = useCurrency();
  const [isLiked, setIsLiked] = useState(false);
  const t = useTranslations('common');

  // Check if hotel is in wishlist on mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsLiked(wishlist.includes(hotel.id));
  }, [hotel.id]);

  const handleLike = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let updatedWishlist;
    if (isLiked) {
      updatedWishlist = wishlist.filter((id: string) => id !== hotel.id);
    } else {
      updatedWishlist = [...wishlist, hotel.id];
    }
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsLiked(!isLiked);
  };

  const getPrice = () => {
    let price = null;
    if (currency === "GEL") price = hotel.price_gel;
    else if (currency === "USD") price = hotel.price_usd;
    else if (currency === "EUR") price = hotel.price_eur;
    else if (currency === "RUB") price = hotel.price_rub;
    else price = hotel.price_gel;
    if (typeof price !== 'number' || !isFinite(price) || price <= 0) {
      return t('price_coming_soon');
    }
    const symbol = currency === "GEL" ? "₾" : currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "RUB" ? "₽" : "₾";
    return `${symbol}${price}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">{hotel.name}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            {hotel.city}, {hotel.region}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="relative w-full h-96 mb-4 bg-secondary rounded-lg flex items-center justify-center">
                <p className="text-2xl text-muted-foreground">{hotel.name}</p>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-6 h-6 ${
                      index < hotel.stars
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mt-2">{hotel.address}</p>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Booking</h3>
                <p className="text-4xl font-bold mb-6">{getPrice()} <span className="text-lg font-normal text-muted-foreground">/ night</span></p>
                {/* Hotel description */}
                {hotel.description && (
                  <p className="text-base text-muted-foreground mb-4">{hotel.description}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={handleLike}>
                  <Heart className={`w-6 h-6 mr-2 ${isLiked ? "text-red-500 fill-red-500" : ""}`} />
                  {isLiked ? "Added to Wishlist" : "Add to Wishlist"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Remove 'Resort', 'Hotel', and 'Motel' from the hotel name
                    const cleanedName = hotel.name.replace(/\b(Resort|Hotel|Motel)\b/gi, '').replace(/\s+/g, ' ').trim();
                    const searchString = `${cleanedName} ${hotel.address} ${hotel.lat},${hotel.lng}`;
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchString)}`,
                      "_blank"
                    );
                  }}
                >
                  View on Google Maps
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}