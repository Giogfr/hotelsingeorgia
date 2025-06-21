"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Building2,
  Utensils,
  Download,
  MapPin,
} from "lucide-react"
import RotatingText from './RotatingText'

// Data for the right-side image cards
const featuredCities = [
  { name: "Tbilisi", image: "https://images.unsplash.com/photo-1562818128-092a8b945c22?auto=format&fit=crop&w=600&q=80", hotels: 125 },
  { name: "Batumi", image: "https://images.unsplash.com/photo-1598582962316-56637e67175c?auto=format&fit=crop&w=600&q=80", hotels: 88 },
  { name: "Kutaisi", image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80", hotels: 42 },
  { name: "Gudauri", image: "https://images.unsplash.com/photo-1516368812228-062e49c7543d?auto=format&fit=crop&w=600&q=80", hotels: 76 }
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image and Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/georgia-background.png')", filter: 'blur(4px) brightness(0.6)' }}
      />
      
      {/* Content Grid */}
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center min-h-screen p-8 max-w-7xl mx-auto">
        
        {/* Left Column */}
        <div className="flex flex-col items-start text-left text-white animate-fade-in-right">
          <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl mb-4 text-shadow-lg">
            GeorgiaStay
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl opacity-90 mb-6 md:mb-8 max-w-xl">
             <RotatingText 
               texts={[
                 "Discover the heart of the Caucasus.",
                 "Book the finest hotels and restaurants.",
                 "Explore Tbilisi, Batumi, and beyond.",
                 "Your Georgian adventure starts here."
               ]} 
             />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md items-start mb-6">
            <Link
              href="/hotels"
              className="flex items-center justify-center gap-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-white/30 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
            >
              <Building2 className="w-6 h-6" />
              <span>Hotels</span>
            </Link>
            <Link
              href="/restaurants"
              className="flex items-center justify-center gap-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-white/30 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
            >
              <Utensils className="w-6 h-6" />
              <span>Restaurants</span>
            </Link>
          </div>
        
          <div className="w-full max-w-md">
            <a
              href="/GeorgiaStay.apk"
              download
              className="flex items-center justify-center gap-3 rounded-xl bg-primary/90 backdrop-blur-sm border border-primary px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-primary hover:scale-105 active:scale-95 transition-all w-full sm:w-auto"
              aria-label="Download the GeorgiaStay mobile app"
            >
              <Download className="w-6 h-6" />
              <span>Download App</span>
            </a>
          </div>
        </div>

        {/* Right Column - Image Cards */}
        <div className="hidden md:grid grid-cols-2 gap-6 animate-fade-in-left">
          {featuredCities.map((city, index) => (
            <div key={index} className="group relative rounded-2xl overflow-hidden shadow-xl border border-white/20 transform hover:scale-105 transition-all duration-300">
              <img src={city.image} alt={city.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-bold text-xl flex items-center gap-2"><MapPin className="w-5 h-5" />{city.name}</h3>
                <p className="text-sm opacity-90">{city.hotels} hotels available</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
  