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

  const galleryImages = [
    "https://images.unsplash.com/photo-1562818128-092a8b945c22?auto=format&fit=crop&w=600&q=80", // Tbilisi
    "https://images.unsplash.com/photo-1598582962316-56637e67175c?auto=format&fit=crop&w=600&q=80", // Batumi
    "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80", // Mountains
    "https://images.unsplash.com/photo-1516368812228-062e49c7543d?auto=format&fit=crop&w=600&q=80"  // Food
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image and Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/georgia-background.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-2 items-center min-h-screen p-8 text-white">
        {/* Left Column */}
        <div className="flex flex-col items-start text-left md:pr-10">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl mb-4 text-shadow-lg">
            GeorgiaStay
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-6 md:mb-8 max-w-xl">
            Discover the heart of the Caucasus. Find and book the finest hotels and restaurants in Georgia, from the vibrant streets of Tbilisi to the serene mountains of Svaneti.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md items-start mb-6">
            <Link
              href="/hotels"
              className="flex items-center justify-center gap-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-white/30 active:scale-95 transition-all w-full sm:w-auto"
            >
              <Building2 className="w-6 h-6" />
              <span>Hotels</span>
            </Link>
            <Link
              href="/restaurants"
              className="flex items-center justify-center gap-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-white/30 active:scale-95 transition-all w-full sm:w-auto"
            >
              <Utensils className="w-6 h-6" />
              <span>Restaurants</span>
            </Link>
          </div>
        
          <div className="w-full max-w-md">
            <a
              href="https://github.com/Giogfr/hotelsingeorgia/releases/latest/download/GeorgiaStay.apk"
              className="flex items-center justify-center gap-3 rounded-xl bg-primary/80 backdrop-blur-sm border border-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary active:scale-95 transition-all w-full sm:w-auto"
              aria-label="Download the GeorgiaStay mobile app"
            >
              <Download className="w-6 h-6" />
              <span>Download App</span>
            </a>
          </div>
        </div>

        {/* Right Column - Image Gallery */}
        <div className="hidden md:grid grid-cols-2 gap-4">
          {galleryImages.map((src, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img src={src} alt={`Georgia Gallery Image ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <a
        href="https://trip.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 text-white text-xs opacity-70 hover:opacity-100 transition-opacity z-20"
      >
        Book hotels via Trip.com
      </a>
    </div>
  );
}
  