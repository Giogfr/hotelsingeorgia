"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import RotatingText from "@/app/RotatingText"
import { ArrowRight, Download, Hotel, Utensils, Star, MapPin } from "lucide-react"

export function HomePageClient({ cityImages, faqItems }: { cityImages: any[], faqItems: any[] }) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col items-start text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                            >
                                Discover Beautiful Georgia
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg"
                            >
                                <RotatingText
                                    texts={[
                                        "Find your perfect stay.",
                                        "Discover amazing hotels.",
                                        "Book your next adventure.",
                                        "Explore the heart of the Caucasus.",
                                    ]}
                                    rotationInterval={2500}
                                />
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                            >
                                <Button asChild size="lg" className="w-full sm:w-auto">
                                    <Link href="/hotels">Browse Hotels <ArrowRight className="w-4 h-4 ml-2" /></Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                                    <Link href="/restaurants">Restaurants</Link>
                                </Button>
                                <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto">
                                    <a href="https://github.com/Giogfr/hotelsingeorgia/releases/latest/download/GeorgiaStay.apk">
                                        Download App <Download className="w-4 h-4 ml-2" />
                                    </a>
                                </Button>
                            </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {cityImages.map((city, index) => (
                                <motion.div
                                    key={city.name}
                                    className="relative rounded-lg overflow-hidden shadow-lg group h-64"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 * index }}
                                >
                                    <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                                        <h3 className="text-white font-bold text-lg">{city.name}</h3>
                                        <p className="text-white/80 text-sm">{city.hotels} hotels</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-muted/40 py-16 md:py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose GeorgiaStay?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">We provide the best tools to help you discover and book your perfect Georgian getaway.</p>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                    <Hotel className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Curated Hotels</h3>
                                <p className="text-muted-foreground">Hand-picked hotels in the most popular destinations.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                    <Utensils className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Local Restaurants</h3>
                                <p className="text-muted-foreground">Discover authentic Georgian cuisine and the best local eateries.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                    <MapPin className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Explore Everywhere</h3>
                                <p className="text-muted-foreground">From city centers to remote mountain villages, find your adventure.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 md:py-24 px-4 max-w-3xl mx-auto w-full">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((item, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={index}>
                                <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base pt-2">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
            </main>
        </div>
    )
} 