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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 text-primary">Welcome to GeorgiaStay</h1>
        <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-4 md:mb-8">What are you looking for?</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full max-w-xl justify-center items-center">
        <Link href="/hotels" className="block rounded-xl border border-muted bg-card px-6 py-4 sm:px-12 sm:py-8 text-lg sm:text-2xl font-semibold text-foreground shadow-md hover:shadow-xl hover:scale-105 active:scale-95 hover:border-primary transition-all min-w-[160px] sm:min-w-[220px] transition-transform duration-150 text-center w-full sm:w-auto">
          <span className="flex items-center justify-center gap-2 sm:gap-4">
            <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground" />
            <span>Hotels</span>
          </span>
        </Link>
        <Link href="/restaurants" className="block rounded-xl border border-muted bg-card px-6 py-4 sm:px-12 sm:py-8 text-lg sm:text-2xl font-semibold text-foreground shadow-md hover:shadow-xl hover:scale-105 active:scale-95 hover:border-primary transition-all min-w-[160px] sm:min-w-[220px] transition-transform duration-150 text-center w-full sm:w-auto">
          <span className="flex items-center justify-center gap-2 sm:gap-4">
            <Utensils className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground" />
            <span>Restaurants</span>
          </span>
        </Link>
      </div>
      {/* Trip.com Affiliate Button - clean, matches Hotels/Restaurants */}
      <div className="flex justify-center mt-6 mb-4 w-full max-w-xl">
        <a
          href="https://tp.media/r?marker=641673&trs=427893&p=8626&u=https%3A%2F%2Ftrip.com&campaign_id=121"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-muted bg-card px-4 py-4 sm:px-12 sm:py-8 text-base sm:text-2xl font-semibold text-foreground shadow-md hover:shadow-xl hover:scale-105 active:scale-95 hover:border-primary transition-all w-full text-center"
          aria-label="Book hotels in Georgia and worldwide on Trip.com (affiliate link)"
        >
          Book hotels in Georgia and worldwide on Trip.com
        </a>
      </div>
      <div className="mt-10 sm:mt-16 w-full max-w-3xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary text-center">Popular Cities</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 justify-center">
          {featuredCities.map((city) => {
            const count = hardcodedHotels.filter(h => h.city === city.name).length;
            return (
              <Link
                key={city.name}
                href={city.link}
                className="block rounded-xl border border-muted bg-card shadow-md hover:shadow-xl hover:scale-105 active:scale-95 hover:border-primary transition-all min-w-[140px] sm:min-w-[180px] transition-transform duration-150 text-center overflow-hidden"
              >
                <div className="h-28 sm:h-40 w-full overflow-hidden">
                  <img src={city.image} alt={city.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex flex-col items-center gap-2 sm:gap-3 py-3 sm:py-6">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground" />
                  <span className="font-semibold text-base sm:text-lg">{city.name}</span>
                  <span className="font-bold text-primary text-sm sm:text-base">{count} hotels</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
