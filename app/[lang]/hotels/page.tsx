"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Search, Frown } from "lucide-react"
import { hardcodedHotels } from '@/lib/hardcoded-hotels'
import Link from "next/link"
import { motion } from "framer-motion"

export async function generateStaticParams() {
  const languages = ['en', 'es', 'sr', 'ru', 'ka'];
  return languages.map(lang => ({ lang }));
}

export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("rating")

  const filteredHotels = useMemo(() => {
    return hardcodedHotels
      .filter(hotel =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.region.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "name") {
          return a.name.localeCompare(b.name)
        }
        return (b.stars || 0) - (a.stars || 0)
      })
  }, [searchQuery, sortOrder])

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8 md:py-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2">Explore Hotels in Georgia</h1>
          <p className="text-lg text-muted-foreground">Find your perfect stay from our curated list of top-rated hotels.</p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="sticky top-[60px] z-40 bg-background/80 backdrop-blur-sm rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by hotel, city, or region..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select onValueChange={setSortOrder} defaultValue={sortOrder}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Sort by rating</SelectItem>
                <SelectItem value="name">Sort by name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hotels Grid */}
        {filteredHotels.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden group h-full flex flex-col">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={hotel.photo} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2 flex-grow">{hotel.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{hotel.city}, {hotel.region}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < hotel.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <Button asChild className="w-full mt-auto">
                      <Link href={`/hotel/${hotel.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <Frown className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Hotels Found</h2>
            <p className="text-muted-foreground">Try adjusting your search query or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
} 