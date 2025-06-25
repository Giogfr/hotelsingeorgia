"use client"

import { useState, useMemo } from "react"
import { useCurrency } from "@/contexts/currency-context"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Search, Frown, Hotel, Megaphone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import type { StaticImageData } from 'next/image';
import { Currency } from "@/components/currency-switcher"
import { Language, useHotelsTranslation } from "@/lib/translations"
import { useRouter } from "next/navigation"

interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  stars: number;
  photo: string | StaticImageData;
  price_gel: number;
  price_eur: number;
  price_usd: number;
  price_rub: number;
  featured: boolean;
}

const currencySymbols: Record<Currency, string> = {
  GEL: "₾",
  EUR: "€",
  USD: "$",
  RUB: "₽",
};

export default function HotelsClient({ hotels, lang }: { hotels: Hotel[], lang: Language }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("rating")
  const { currency } = useCurrency();
  const t = useHotelsTranslation(lang);
  const router = useRouter();

  const getPrice = (hotel: Hotel) => {
    let price = hotel[`price_${currency.toLowerCase()}` as keyof Hotel];
    const symbol = currencySymbols[currency];
    if (currency !== 'GEL' && (typeof price !== 'number' || !isFinite(price) || price <= 0)) {
      const gel = hotel.price_gel;
      if (typeof gel !== 'number' || !isFinite(gel) || gel <= 0) return t('price_coming_soon');
      if (currency === 'EUR') price = Math.round(gel * 0.34);
      else if (currency === 'USD') price = Math.round(gel * 0.37);
      else if (currency === 'RUB') price = Math.round(gel * 28.82);
      else price = gel;
    }
    if (typeof price !== 'number' || !isFinite(price) || price <= 0) {
      return t('price_coming_soon');
    }
    return `${symbol}${price.toLocaleString()}`;
  };

  const featuredHotel = hotels.find(h => h.featured);
  const nonFeaturedHotels = hotels.filter(h => !h.featured);
  const filteredHotels = useMemo(() => {
    let sorted = hotels
      .filter(hotel =>
        (hotel.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hotel.city || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hotel.region || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    switch (sortOrder) {
      case "name":
        sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "priceAsc":
        sorted = sorted.sort((a, b) => a.price_gel - b.price_gel);
        break;
      case "priceDesc":
        sorted = sorted.sort((a, b) => b.price_gel - a.price_gel);
        break;
      case "starsAsc":
        sorted = sorted.sort((a, b) => (a.stars || 0) - (b.stars || 0));
        break;
      case "starsDesc":
        sorted = sorted.sort((a, b) => (b.stars || 0) - (a.stars || 0));
        break;
      default:
        sorted = sorted.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    }
    return sorted;
  }, [searchQuery, sortOrder, hotels]);

  function handleRandomHotel() {
    if (!hotels.length) return;
    const random = hotels[Math.floor(Math.random() * hotels.length)];
    router.push(`/${lang}/hotel/${random.id}`);
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8 md:py-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2">{t('title')}</h1>
          <p className="text-lg text-muted-foreground">{t('findYourPerfectStay')}</p>
        </motion.div>

        {/* Featured + Info + Ad Row - centered */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6 items-stretch">
          {/* Featured Hotel Card */}
          {featuredHotel && (
            <div className="w-full max-w-sm flex-shrink-0">
              <Card className="h-full border-2 border-purple-500 shadow-lg rounded-xl bg-gradient-to-br from-purple-900/70 to-purple-700/80 text-white transition-transform hover:scale-[1.025] hover:shadow-2xl duration-200">
                <CardContent className="p-4 flex flex-col gap-2 h-full justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <Hotel className="w-5 h-5 text-purple-200" />
                    <span className="inline-block bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full self-start">We Recommend</span>
                  </div>
                  <h2 className="text-lg font-bold mb-0.5">{featuredHotel.name}</h2>
                  <div className="flex items-center text-xs mb-0.5">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{featuredHotel.city}, {featuredHotel.region}</span>
                  </div>
                  <div className="flex items-center mb-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < featuredHotel.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs mb-0.5">{featuredHotel.address}</p>
                  <p className="text-base font-bold mb-0.5">{getPrice(featuredHotel)} <span className="text-xs font-normal">/ {t('night')}</span></p>
                  <Button asChild size="sm" className="w-full mt-2">
                    <Link href={`/${lang}/hotel/${featuredHotel.id}`}>{t('viewDetails')}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
          {/* Why Book With Us Card */}
          <div className="w-full max-w-sm flex-shrink-0">
            <Card className="h-full border-2 border-green-400 shadow-lg rounded-xl bg-gradient-to-br from-green-800/60 to-green-500/70 text-white transition-transform hover:scale-[1.025] hover:shadow-2xl duration-200">
              <CardContent className="p-4 flex flex-col gap-2 h-full justify-between">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-5 h-5 text-green-200" />
                  <span className="inline-block bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full self-start">Why Book With Us?</span>
                </div>
                <h2 className="text-base font-bold mb-0.5">Best Price Guarantee</h2>
                <p className="text-xs mb-1">Curated hotels, real reviews, and local support. Book with confidence and ease!</p>
                <div className="flex-1" />
                <Button asChild size="sm" className="w-full mt-2" variant="secondary">
                  <Link href={`/${lang}/about`}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Advertise Your Hotel Card */}
          <div className="w-full max-w-sm flex-shrink-0">
            <Card className="h-full border-2 border-blue-400 shadow-lg rounded-xl bg-gradient-to-br from-blue-800/60 to-blue-500/70 text-white transition-transform hover:scale-[1.025] hover:shadow-2xl duration-200">
              <CardContent className="p-4 flex flex-col gap-2 h-full justify-between">
                <div className="flex items-center gap-2 mb-1">
                  <Megaphone className="w-5 h-5 text-blue-200" />
                  <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full self-start">Advertise Your Hotel</span>
                </div>
                <h2 className="text-base font-bold mb-0.5">Want to advertise your hotel?</h2>
                <p className="text-xs mb-1">Contact us to promote your hotel and reach more guests with a custom ad!</p>
                <div className="flex-1" />
                <Button asChild size="sm" className="w-full mt-2">
                  <Link href={`/${lang}/contact`}>Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Search/Sort Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch">
          <div className="flex-1 flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Select onValueChange={setSortOrder} defaultValue={sortOrder}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t('sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">{t('sortByRating')}</SelectItem>
                  <SelectItem value="name">{t('sortByName')}</SelectItem>
                  <SelectItem value="priceAsc">{t('sortByPriceAsc' as any)}</SelectItem>
                  <SelectItem value="priceDesc">{t('sortByPriceDesc' as any)}</SelectItem>
                  <SelectItem value="starsAsc">{t('sortByStarsAsc' as any)}</SelectItem>
                  <SelectItem value="starsDesc">{t('sortByStarsDesc' as any)}</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleRandomHotel} variant="outline" className="h-10">Random Hotel</Button>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-lg text-muted-foreground">
            {t('foundHotels', filteredHotels.length)}
          </p>
        </div>
        {/* Hotel Grid */}
        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHotels.filter(h => !h.featured).map(hotel => (
              <div key={hotel.id}>
                <Card className="h-full flex flex-col">
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 flex-grow">{hotel.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{hotel.city}{hotel.region ? `, ${hotel.region}` : ""}</span>
                    </div>
                    <div className="flex items-center mb-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < hotel.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{hotel.address}</p>
                    <p className="text-2xl font-bold mb-4">{getPrice(hotel)} <span className="text-sm font-normal text-muted-foreground">/ {t('night')}</span></p>
                    <Button asChild className="w-full mt-auto">
                      <Link href={`/${lang}/hotel/${hotel.id}`}>{t('viewDetails')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Frown className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">{t('noHotelsFound')}</h2>
            <p className="text-muted-foreground">{t('adjustFilters')}</p>
          </div>
        )}
      </div>
    </div>
  )
}