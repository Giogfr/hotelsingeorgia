export interface FoursquareHotel {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  categories: string[]
  fsq_url: string
}

export async function fetchFoursquareHotels(city: string): Promise<FoursquareHotel[]> {
  const apiKey = process.env.FOURSQUARE_API_KEY || ""
  if (!apiKey) return []

  // City coordinates for Georgia
  const cityCoords: Record<string, { lat: number; lng: number }> = {
    Tbilisi: { lat: 41.7151, lng: 44.8271 },
    Batumi: { lat: 41.6168, lng: 41.6367 },
    Kutaisi: { lat: 42.2679, lng: 42.7064 },
    Telavi: { lat: 41.9167, lng: 45.4667 },
    Mtskheta: { lat: 41.8458, lng: 44.7207 },
  }
  const coords = cityCoords[city] || cityCoords["Tbilisi"]

  const url = `https://api.foursquare.com/v3/places/search?ll=${coords.lat},${coords.lng}&radius=20000&categories=19014&limit=20`

  const res = await fetch(url, {
    headers: {
      Authorization: apiKey,
      Accept: "application/json",
    },
  })
  if (!res.ok) return []
  const data = await res.json()
  return (data.results || []).map((place: any) => ({
    id: place.fsq_id,
    name: place.name,
    address: place.location?.formatted_address || place.location?.address || city,
    lat: place.geocodes?.main?.latitude,
    lng: place.geocodes?.main?.longitude,
    categories: (place.categories || []).map((c: any) => c.name),
    fsq_url: place.link || `https://foursquare.com/v/${place.fsq_id}`,
  }))
} 