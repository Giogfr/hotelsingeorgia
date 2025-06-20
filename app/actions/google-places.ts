"use server"

import { GooglePlacesService, type ProcessedHotel } from "@/lib/google-places"

const MAJOR_CITIES = ["Tbilisi", "Batumi", "Kutaisi", "Telavi", "Mtskheta"]

// fetch hotels for all major Georgian cities
export async function fetchAllGeorgiaHotels(): Promise<ProcessedHotel[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) return []

  const service = new GooglePlacesService(apiKey)
  const all: ProcessedHotel[] = []

  for (const city of MAJOR_CITIES) {
    try {
      const gh = await service.searchHotels(city)
      const processed = gh.map((h) => service.processHotelData(h, city))
      all.push(...processed)
      // rudimentary rate-limit-friendly delay
      await new Promise((r) => setTimeout(r, 700))
    } catch (err) {
      console.error("Google Places error for", city, err)
    }
  }
  return all
}

// fetch hotels for one city
export async function fetchHotelsByCity(city: string): Promise<ProcessedHotel[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey || !city) return []

  try {
    const service = new GooglePlacesService(apiKey)
    const gh = await service.searchHotels(city)
    return gh.map((h) => service.processHotelData(h, city))
  } catch (err) {
    console.error("Google Places city error", err)
    return []
  }
}
