"use client";
import { useParams } from "next/navigation";
import { hardcodedRestaurants } from "@/lib/hardcoded-restaurants";

export default function RestaurantDetailsPage() {
  const params = useParams();
  const { id } = params;
  const restaurant = hardcodedRestaurants.find(r => r.id === id);

  if (!restaurant) {
    return <div className="p-8 text-center text-2xl">404 – Restaurant not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white/60 border border-white/40 rounded-xl p-8 shadow-2xl backdrop-blur-md max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{restaurant.name}</h1>
        <p className="text-gray-700 mb-2">{restaurant.region}</p>
        <p className="text-yellow-500 mb-2">{"★".repeat(Math.round(restaurant.rating))}{"☆".repeat(5 - Math.round(restaurant.rating))} <span className="text-gray-700 ml-2">({restaurant.rating.toFixed(1)})</span></p>
        <p className="mb-2 text-gray-800">Cuisine: {restaurant.cuisine}</p>
        <p className="mb-4 text-gray-800 text-sm">{restaurant.cuisine} restaurant in {restaurant.region}.</p>
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
  );
} 