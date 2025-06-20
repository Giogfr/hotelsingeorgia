"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/theme-toggle"
import { FloatingActionButton } from "@/components/floating-action-button"
import { UserNav } from "@/components/auth/user-nav"
import {
  Search,
  MapPin,
  Star,
  Utensils,
  Filter,
  Share2,
  Loader2,
  AlertCircle,
  TrendingUp,
  Award,
  Clock,
  Mountain,
  Users,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation, type Language } from "@/lib/translations"

// Placeholder restaurant data
const hardcodedRestaurants: Array<{
  id: string;
  name: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  type: string;
  notes?: string;
}> = [
  { id: "bakuriani-1", name: "Kokhta Lounge", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.753200, longitude: 43.536000, type: "European/Georgian", notes: "European/Georgian menu at ski-lift front" },
  { id: "bakuriani-2", name: "Café SkyLine", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.752400, longitude: 43.533600, type: "Cafe", notes: "Scenic views, soups & burgers" },
  { id: "bakuriani-3", name: "Cafe Mara", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.751600, longitude: 43.533200, type: "Cafe", notes: "Cozy café with Georgian dishes" },
  { id: "bakuriani-4", name: "De Novo Cafe", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.751900, longitude: 43.534200, type: "Cafe", notes: "Great morning coffee" },
  { id: "bakuriani-5", name: "Aspen Cafe", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.751700, longitude: 43.533900, type: "Cafe/Restaurant", notes: "Café & restaurant in one" },
  { id: "bakuriani-6", name: "Cafe №1", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.751800, longitude: 43.533500, type: "Cafe", notes: "Drinks & desserts spot" },
  { id: "bakuriani-7", name: "B Block Cafe", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.751900, longitude: 43.534000, type: "Cafe", notes: "Relaxed atmosphere" },
  { id: "bakuriani-8", name: "Borjomi Restaurant", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.751900, longitude: 43.534100, type: "Georgian", notes: "Lunch/dinner Georgian fare" },
  { id: "bakuriani-9", name: "Orange Cafe", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.751800, longitude: 43.533800, type: "Cafe", notes: "Cozy & comfortable spot" },
  { id: "bakuriani-10", name: "Anga Cafe", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.751900, longitude: 43.533700, type: "Cafe", notes: "Espresso & ice-cream drinks" },
  { id: "bakuriani-11", name: "Friends House", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.752000, longitude: 43.533900, type: "Cafe", notes: "Home-like atmosphere" },
  { id: "bakuriani-12", name: "Sardafi Cafe", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.752100, longitude: 43.534000, type: "Cafe/Bar", notes: "Georgian cuisine café-bar" },
  { id: "bakuriani-13", name: "Natali Cafe", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.752200, longitude: 43.533800, type: "Cafe", notes: "Fine-dining feel" },
  { id: "bakuriani-14", name: "Coffeein", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.752300, longitude: 43.533900, type: "Cafe", notes: "Artisanal coffee" },
  { id: "bakuriani-15", name: "Kari Bakuriani", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.753000, longitude: 43.534200, type: "Cafe", notes: "Local café near slopes" },
  { id: "bakuriani-16", name: "Mgzavruli Bistro", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.752000, longitude: 43.533500, type: "Bistro", notes: "Casual Georgian bistro" },
  { id: "bakuriani-17", name: "Mimino Restaurant", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.751900, longitude: 43.533100, type: "BBQ", notes: "Family-run BBQ & dolma" },
  { id: "bakuriani-18", name: "Taverna Mari", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.751800, longitude: 43.533200, type: "Tavern", notes: "Rustic interior, local favorite" },
  { id: "bakuriani-19", name: "Sushi Bakuriani", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.752700, longitude: 43.533900, type: "Sushi", notes: "Mountain sushi spot" },
  { id: "bakuriani-20", name: "Bermukha", city: "Bakuriani", region: "Samtskhe-Javakheti", latitude: 41.752800, longitude: 43.534000, type: "Georgian/European", notes: "Georgian & European fusion" },
  { id: "1", name: "Barbarestan", city: "Tbilisi", region: "Tbilisi", latitude: 41.6995, longitude: 44.7980, type: "Traditional Georgian" },
  { id: "2", name: "Shavi Lomi", city: "Tbilisi", region: "Tbilisi", latitude: 41.7021, longitude: 44.7946, type: "Georgian, Contemporary" },
  { id: "3", name: "Culinarium Khasheria", city: "Tbilisi", region: "Tbilisi", latitude: 41.6988, longitude: 44.8051, type: "Georgian, European Fusion" },
  { id: "4", name: "Cafe Littera", city: "Tbilisi", region: "Tbilisi", latitude: 41.6980, longitude: 44.8010, type: "Georgian, Fine Dining" },
  { id: "5", name: "Funicular Restaurant Complex", city: "Tbilisi", region: "Tbilisi", latitude: 41.7226, longitude: 44.8177, type: "Georgian, European" },
  { id: "6", name: "Mepubri", city: "Batumi", region: "Adjara", latitude: 41.6435, longitude: 41.6382, type: "Georgian, Seafood" },
  { id: "7", name: "Laguna", city: "Batumi", region: "Adjara", latitude: 41.6440, longitude: 41.6386, type: "Mediterranean, European" },
  { id: "8", name: "Piano Lounge Bar", city: "Batumi", region: "Adjara", latitude: 41.6377, longitude: 41.6383, type: "European, Bar" },
  { id: "9", name: "Phaeton", city: "Kutaisi", region: "Imereti", latitude: 42.2679, longitude: 42.7188, type: "Georgian, Caucasian" },
  { id: "10", name: "Salobie Bia", city: "Kutaisi", region: "Imereti", latitude: 42.2710, longitude: 42.7178, type: "Georgian, Traditional" },
  { id: "11", name: "Chveni Ezo", city: "Kutaisi", region: "Imereti", latitude: 42.2701, longitude: 42.7185, type: "Georgian" },
  { id: "12", name: "Rooms Hotel Kazbegi Restaurant", city: "Kazbegi", region: "Mtskheta-Mtianeti", latitude: 42.6550, longitude: 44.6339, type: "Georgian, International" },
  { id: "13", name: "Sheep's Head Restaurant", city: "Kazbegi", region: "Mtskheta-Mtianeti", latitude: 42.6573, longitude: 44.6318, type: "Georgian, Mountain Cuisine" },
  { id: "14", name: "Laila Restaurant", city: "Mestia", region: "Samegrelo-Zemo Svaneti", latitude: 43.0482, longitude: 42.7278, type: "Georgian, Mountain Cuisine" },
  { id: "15", name: "Cafe Kala", city: "Mestia", region: "Samegrelo-Zemo Svaneti", latitude: 43.0459, longitude: 42.7273, type: "Georgian, European" },
  { id: "16", name: "Red Fox Bar & Grill", city: "Sighnaghi", region: "Kakheti", latitude: 41.6185, longitude: 45.9563, type: "Georgian, European" },
  { id: "17", name: "Pheasant's Tears Winery & Restaurant", city: "Sighnaghi", region: "Kakheti", latitude: 41.6203, longitude: 45.9569, type: "Georgian, Wine Bar" },
  { id: "18", name: "Chashnagiri", city: "Telavi", region: "Kakheti", latitude: 41.9169, longitude: 45.4694, type: "Georgian, Wine Cellar" },
  { id: "19", name: "Tavaduri", city: "Telavi", region: "Kakheti", latitude: 41.9164, longitude: 45.4703, type: "Georgian, Traditional" },
  { id: "20", name: "Black Lion", city: "Borjomi", region: "Samtskhe-Javakheti", latitude: 41.8424, longitude: 43.3712, type: "Georgian, Caucasian" },
  { id: "21", name: "Gvirabi", city: "Borjomi", region: "Samtskhe-Javakheti", latitude: 41.8426, longitude: 43.3721, type: "Georgian, Traditional" },
  { id: "22", name: "Vinotel", city: "Sighnaghi", region: "Kakheti", latitude: 41.6189, longitude: 45.9593, type: "Georgian, Wine Bar" },
  { id: "23", name: "Sakhli #11", city: "Tbilisi", region: "Tbilisi", latitude: 41.7167, longitude: 44.7832, type: "Georgian, European Fusion" },
  { id: "24", name: "Keto and Kote", city: "Tbilisi", region: "Tbilisi", latitude: 41.6935, longitude: 44.7990, type: "Georgian, Fine Dining" },
  { id: "25", name: "Azarphesha", city: "Tbilisi", region: "Tbilisi", latitude: 41.6904, longitude: 44.7998, type: "Georgian, Contemporary" },
  { id: "26", name: "Azarphesha Wine Bar", city: "Tbilisi", region: "Tbilisi", latitude: 41.6903, longitude: 44.7998, type: "Georgian, Wine Bar" },
  { id: "27", name: "Café Gallery", city: "Tbilisi", region: "Tbilisi", latitude: 41.6960, longitude: 44.7940, type: "Georgian, European" },
  { id: "28", name: "Fahrenheit", city: "Batumi", region: "Adjara", latitude: 41.6395, longitude: 41.6303, type: "European, Grill" },
  { id: "29", name: "Marina's Cafe", city: "Batumi", region: "Adjara", latitude: 41.6419, longitude: 41.6339, type: "Georgian, Seafood" },
  { id: "30", name: "Ezo Restaurant", city: "Tbilisi", region: "Tbilisi", latitude: 41.6992, longitude: 44.7963, type: "Georgian, Contemporary" },
  { id: "31", name: "Cafe Gabriadze", city: "Tbilisi", region: "Tbilisi", latitude: 41.6947, longitude: 44.7902, type: "Georgian, European" },
  { id: "32", name: "Zakhar Zakharich", city: "Tbilisi", region: "Tbilisi", latitude: 41.7001, longitude: 44.7979, type: "Georgian, Caucasian" },
  { id: "33", name: "Puris Sakhli", city: "Tbilisi", region: "Tbilisi", latitude: 41.7020, longitude: 44.8005, type: "Georgian, Bakery" },
  { id: "34", name: "Palaty", city: "Tbilisi", region: "Tbilisi", latitude: 41.6971, longitude: 44.7993, type: "Georgian, Traditional" },
  { id: "35", name: "Tabla", city: "Tbilisi", region: "Tbilisi", latitude: 41.6992, longitude: 44.7959, type: "Georgian, European Fusion" },
  { id: "36", name: "Ezo", city: "Tbilisi", region: "Tbilisi", latitude: 41.6993, longitude: 44.7975, type: "Georgian, Contemporary" },
  { id: "37", name: "Sakhli #11", city: "Tbilisi", region: "Tbilisi", latitude: 41.7157, longitude: 44.7845, type: "Georgian, European Fusion" },
  { id: "38", name: "Funicular Restaurant Complex", city: "Tbilisi", region: "Tbilisi", latitude: 41.7226, longitude: 44.8177, type: "Georgian, European" },
  { id: "39", name: "Tavaduri", city: "Telavi", region: "Kakheti", latitude: 41.9164, longitude: 45.4703, type: "Georgian, Traditional" },
  { id: "40", name: "Chashnagiri", city: "Telavi", region: "Kakheti", latitude: 41.9169, longitude: 45.4694, type: "Georgian, Wine Cellar" },
  { id: "41", name: "Old Telavi", city: "Telavi", region: "Kakheti", latitude: 41.9161, longitude: 45.4690, type: "Georgian" },
  { id: "42", name: "Pheasant's Tears Winery & Restaurant", city: "Sighnaghi", region: "Kakheti", latitude: 41.6203, longitude: 45.9569, type: "Georgian, Wine Bar" },
  { id: "43", name: "Red Fox Bar & Grill", city: "Sighnaghi", region: "Kakheti", latitude: 41.6185, longitude: 45.9563, type: "Georgian, European" },
  { id: "44", name: "Old Town Wine Cellar", city: "Sighnaghi", region: "Kakheti", latitude: 41.6200, longitude: 45.9580, type: "Georgian, Wine Bar" },
  { id: "45", name: "Laguna", city: "Batumi", region: "Adjara", latitude: 41.6440, longitude: 41.6386, type: "Mediterranean, European" },
  { id: "46", name: "Funicular Batumi", city: "Batumi", region: "Adjara", latitude: 41.6503, longitude: 41.6273, type: "Georgian, European" },
  { id: "47", name: "Piano Lounge Bar", city: "Batumi", region: "Adjara", latitude: 41.6377, longitude: 41.6383, type: "European, Bar" },
  { id: "48", name: "Marina's Cafe", city: "Batumi", region: "Adjara", latitude: 41.6419, longitude: 41.6339, type: "Georgian, Seafood" },
  { id: "49", name: "Phaeton", city: "Kutaisi", region: "Imereti", latitude: 42.2679, longitude: 42.7188, type: "Georgian, Caucasian" },
  { id: "50", name: "Salobie Bia", city: "Kutaisi", region: "Imereti", latitude: 42.2710, longitude: 42.7178, type: "Georgian, Traditional" },
]

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

