// Google Places API integration for real hotel data

export interface GooglePlaceHotel {
  place_id: string
  name: string
  vicinity: string
  rating?: number
  user_ratings_total?: number
  photos?: Array<{
    photo_reference: string
    height: number
    width: number
  }>
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  price_level?: number
  types: string[]
}

export interface ProcessedHotel {
  id: string
  name: string
  location: string
  region: string
  price: number
  rating: number
  reviews: number
  image: string
  amenities: string[]
  description: string
  placeId: string
  coordinates: {
    lat: number
    lng: number
  }
}

// Georgian cities with their coordinates for Google Places search
export const georgianCitiesWithCoords = [
  { name: "Tbilisi", lat: 41.7151, lng: 44.8271, region: "Tbilisi" },
  { name: "Batumi", lat: 41.6168, lng: 41.6367, region: "Adjara" },
  { name: "Kutaisi", lat: 42.2679, lng: 42.7064, region: "Imereti" },
  { name: "Rustavi", lat: 41.5492, lng: 44.9939, region: "Kvemo Kartli" },
  { name: "Gori", lat: 41.9847, lng: 44.1086, region: "Shida Kartli" },
  { name: "Zugdidi", lat: 42.5088, lng: 41.8709, region: "Samegrelo-Zemo Svaneti" },
  { name: "Poti", lat: 42.1505, lng: 41.6711, region: "Samegrelo-Zemo Svaneti" },
  { name: "Kobuleti", lat: 41.8167, lng: 41.7833, region: "Adjara" },
  { name: "Telavi", lat: 41.9167, lng: 45.4667, region: "Kakheti" },
  { name: "Akhaltsikhe", lat: 41.6394, lng: 42.9786, region: "Samtskhe-Javakheti" },
  { name: "Mtskheta", lat: 41.8458, lng: 44.7207, region: "Mtskheta-Mtianeti" },
]

export class GooglePlacesService {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async searchHotels(city: string, radius = 10000): Promise<GooglePlaceHotel[]> {
    const cityData = georgianCitiesWithCoords.find((c) => c.name === city)
    if (!cityData) {
      throw new Error(`City ${city} not found`)
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${cityData.lat},${cityData.lng}&radius=${radius}&type=lodging&key=${this.apiKey}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.status !== "OK") {
        throw new Error(`Google Places API error: ${data.status}`)
      }

      return data.results
    } catch (error) {
      console.error("Error fetching hotels:", error)
      return []
    }
  }

  async getHotelDetails(placeId: string): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number,formatted_address,website,photos,reviews,price_level&key=${this.apiKey}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      return data.result
    } catch (error) {
      console.error("Error fetching hotel details:", error)
      return null
    }
  }

  getPhotoUrl(photoReference: string, maxWidth = 400): string {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${this.apiKey}`
  }

  processHotelData(googleHotel: GooglePlaceHotel, cityName: string): ProcessedHotel {
    const cityData = georgianCitiesWithCoords.find((c) => c.name === cityName)
    const region = cityData?.region || "Unknown"

    // Estimate price based on price_level (Google's 0-4 scale)
    const estimatePrice = (priceLevel?: number): number => {
      if (!priceLevel) return 100
      const priceMap = { 0: 50, 1: 80, 2: 120, 3: 180, 4: 300 }
      return priceMap[priceLevel as keyof typeof priceMap] || 100
    }

    // Generate amenities based on hotel types and common features
    const generateAmenities = (types: string[]): string[] => {
      const amenities = ["Wifi"] // Most hotels have wifi

      if (types.includes("spa")) amenities.push("Spa")
      if (types.includes("restaurant") || types.includes("food")) amenities.push("Restaurant")
      if (types.includes("gym")) amenities.push("Gym")
      if (types.includes("parking")) amenities.push("Parking")

      // Add some common amenities randomly for variety
      const commonAmenities = ["Pool", "Room Service", "Concierge", "Business Center"]
      const randomAmenities = commonAmenities.filter(() => Math.random() > 0.6)
      amenities.push(...randomAmenities)

      return amenities
    }
w
    return {
      id: googleHotel.place_id,
      name: googleHotel.name,
      location: cityName,
      region: region,
      price: estimatePrice(googleHotel.price_level),
      rating: googleHotel.rating || 4.0,
      reviews: googleHotel.user_ratings_total || 0,
      image: googleHotel.photos?.[0]
        ? this.getPhotoUrl(googleHotel.photos[0].photo_reference)
        : "/placeholder.svg?height=300&width=400",
      amenities: generateAmenities(googleHotel.types),
      description: `Real hotel in ${cityName}, ${region} - Data from Google Places`,
      placeId: googleHotel.place_id,
      coordinates: {
        lat: googleHotel.geometry.location.lat,
        lng: googleHotel.geometry.location.lng,
      },
    }
  }
}

// Hook for using Google Places in React components
export const useGooglePlaces = (apiKey: string) => {
  const placesService = new GooglePlacesService(apiKey)

  const searchHotelsInCity = async (city: string): Promise<ProcessedHotel[]> => {
    try {
      const googleHotels = await placesService.searchHotels(city)
      return googleHotels.map((hotel) => placesService.processHotelData(hotel, city))
    } catch (error) {
      console.error("Error searching hotels:", error)
      return []
    }
  }

  const searchHotelsInAllCities = async (): Promise<ProcessedHotel[]> => {
    const allHotels: ProcessedHotel[] = []

    // Search in major Georgian cities
    const majorCities = ["Tbilisi", "Batumi", "Kutaisi", "Telavi", "Mtskheta"]

    for (const city of majorCities) {
      try {
        const cityHotels = await searchHotelsInCity(city)
        allHotels.push(...cityHotels)
        // Add delay to respect API rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error fetching hotels for ${city}:`, error)
      }
    }

    return allHotels
  }

  return {
    searchHotelsInCity,
    searchHotelsInAllCities,
    placesService,
  }
}
