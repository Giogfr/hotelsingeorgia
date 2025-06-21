import type { NextApiRequest, NextApiResponse } from 'next'

export interface AmadeusHotel {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  [key: string]: any
}

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com'

async function getAmadeusAccessToken(): Promise<string> {
  const res = await fetch(`${AMADEUS_BASE_URL}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: AMADEUS_API_KEY!,
      client_secret: AMADEUS_API_SECRET!,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error_description || 'Failed to get Amadeus access token')
  return data.access_token
}

export async function fetchAmadeusHotels(city: string = 'Tbilisi'): Promise<AmadeusHotel[]> {
  const token = await getAmadeusAccessToken()
  // Get city code for Amadeus (Tbilisi = TBS)
  let cityCode = 'TBS'
  if (city && city.toLowerCase() !== 'tbilisi') {
    // Optionally, fetch city code dynamically here
  }
  const res = await fetch(`${AMADEUS_BASE_URL}/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.errors?.[0]?.detail || 'Failed to fetch hotels from Amadeus')
  // Map Amadeus data to AmadeusHotel[]
  return (data.data || []).map((hotel: any) => ({
    id: hotel.hotelId,
    name: hotel.name?.content || hotel.name,
    address: hotel.address?.lines?.join(', ') || hotel.address?.line1 || '',
    lat: hotel.geoCode?.latitude,
    lng: hotel.geoCode?.longitude,
    ...hotel,
  }))
}   