"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Waves,
  Mountain,
  Heart,
  Share2,
  Calendar,
  Users,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HotelDetailsClient({ hotel: initialHotel }: { hotel: any }) {
  const router = useRouter()
  const [hotel, setHotel] = useState<any>(initialHotel)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (!hotel) {
      // Redirect to home if no hotel data is provided, which can happen if the ID is invalid client-side
      router.replace("/")
    }
  }, [hotel, router])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: hotel.name,
          text: hotel.types?.join(", "),
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "parking":
        return <Car className="w-4 h-4" />
      case "restaurant":
        return <Utensils className="w-4 h-4" />
      case "spa":
        return <Coffee className="w-4 h-4" />
      case "pool":
        return <Waves className="w-4 h-4" />
      default:
        return <Mountain className="w-4 h-4" />
    }
  }

  if (!hotel) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">GeorgiaStay</span>
            </Link>
            <Button variant="outline" asChild>
              <Link href="/">Back to Search</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-8">
                  <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
            <span>{hotel.city}, {hotel.region}</span>
          </div>
          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < hotel.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ', ' + hotel.city)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full mb-2">View on Google Maps</Button>
          </a>
        </div>
      </div>
    </div>
  )
} 