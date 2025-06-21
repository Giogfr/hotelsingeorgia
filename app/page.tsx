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
  Download,
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
    <div className="relative min-h-screen w-full">
      {/* Background Image and Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/georgia-background.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-white">
        <div className="text-center mb-8 md:mb-12 mt-20">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl mb-4 text-shadow-lg">
            GeorgiaStay
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-4 md:mb-8">
            What are you looking for?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-xs sm:max-w-md justify-center items-center mx-auto mb-6">
          <Link
            href="/hotels"
            className="flex items-center justify-center gap-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-white/30 active:scale-95 transition-all w-full"
          >
            <Building2 className="w-6 h-6" />
            <span>Hotels</span>
          </Link>
          <Link
            href="/restaurants"
            className="flex items-center justify-center gap-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-white/30 active:scale-95 transition-all w-full"
          >
            <Utensils className="w-6 h-6" />
            <span>Restaurants</span>
          </Link>
        </div>
        
        <div className="w-full max-w-xs sm:max-w-md mx-auto mb-10">
          <a
            href="/GeorgiaStay.apk"
            download
            className="flex items-center justify-center gap-3 rounded-xl bg-primary/80 backdrop-blur-sm border border-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary active:scale-95 transition-all w-full"
            aria-label="Download the GeorgiaStay mobile app"
          >
            <Download className="w-6 h-6" />
            <span>Download App</span>
          </a>
        </div>
        
        <div className="w-full max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white text-center text-shadow-md">Popular Cities</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 justify-center items-center mx-auto">
            {featuredCities.map((city) => {
              const count = hardcodedHotels.filter(h => h.city === city.name).length;
              return (
                <Link
                  href={city.link}
                  key={city.name}
                  className="block rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 hover:border-white/50 transition-all w-full transition-transform duration-150 text-center overflow-hidden"
                >
                  <div className="h-24 sm:h-32 w-full overflow-hidden">
                    <img src={city.image} alt={city.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col items-center gap-2 py-3">
                    <MapPin className="w-6 h-6" />
                    <span className="font-semibold text-lg">{city.name}</span>
                    <span className="font-bold text-primary-foreground text-sm">{count} hotels</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
  