// Add fun facts array for restaurants
const restaurantFunFacts = [
  "Khinkali, Georgia's dumpling, is traditionally eaten with your hands — bite it, sip the broth inside, then eat the rest.",
  "Khachapuri is Georgia's iconic cheese-filled bread — the Adjarian version looks like a boat and includes egg and butter on top.",
  "Each region in Georgia has its own type of khachapuri — including Imeretian, Megrelian, and Rachuli styles.",
  "Sulguni is a brined Georgian cheese, often used in khachapuri and eaten fresh or smoked.",
  "Churchkhela is a natural Georgian candy made from grape juice and nuts — often called \"Georgian Snickers.\"",
  "Pkhali is a vegetarian dish made from minced vegetables, walnuts, garlic, and herbs — often served as a cold appetizer.",
  "Georgian cuisine uses walnuts in an unusually large variety of dishes — both sweet and savory.",
  "Mtsvadi is Georgian shashlik — grilled meat, often made over grapevine wood for extra flavor.",
  "Tkemali is a sour plum sauce, served with meat and potatoes — made from wild Georgian plums.",
  "Ajika is a spicy red or green chili paste from western Georgia, used as a condiment or marinade.",
  "Badrijani Nigvzit is eggplant rolled with walnut-garlic paste and topped with pomegranate seeds.",
  "Georgian feasts are called 'Supra' and are led by a toastmaster called a \"Tamada.\"",
  "A traditional Supra can include over 20 different dishes, all brought out continuously during the meal.",
  "Every meal in Georgia includes generous amounts of fresh herbs like coriander, tarragon, and parsley.",
  "Georgian wine is often made in qvevri — large clay vessels buried underground.",
  "Georgia is considered the birthplace of wine, with winemaking traditions over 8,000 years old.",
  "Satsivi is a cold walnut sauce often served with turkey or chicken, especially during winter holidays.",
  "Chakapuli is a spring stew made from lamb or veal, tarragon, and green sour plums.",
  "Most Georgian bread is baked in a tone — a deep circular clay oven similar to a tandoor.",
  "Shotis puri is a canoe-shaped bread baked against the sides of the tone oven.",
  "Pelamushi is a dessert made from grape juice and corn flour, served cold like pudding.",
  "The Imeruli khachapuri is circular and contains cheese only inside, unlike the open Adjaruli version.",
  "Georgian cuisine often blends European, Middle Eastern, and Central Asian flavors.",
  "Jonjoli is a pickled flower bud found in traditional Georgian salads and sides.",
  "Almost every family in rural Georgia produces its own wine and keeps a personal wine cellar.",
  "Georgia has over 500 native grape varieties — more than almost any country in the world.",
  "Traditional Georgian meals include both meat and vegetarian options, reflecting a rich agricultural tradition.",
  "Kvass is a traditional fermented drink made from bread, mildly alcoholic and very refreshing.",
  "Chvishtari is a cheesy cornbread from the Svaneti region, often eaten warm with butter.",
  "Elarji is a thick cornmeal dish mixed with stretchy sulguni cheese — a Megrelian favorite.",
  "Matsoni is a fermented milk product similar to yogurt — often eaten plain or with honey and nuts.",
  "In many Georgian villages, food is still cooked in wood-fired ovens or open hearths.",
  "Traditional Georgian hospitality means guests are treated like gifts from God — no one leaves hungry."
];

