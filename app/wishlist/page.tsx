"use client";
import { useEffect, useState } from "react";
import { hardcodedHotels, Hotel } from "@/lib/hardcoded-hotels";
import { hardcodedRestaurants, Restaurant } from "@/lib/hardcoded-restaurants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function WishlistPage() {
  const [wishlistHotels, setWishlistHotels] = useState<Hotel[]>([]);
  const [wishlistRestaurants, setWishlistRestaurants] = useState<Restaurant[]>([]);
  const router = useRouter();
  const t = useTranslations('common');

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const hotels = hardcodedHotels.filter(hotel => wishlist.includes(hotel.id));
    const restaurants = hardcodedRestaurants.filter(restaurant => wishlist.includes(restaurant.id));
    setWishlistHotels(hotels);
    setWishlistRestaurants(restaurants);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="px-3 py-1.5 rounded-lg border border-gray-400 bg-white/80 text-gray-700 hover:bg-gray-100 transition shadow"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold">My Wishlist</h1>
      </div>
      {wishlistHotels.length === 0 && wishlistRestaurants.length === 0 ? (
        <p>Your saved hotels and restaurants will appear here.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistHotels.map(hotel => (
            <div key={hotel.id} className="bg-white/60 border border-white/40 rounded-xl p-6 shadow-2xl backdrop-blur-md">
              <span className="text-xs font-bold uppercase text-blue-700 mb-1 inline-block">Hotel</span>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">{hotel.name}</h2>
              <p className="text-sm text-gray-700 mb-2">{hotel.address}</p>
              <p className="text-yellow-500 mb-2">{"★".repeat(hotel.stars)}{"☆".repeat(5 - hotel.stars)}</p>
              <p className="mb-2 text-gray-800">{hotel.description}</p>
              <p className="font-bold text-gray-900">
                {typeof hotel.price_gel === 'number' && hotel.price_gel > 0
                  ? `₾${hotel.price_gel} / ${t('night')}`
                  : t('price_coming_soon')}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 bg-white/70 hover:bg-red-100 hover:text-red-700 transition"
                  onClick={() => {
                    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
                    const updatedWishlist = wishlist.filter((id: string) => id !== hotel.id);
                    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
                    setWishlistHotels(wishlistHotels.filter(h => h.id !== hotel.id));
                  }}
                >
                  Remove
                </button>
                <button
                  className="px-4 py-2 rounded-lg border border-blue-500 text-blue-700 bg-white/70 hover:bg-blue-50 hover:text-blue-900 transition"
                  onClick={() => {
                    const cleanedName = hotel.name.replace(/\b(Resort|Hotel|Motel)\b/gi, '').replace(/\s+/g, ' ').trim();
                    const searchString = `${cleanedName} ${hotel.address} ${hotel.lat},${hotel.lng}`;
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchString)}`,
                      "_blank"
                    );
                  }}
                >
                  View on Google Maps
                </button>
              </div>
            </div>
          ))}
          {wishlistRestaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white/60 border border-white/40 rounded-xl p-6 shadow-2xl backdrop-blur-md">
              <span className="text-xs font-bold uppercase text-green-700 mb-1 inline-block">Restaurant</span>
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">{restaurant.name}</h2>
              <p className="text-sm text-gray-700 mb-2">{restaurant.region}</p>
              <p className="text-yellow-500 mb-2">{"★".repeat(Math.round(restaurant.rating))}{"☆".repeat(5 - Math.round(restaurant.rating))}</p>
              <p className="mb-2 text-gray-800">Cuisine: {restaurant.cuisine}</p>
              <p className="mb-2 text-gray-800 text-sm">{restaurant.cuisine} restaurant in {restaurant.region}.</p>
              <div className="flex gap-2 mt-3">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 bg-white/70 hover:bg-red-100 hover:text-red-700 transition"
                  onClick={() => {
                    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
                    const updatedWishlist = wishlist.filter((id: string) => id !== restaurant.id);
                    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
                    setWishlistRestaurants(wishlistRestaurants.filter(r => r.id !== restaurant.id));
                  }}
                >
                  Remove
                </button>
                <button
                  className="px-4 py-2 rounded-lg border border-blue-500 text-blue-700 bg-white/70 hover:bg-blue-50 hover:text-blue-900 transition"
                  onClick={() => {
                    const searchString = `${restaurant.name} ${restaurant.region} ${restaurant.lat},${restaurant.lng}`;
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchString)}`,
                      "_blank"
                    );
                  }}
                >
                  View on Google Maps
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 