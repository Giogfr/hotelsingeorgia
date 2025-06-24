"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  MapPin,
  Star,
  Utensils,
  Frown,
} from "lucide-react"
import { motion } from "framer-motion"
import { Restaurant } from "@/lib/hardcoded-restaurants"
import { Language } from "@/lib/translations"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RestaurantsClientProps {
  restaurants: Restaurant[];
  t: any;
  lang: Language;
}

function RestaurantCard({ restaurant, t }: { restaurant: Restaurant, t: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col">
        <CardContent className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-3 flex-grow">{restaurant.name}</h3>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{restaurant.region}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Utensils className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{restaurant.cuisine}</span>
          </div>
          
          <div className="flex items-center mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < Math.round(restaurant.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
             <span className="ml-2 text-sm text-muted-foreground">({restaurant.rating.toFixed(1)})</span>
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name)}`,
                        "_blank"
                      )
                    }
                  >
                    View on Map
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {t.restaurants_page.reserveTableDescription}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function RestaurantsClient({ restaurants, t, lang }: RestaurantsClientProps) {
  const [search, setSearch] = useState("")
  const [sortOrder, setSortOrder] = useState("ratingDesc")
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null)

  // Dynamically calculate cuisine counts from the data
  const cuisineCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of restaurants) {
      counts[r.cuisine] = (counts[r.cuisine] || 0) + 1;
    }
    return counts;
  }, [restaurants]);

  const cuisines = Object.keys(cuisineCounts).sort((a, b) => cuisineCounts[b] - cuisineCounts[a]);

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants.filter(
      (restaurant) =>
        (selectedCuisine ? restaurant.cuisine === selectedCuisine : true) &&
        (restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
          restaurant.region.toLowerCase().includes(search.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(search.toLowerCase()))
    );
    switch (sortOrder) {
      case "name":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "ratingAsc":
        filtered = filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "ratingDesc":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "cuisine":
        filtered = filtered.sort((a, b) => a.cuisine.localeCompare(b.cuisine));
        break;
      default:
        filtered = filtered.sort((a, b) => b.rating - a.rating);
    }
    return filtered;
  }, [search, restaurants, sortOrder, selectedCuisine]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center py-8 md:py-12">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold mb-2"
            >
                {t.restaurants_page.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4"
            >
              Georgia is a land of legendary feasts, warm hospitality, and a cuisine that blends East and West. Discover the flavors of khinkali, khachapuri, and more at our handpicked restaurants across the country.
            </motion.p>
        </header>

        {/* Cuisine filter section */}
        <div className="mb-6">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-2 overflow-x-auto">
              <Button
                variant={selectedCuisine === null ? "default" : "outline"}
                onClick={() => setSelectedCuisine(null)}
                className="shrink-0"
              >
                All
              </Button>
              {cuisines.map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={selectedCuisine === cuisine ? "default" : "outline"}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className="shrink-0"
                >
                  {cuisine} <span className="ml-2 text-xs text-muted-foreground">{cuisineCounts[cuisine]}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        {/* End cuisine filter section */}

        <div className="sticky top-[60px] z-40 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t.restaurants_page.searchPlaceholder}
                className="w-full pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-[180px]">
              <select
                className="w-full border rounded px-3 py-2 bg-background text-foreground"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
              >
                <option value="ratingDesc">{t.restaurants_page.sortByRatingDesc}</option>
                <option value="ratingAsc">{t.restaurants_page.sortByRatingAsc}</option>
                <option value="name">{t.restaurants_page.sortByName}</option>
                <option value="cuisine">{t.restaurants_page.sortByCuisine}</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-lg text-muted-foreground">
            {t.restaurants_page.found.replace("{count}", filteredRestaurants.length.toString())}
          </p>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} t={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Frown className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Restaurants Found</h2>
            <p className="text-muted-foreground">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  )
}