export default function RestaurantsPage() {
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'ka';
    }
    return 'ka';
  })
  const { t } = useTranslation(selectedLanguage)
  const [restaurants, setRestaurants] = useState(hardcodedRestaurants)
  const [sortBy, setSortBy] = useState("rating")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCity = !selectedCity || restaurant.city === selectedCity;
    const matchesRegion = selectedRegion === "all" || !selectedRegion || restaurant.region === selectedRegion;
    const matchesType = !selectedType || restaurant.type.toLowerCase().includes(selectedType.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesRegion && matchesType && matchesSearch;
  })

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => a.name.localeCompare(b.name))

  const handleSearch = () => {
    const resultsSection = document.getElementById("search-results")
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const clearFilters = () => {
    setSelectedCity("")
    setSelectedRegion("")
    setSelectedType("")
    setSearchQuery("")
    setSortBy("rating")
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
    localStorage.setItem('language', selectedLanguage)
  }, [selectedLanguage])

  return (
    <div className="min-h-screen bg-background transition-colors">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/placeholder-logo.png" alt="GeorgiaStay Logo" width={32} height={32} />
              <span className="text-2xl font-bold text-primary">GeorgiaStay</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Select value={selectedLanguage} onValueChange={(val) => setSelectedLanguage(val as Language)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    <span className="flex items-center gap-2">
                      <span>🇺🇸</span>
                      <span className="text-sm">English</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="ka">
                    <span className="flex items-center gap-2">
                      <span>🇬🇪</span>
                      <span className="text-sm">ქართული</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="es">
                    <span className="flex items-center gap-2">
                      <span>🇪🇸</span>
                      <span className="text-sm">Español</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <ThemeToggle />
              <UserNav />
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 mt-6 mb-4">
        <Link href="/" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
      </div>
      <section className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-950 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in slide-in-from-bottom-4 duration-1000">
              {t("discoverRestaurants")}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 animate-in slide-in-from-bottom-4 duration-1000 delay-200">
              {t("findBestPlacesToEat")}
            </p>
          </div>
          {/* Fun Facts Section */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
              <h3 className="text-lg sm:text-2xl font-bold mb-4 text-center">🍇 Fun Facts about Georgian Cuisine</h3>
              <ul className="list-disc list-inside space-y-2 max-h-64 overflow-y-auto text-sm sm:text-base">
                {restaurantFunFacts.map((fact, idx) => (
                  <li key={idx}>{fact}</li>
                ))}
              </ul>
            </div>
          </div>
          <Card className="max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-1000 delay-400">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">{t("where")}</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("searchRestaurantsPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSearch()
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <Utensils className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="georgian">Georgian</SelectItem>
                      <SelectItem value="european">European</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">{t("region") || "Region"}</label>
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
                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full h-10 bg-primary hover:bg-primary/90">
                    <Search className="mr-2 h-4 w-4" />
                    {t("search")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="search-results" className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
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
                <div className="space-y-3">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <Utensils className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="georgian">Georgian</SelectItem>
                      <SelectItem value="european">European</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/40 rounded-lg p-3 text-center mt-6">
                  <div className="text-xs text-muted-foreground mb-1">Feeling adventurous?</div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full font-semibold rounded-lg shadow hover:scale-105 transition-all"
                    onClick={() => {
                      const random = restaurants[Math.floor(Math.random() * restaurants.length)];
                      if (random) window.scrollTo({ top: 0, behavior: "smooth" });
                      setSearchQuery(random?.name || "");
                    }}
                  >
                    Suggest a Random Restaurant
                  </Button>
                </div>
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {mounted ? `${sortedRestaurants.length} restaurants found` : ""}
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
            <div className="space-y-6">
              {mounted ? (
                sortedRestaurants.length > 0 ? (
                  sortedRestaurants.map((restaurant, index) => (
                    <Card
                      key={restaurant.id}
                      className={
                        `hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group border border-muted bg-card/80 ` +
                        `animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[${index * 60}ms]`
                      }
                    >
                      <div className="md:col-span-2 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{restaurant.name}</h3>
                            <div className="flex items-center text-muted-foreground mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{restaurant.city}, {restaurant.region}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ', ' + restaurant.city)}`}
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
                                    title: restaurant.name,
                                    text: `${restaurant.city}, ${restaurant.region}`,
                                    url: `${window.location.origin}/restaurants/${restaurant.id}`,
                                  })
                                } catch (err) {
                                  console.log("Error sharing:", err)
                                }
                              } else {
                                navigator.clipboard.writeText(`${window.location.origin}/restaurants/${restaurant.id}`)
                                alert("Restaurant link copied to clipboard!")
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
                  <div className="text-center py-12">
                    <Mountain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No restaurants found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters or search.</p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </div>
                )
              ) : (
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="animate-pulse h-32 bg-muted/30" />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 dark:bg-black text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Mountain className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  GeorgiaStay
                </span>
              </div>
              <p className="text-gray-300 dark:text-gray-300">Discover the best restaurants in Georgia.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Popular Destinations</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="#search-results" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Tbilisi Restaurants
                  </Link>
                </li>
                <li>
                  <Link href="#search-results" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Batumi Restaurants
                  </Link>
                </li>
                <li>
                  <Link href="#search-results" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Kutaisi Restaurants
                  </Link>
                </li>
                <li>
                  <Link href="#search-results" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Mestia Restaurants
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/help" className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#contact" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="#about" scroll={false} className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 dark:hover:text-purple-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-300">
            <p>&copy; 2024 GeorgiaStay. All rights reserved.</p>
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