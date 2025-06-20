"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/theme-toggle"
import { HotelCardSkeleton } from "@/components/hotel-card-skeleton"
import { FloatingActionButton } from "@/components/floating-action-button"
import { UserNav } from "@/components/auth/user-nav"
import {
  Search,
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Waves,
  Mountain,
  CalendarIcon,
  Users,
  Filter,
  Heart,
  Share2,
  Loader2,
  AlertCircle,
  TrendingUp,
  Award,
  Clock,
  ChevronDown,
  Building2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { type ProcessedHotel, georgianCitiesWithCoords } from "@/lib/google-places"
import { fetchAllGeorgiaHotels, fetchHotelsByCity } from "@/app/actions/google-places"
import { useTranslation, type Language } from "@/lib/translations"
import { hardcodedHotels } from '@/lib/hardcoded-hotels'
import RotatingText from './RotatingText'
import StarBorder from './StarBorder'

const georgianCities = georgianCitiesWithCoords.map((city) => city.name)

const georgianRegions = [
  "Tbilisi",
  "Adjara",
  "Guria",
  "Imereti",
  "Kakheti",
  "Kvemo Kartli",
  "Mtskheta-Mtianeti",
  "Racha-Lechkhumi",
  "Samegrelo-Zemo Svaneti",
  "Samtskhe-Javakheti",
  "Shida Kartli",
]

const HOTELS_PER_PAGE = 6

const featuredCities = [
  { name: "Tbilisi", link: "/hotels?city=Tbilisi", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" },
  { name: "Batumi", link: "/hotels?city=Batumi", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" },
  { name: "Kutaisi", link: "/hotels?city=Kutaisi", image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80" },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center" style={{ minHeight: '100vh' }}>
      <div className="background-georgia-blur pointer-events-none select-none">
        Nestled at the crossroads of Europe and Asia, Georgia is a land of stunning natural beauty, rich traditions, and ancient history. From the towering peaks of the Caucasus Mountains to the sun-soaked beaches of the Black Sea coast, Georgia's diverse landscapes are as breathtaking as they are unique. Its capital, Tbilisi, is a vibrant mix of old and new—historic architecture, cobblestone streets, and sulfur baths stand side by side with modern cafes and art galleries.
        Georgia is one of the world's oldest wine-producing regions, with a winemaking tradition that dates back over 8,000 years. The country is known for its warm hospitality—visitors are treated like family, and meals are shared with generous amounts of food, laughter, and heartfelt toasts. Georgian cuisine is famous for its bold flavors, rich spices, and iconic dishes like khachapuri, khinkali, and lobio.
        The Georgian language, with its unique script, is a symbol of the nation's identity and resilience. Georgia has a deep cultural heritage, filled with folklore, music, dance, and religious traditions. Ancient churches dot the countryside, and UNESCO World Heritage Sites like Mtskheta and the Gelati Monastery tell the story of Georgia's spiritual journey.
        Despite its small size, Georgia offers a rich mosaic of experiences: ski resorts in Gudauri, wine tours in Kakheti, ancient cave cities like Uplistsikhe, and subtropical forests in Samegrelo. It is a country where past and present coexist beautifully—a timeless place where every traveler can find a piece of inspiration, adventure, and heartfelt connection.
      </div>
      <div className="text-center mb-8 md:mb-12 mt-40">
        {mounted ? (
          <RotatingText
            texts={["Welcome to GeorgiaStay", "Book Hotels", "Find Restaurants", "Discover Georgia"]}
            mainClassName="font-bold text-lg sm:text-xl md:text-2xl inline-block mb-2"
            staggerFrom={"last"}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            staggerDuration={0.025}
            splitLevelClassName=""
            transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
            rotationInterval={2000}
            loop={true}
            auto={true}
          />
        ) : (
          <span className="font-bold text-lg sm:text-xl md:text-2xl inline-block mb-2">
            Welcome to GeorgiaStay
          </span>
        )}
        <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-4 md:mb-8">
          <span className="animated-underline">What are you looking for?</span>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full max-w-xs sm:max-w-xl justify-center items-center mx-auto mb-4">
        <StarBorder as="div" color="#a78bfa" speed="1.5s" thickness={0} className="w-full sm:w-auto mb-2">
          <Link
            href="/hotels"
            className="block rounded-xl border border-muted bg-card px-3 py-2 sm:px-8 sm:py-6 text-sm sm:text-xl font-semibold text-foreground shadow-md hover:shadow-xl active:scale-95 hover:border-primary transition-all min-w-[90px] sm:min-w-[180px] transition-transform duration-150 text-center w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-1 sm:gap-3">
              <Building2 className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground" />
              <span>Hotels</span>
            </span>
          </Link>
        </StarBorder>
        <StarBorder as="div" color="#a78bfa" speed="1.5s" thickness={0} className="w-full sm:w-auto mb-2">
          <Link
            href="/restaurants"
            className="block rounded-xl border border-muted bg-card px-3 py-2 sm:px-8 sm:py-6 text-sm sm:text-xl font-semibold text-foreground shadow-md hover:shadow-xl active:scale-95 hover:border-primary transition-all min-w-[90px] sm:min-w-[180px] transition-transform duration-150 text-center w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-1 sm:gap-3">
              <Utensils className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground" />
              <span>Restaurants</span>
            </span>
          </Link>
        </StarBorder>
      </div>
      <div className="about-georgia-animate max-w-2xl mx-auto mb-8 text-center text-base sm:text-lg md:text-xl text-muted-foreground font-medium">
        Georgia is a country at the crossroads of Europe and Asia, known for its stunning Caucasus mountains, ancient wine tradition, and vibrant hospitality.
      </div>
      <div className="flex justify-center mt-6 mb-4 w-full max-w-xs sm:max-w-xl mx-auto">
        <StarBorder as="div" color="#a78bfa" speed="1.5s" thickness={0} className="w-full sm:w-auto mb-2">
          <a
            href="https://tp.media/r?marker=641673&trs=427893&p=8626&u=https%3A%2F%2Ftrip.com&campaign_id=121"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-muted bg-card px-3 py-2 sm:px-8 sm:py-6 text-sm sm:text-xl font-semibold text-foreground shadow-md hover:shadow-xl active:scale-95 hover:border-primary transition-all min-w-[90px] sm:min-w-[180px] transition-transform duration-150 text-center w-full sm:w-auto"
            aria-label="Book hotels in Georgia and worldwide on Trip.com (affiliate link)"
          >
            <span className="flex items-center justify-center gap-1 sm:gap-3">
              <Building2 className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground" />
              <span>Book hotels worldwide on Trip.com</span>
            </span>
          </a>
        </StarBorder>
      </div>
      <div className="mt-10 sm:mt-16 w-full max-w-3xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary text-center">Popular Cities</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 justify-center items-center mx-auto">
          {featuredCities.map((city) => {
            const count = hardcodedHotels.filter(h => h.city === city.name).length;
            return (
              <StarBorder as="div" className="h-full star-border-thick" key={city.name}>
                <Link
                  href={city.link}
                  className="block rounded-xl border border-muted bg-card shadow-md hover:shadow-xl hover:scale-105 active:scale-95 hover:border-primary transition-all min-w-[100px] sm:min-w-[180px] max-w-xs w-full transition-transform duration-150 text-center overflow-hidden p-0 h-full"
                >
                  <div className="h-20 xs:h-24 sm:h-40 w-full overflow-hidden">
                    <img src={city.image} alt={city.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col items-center gap-1 xs:gap-2 sm:gap-3 py-2 xs:py-3 sm:py-6">
                    <MapPin className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-muted-foreground" />
                    <span className="font-semibold text-sm xs:text-base sm:text-lg">{city.name}</span>
                    <span className="font-bold text-primary text-xs xs:text-sm sm:text-base">{count} hotels</span>
                  </div>
                </Link>
              </StarBorder>
            );
          })}
        </div>
      </div>
    </div>
  );
}
  