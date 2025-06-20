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
  ArrowLeft,
  HelpCircle,
  Building2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { type ProcessedHotel, georgianCitiesWithCoords } from "@/lib/google-places"
import { fetchAllGeorgiaHotels, fetchHotelsByCity } from "@/app/actions/google-places"
import { useTranslation, type Language } from "@/lib/translations"
import { hardcodedHotels } from '@/lib/hardcoded-hotels'
import HotelsLoading from './loading'

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

const popularCities = [
  { name: "Tbilisi", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" },
  { name: "Batumi", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" },
  { name: "Kutaisi", image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80" },
];

const HOTELS_PER_PAGE = 6

// Fun facts with emojis
const funFacts = [
  "⛪ Georgia is one of the oldest Christian countries, adopting Christianity in 337 AD!",
  "🔤 The Georgian alphabet is one of only 14 unique scripts in the world!",
  "🇬🇪 Georgians call their country 'Sakartvelo', not 'Georgia'.",
  "🍷 Georgia is the birthplace of wine—over 8,000 years of winemaking!",
  "🍇 Georgia is home to some of the oldest winemaking traditions in the world—over 8,000 years of history!",
  "🏛️ Tbilisi has been destroyed and rebuilt over 29 times!",
  "🏆 Georgia has 3 UNESCO World Heritage Sites: Mtskheta, Gelati, and Upper Svaneti.",
  "⛰️ The Caucasus Mountains in Georgia are taller than the Alps!",
  "🎶 Georgian polyphonic singing is UNESCO-listed as a world treasure.",
  "🧑‍🎤 Stalin was born in Gori, Georgia—there's a museum for him!",
  "🏞️ Vardzia is a cave city with 13 levels and 600+ rooms carved into a cliff.",
  "⛷️🏖️ You can ski in the morning and swim in the Black Sea by evening!",
  "✍️ The Georgian language has no capital letters and is written in a flowing style.",
  "🍽️ A Georgian 'supra' feast features dozens of dishes and a poetic toastmaster!",
  "♨️ Tbilisi's sulfur baths have soothed visitors for centuries—including Pushkin!",
  "🧀 Khachapuri is so important, Georgia tracks its price with a 'Khachapuri Index'!",
  "👨‍👩‍👧‍👦 Georgian surnames often end in '-shvili' (east) or '-dze' (west).",
  "🏰 There are over 12,000 historic monuments in Georgia!",
  "💃 The national dance of Georgia is famous for high jumps and sword moves!",
  "🏔️ Ushguli is one of Europe's highest inhabited villages.",
  "🍞 Georgian bread (shotis puri) is baked in deep clay ovens called 'tone'.",
  "🍇 Georgia has over 500 grape varieties—wine paradise!",
  "🏢 Tbilisi police stations are made of glass to symbolize transparency.",
  "🗡️ The Mother Georgia statue holds a sword for enemies and wine for guests!",
  "📜 Ancient Georgian scripts date back to the 5th century BC.",
  "🍇 Kakheti is famous for wine and the autumn Rtveli grape harvest festival.",
  "🤗 Georgian hospitality is legendary—guests are 'gifts from God'!",
  "🏖️ Ureki's Black Sea sands are magnetic and believed to heal.",
  "⛪ Some monasteries, like Katskhi Pillar, are built atop massive rock columns!",
  "🌍 Georgia straddles Europe and Asia, but identifies as European.",
  "🏠 In Georgia, travelers are often invited into homes without asking!",
  "🎬 Georgia is a top filming destination for international movies.",
  "🙏 Ancient and modern religious rituals are practiced side-by-side in Georgia.",
]

export default function HotelsPage() {
  const [delayDone, setDelayDone] = useState(false)
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en")
  const { t } = useTranslation(selectedLanguage)
  const [hotels, setHotels] = useState(hardcodedHotels)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState("rating")
  const [selectedStars, setSelectedStars] = useState("")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [funFactIndex, setFunFactIndex] = useState(0)
  const [animate, setAnimate] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDelayDone(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const savedFavorites = localStorage.getItem("hotel-favorites")
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
  }, [])

  const toggleFavorite = (hotelId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(hotelId)) {
      newFavorites.delete(hotelId)
    } else {
      newFavorites.add(hotelId)
    }
    setFavorites(newFavorites)
    localStorage.setItem("hotel-favorites", JSON.stringify(Array.from(newFavorites)))
  }

  const filteredHotels = hotels.filter((hotel) => {
    const matchesCity = !selectedCity || hotel.city === selectedCity;
    const matchesRegion = selectedRegion === "all" || !selectedRegion || hotel.region === selectedRegion;
    const matchesStars = selectedStars === "all" || !selectedStars || hotel.stars === Number(selectedStars);
    const matchesSearch =
      !searchQuery ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesRegion && matchesStars && matchesSearch;
  })

  const sortedHotels = [...filteredHotels].sort((a, b) => a.name.localeCompare(b.name))

  const handleSearch = () => {
    const resultsSection = document.getElementById("search-results")
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const clearFilters = () => {
    setSelectedCity("")
    setSelectedRegion("")
    setSearchQuery("")
    setSortBy("rating")
    setSelectedStars("")
  }

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => {
        const resultsSection = document.getElementById("search-results")
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [searchQuery])

  useEffect(() => {
    if (selectedCity || selectedRegion) {
      const timer = setTimeout(() => {
        const resultsSection = document.getElementById("search-results")
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [selectedCity, selectedRegion])

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true)
      setTimeout(() => {
        setFunFactIndex((prev) => (prev + 1) % funFacts.length)
        setAnimate(false)
      }, 400) // animation duration
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  if (!delayDone) return <HotelsLoading />;

  return (
    <div className="min-h-screen bg-background transition-colors">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 mr-1 text-primary hidden sm:inline" />
              <Image src="/placeholder-logo.png" alt="GeorgiaStay Logo" width={32} height={32} />
              <span className="text-2xl font-bold text-primary">GeorgiaStay</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/hotels" className="text-sm font-medium hover:text-primary transition-colors">
                {t("hotels")}
              </Link>
              <Link href="/restaurants" className="text-sm font-medium hover:text-primary transition-colors">
                Restaurants
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                {t("about")}
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                {t("contact")}
              </Link>
            </nav>
            <button className="md:hidden p-2" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center space-x-2 md:space-x-4">
              <a
                href="https://www.donationalerts.com/r/gio00"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform text-xs md:text-sm"
              >
                <Heart className="w-4 h-4 text-white animate-pulse" />
                Donate
              </a>
              <Select value={selectedLanguage} onValueChange={(val) => setSelectedLanguage(val as Language)}>
                <SelectTrigger className="w-24 md:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    <span className="flex items-center gap-2">
                      <span>🇺🇸</span>
                      <span className="text-xs md:text-sm">English</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="ka">
                    <span className="flex items-center gap-2">
                      <span>🇬🇪</span>
                      <span className="text-xs md:text-sm">ქართული</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="es">
                    <span className="flex items-center gap-2">
                      <span>🇪🇸</span>
                      <span className="text-xs md:text-sm">Español</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
          {mobileNavOpen && (
            <nav className="md:hidden flex flex-col space-y-2 mt-2 bg-background rounded-lg shadow p-4">
              <Link href="/hotels" className="text-base font-medium hover:text-primary transition-colors" onClick={() => setMobileNavOpen(false)}>{t("hotels")}</Link>
              <Link href="/restaurants" className="text-base font-medium hover:text-primary transition-colors" onClick={() => setMobileNavOpen(false)}>Restaurants</Link>
              <Link href="/about" className="text-base font-medium hover:text-primary transition-colors" onClick={() => setMobileNavOpen(false)}>{t("about")}</Link>
              <Link href="/contact" className="text-base font-medium hover:text-primary transition-colors" onClick={() => setMobileNavOpen(false)}>{t("contact")}</Link>
            </nav>
          )}
        </div>
      </header>
      <section className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative w-full">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
                alt="Georgia landscape"
                className="w-full h-[340px] md:h-[420px] object-cover object-center blur-sm scale-105"
                style={{ filter: 'blur(4px) brightness(0.7)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-[340px] md:h-[420px] text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">{t("heroTitle")}</h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8 text-white drop-shadow">{t("heroSubtitle")}</p>
            </div>
          </div>
          <Card className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-400">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:grid md:grid-cols-3 gap-4 items-stretch">
                <div className="md:col-span-1 flex flex-col justify-center mb-4 md:mb-0">
                  <label className="text-sm font-medium text-muted-foreground">{t("where")}</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-base py-2 h-10"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSearch()
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-end mt-4">
                    <Button onClick={handleSearch} className="w-full h-10 bg-primary hover:bg-primary/90 text-base px-4 py-2">
                      <Search className="mr-2 h-4 w-4" />
                      {t("search")}
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-2 flex items-center justify-center flex-col">
                  <div className={`w-full max-w-md h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-4 flex flex-col items-center gap-2 transition-all duration-400 ${animate ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                    style={{ minHeight: '7rem' }}
                  >
                    <HelpCircle className="w-8 h-8 text-white mb-1 animate-bounce" />
                    <div className="text-lg font-bold text-white mb-1">Did you know?</div>
                    <div className="text-white/90 text-center text-sm" style={{ minHeight: '2.5rem' }}>{funFacts[funFactIndex]}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="container mx-auto px-2 md:px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Popular Cities</h2>
        <p className="text-muted-foreground mb-6 md:mb-8">Discover Georgia by exploring its top cities</p>
        <div className="flex gap-4 md:gap-8 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          {popularCities.map((city) => {
            const count = hotels.filter(h => h.city === city.name).length;
            return (
              <Link
                key={city.name}
                href={`/hotels?city=${encodeURIComponent(city.name)}`}
                className="block rounded-xl border border-muted bg-card shadow-md hover:shadow-xl hover:scale-105 active:scale-95 hover:border-primary transition-all min-w-[220px] transition-transform duration-150 text-center overflow-hidden"
              >
                <div className="h-40 w-full overflow-hidden">
                  <img src={city.image} alt={city.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex flex-col items-center gap-3 py-6">
                  <MapPin className="w-7 h-7 text-muted-foreground" />
                  <span className="font-semibold text-lg">{city.name}</span>
                  <span className="font-bold text-primary">{count} hotels</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section id="search-results" className="container mx-auto px-2 md:px-4 py-6 md:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 md:gap-8">
          <div className="lg:col-span-1 order-2 lg:order-1 mb-6 lg:mb-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  {t("filters")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 bg-gradient-to-b from-purple-950/30 to-blue-950/10 rounded-xl">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Region</label>
                  <Select value={selectedRegion} onValueChange={val => setSelectedRegion(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      {georgianRegions.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-3 text-center mt-6">
                  <div className="text-xs text-muted-foreground mb-1">Feeling adventurous?</div>
                  <Button size="sm" variant="secondary" onClick={() => {
                    const random = hotels[Math.floor(Math.random() * hotels.length)];
                    if (random) window.scrollTo({ top: 0, behavior: "smooth" });
                    setSearchQuery(random?.name || "");
                  }}>Suggest a Random Hotel</Button>
                </div>
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  {t("clearFilters")}
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {mounted ? `${sortedHotels.length} ${t("hotelsFound")}` : ""}
              </h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4 md:space-y-6">
              {mounted ? (
                sortedHotels.map((hotel, index) => (
                  <Card
                    key={hotel.id}
                    className={
                      `hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group border border-muted bg-card/80 ` +
                      `animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[${index * 60}ms]`
                    }
                  >
                    <div className="md:col-span-2 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{hotel.name}</h3>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{hotel.city}, {hotel.region}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < hotel.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ', ' + hotel.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="w-full mb-2">View on Google Maps</Button>
                        </a>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary hover:text-primary-foreground"
                          onClick={async () => {
                            if (navigator.share) {
                              try {
                                await navigator.share({
                                  title: hotel.name,
                                  text: `${hotel.city}, ${hotel.region}`,
                                  url: `${window.location.origin}/hotel/${hotel.id}`,
                                })
                              } catch (err) {
                                console.log("Error sharing:", err)
                              }
                            } else {
                              navigator.clipboard.writeText(`${window.location.origin}/hotel/${hotel.id}`)
                              alert("Hotel link copied to clipboard!")
                            }
                          }}
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          {t("share")}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                Array.from({ length: 3 }).map((_, index) => <HotelCardSkeleton key={index} />)
              )}
            </div>
            {sortedHotels.length === 0 && mounted && (
              <div className="text-center py-12">
                <Mountain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t("noHotelsFound")}</h3>
                <p className="text-muted-foreground mb-4">{t("adjustFilters")}</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="flex justify-center my-10">
        <a
          href="https://tp.media/r?marker=641673&trs=427893&p=8626&u=https%3A%2F%2Ftrip.com&campaign_id=121"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white text-lg sm:text-2xl font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 border-none focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2"
          aria-label="Book hotels in Georgia and worldwide on Trip.com (affiliate link)"
        >
          <Building2 className="w-7 h-7 text-white drop-shadow" />
          Book hotels worldwide on Trip.com
        </a>
      </div>
      <footer className="bg-gray-900 dark:bg-black text-white py-8 md:py-12 mt-12 md:mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Mountain className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  GeorgiaStay
                </span>
              </div>
              <p className="text-gray-300 dark:text-gray-300">{t("footerDescription")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">{t("popularDestinations")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="#search-results" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Tbilisi Hotels
                  </Link>
                </li>
                <li>
                  <Link href="#search-results" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Batumi Hotels
                  </Link>
                </li>
                <li>
                  <Link href="#search-results" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Kutaisi Hotels
                  </Link>
                </li>
                <li>
                  <Link href="#search-results" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Mtskheta Hotels
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">{t("support")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/help" className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    {t("helpCenter")}
                  </Link>
                </li>
                <li>
                  <Link href="#contact" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    {t("contactUs")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    {t("bookingPolicy")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    {t("cancellation")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">{t("company")}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="#about" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    {t("careers")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    {t("privacyPolicy")}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    {t("termsOfService")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-6 md:my-8 bg-gray-700" />
          <div className="text-center text-gray-300 text-xs md:text-base">
            <p>&copy; 2024 GeorgiaStay. {t("allRightsReserved")}.</p>
          </div>
        </div>
      </footer>
      <FloatingActionButton />
      {showBackToTop && (
        <Button
          className="fixed bottom-8 right-8 z-50 animate-in fade-in bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to Top"
        >
          ↑
        </Button>
      )}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
} 