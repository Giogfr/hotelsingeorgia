"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import RotatingText from "@/app/RotatingText"
import { ArrowRight, Download, Hotel, Utensils, Star, MapPin } from "lucide-react"
import { useHomeTranslation } from "@/lib/translations"
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function HomePageClient({ cityImages, lang, mixedCityItems }: { cityImages: any[], lang: string, mixedCityItems?: any[] }) {
    const t = useHomeTranslation(lang as any);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstall, setShowInstall] = useState(false);
    const [shuffledCityItems, setShuffledCityItems] = useState(mixedCityItems || []);
    const router = useRouter();

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstall(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    useEffect(() => {
        // Shuffle the mixedCityItems on each render for randomness
        if (mixedCityItems) {
            const shuffled = mixedCityItems.map(city => ({
                ...city,
                items: city.items ? shuffleArray([...city.items]) : [],
            }));
            setShuffledCityItems(shuffled);
        }
    }, [mixedCityItems]);

    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getRandomItem(type: 'hotel' | 'restaurant') {
        const allItems = (shuffledCityItems || []).flatMap(city => city.items || []).filter(item => item.type === type);
        if (allItems.length === 0) return null;
        const random = allItems[Math.floor(Math.random() * allItems.length)];
        return random;
    }

    function handleRandom(type: 'hotel' | 'restaurant') {
        const item = getRandomItem(type);
        if (!item) return;
        if (type === 'hotel') {
            router.push(`/${lang}/hotel/${item.id}`);
        } else {
            router.push(`/${lang}/restaurants?highlight=${item.id}`);
        }
    }

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
        } else {
            alert('To install the app, use your browser menu: Add to Home Screen.');
        }
    };

    const faqItems = [
        {
            question: t("faq_q1"),
            answer: t("faq_a1")
        },
        {
            question: t("faq_q2"),
            answer: t("faq_a2")
        },
        {
            question: t("faq_q3"),
            answer: t("faq_a3")
        },
    ]

    return (
        <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
            {/* Bakuriani background image with overlay */}
            <div className="absolute inset-0 -z-10">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Bakuriani" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-black/60" />
            </div>
            <main className="flex-1">
                {/* Bakuriani Hero Section */}
                <section className="container mx-auto px-4 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col items-start text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]"
                            >
                                Bakuriani
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg md:text-xl text-blue-200 mb-8 max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                            >
                                Discover Beautiful Bakuriani — Georgia's premier ski and mountain resort. Find your perfect stay, enjoy snowy adventures, and explore the heart of the Caucasus.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto items-start max-w-full"
                            >
                                <Button asChild size="lg" className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white">
                                    <Link href={`/${lang}/hotels`}>Browse Hotels <ArrowRight className="w-4 h-4 ml-2" /></Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-blue-200 text-blue-100 hover:bg-blue-900/30">
                                    <Link href={`/${lang}/restaurants`}>Restaurants</Link>
                                </Button>
                                <Button size="lg" className="w-full sm:w-auto" disabled>
                                    Coming Soon <Download className="w-4 h-4 ml-2" />
                                </Button>
                                <Button asChild size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white ml-0 sm:ml-0">
                                    <a href="https://www.dravionai.casa/" target="_blank" rel="noopener noreferrer">
                                        Visit DravionAI
                                    </a>
                                </Button>
                            </motion.div>
                            <div className="mt-4 max-w-xl">
                                <span className="flex items-center text-xs text-blue-100 opacity-70 italic mb-1">
                                    <span role="img" aria-label="link" className="mr-1">🔗</span> Partnered with <a href="https://www.dravionai.casa/" target="_blank" rel="noopener noreferrer" className="ml-1 underline hover:text-blue-200">DravionAI</a>
                                </span>
                                <p className="text-xs text-blue-100 opacity-50 italic leading-relaxed mt-1">
                                    I'm proud to announce my partnership with DravionAI — a cutting-edge platform at the intersection of AI, culture, and creativity. DravionAI brings a new level of visual storytelling, blending advanced generative AI with a strong aesthetic vision. Whether you're into AI art, unique digital experiences, or just want to see what the future of creativity looks like — this is the place to be.<br/>
                                    Check them out and support innovation: <a href="https://www.dravionai.casa/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">dravionai.casa</a><br/>
                                    Let's build the future of digital art together. ❄️🏔️
                                </p>
                            </div>
                        </div>
                        {/* Removed city cards grid */}
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-muted/40 py-16 md:py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("why_choose_us")}</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">{t("why_choose_us_description")}</p>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                    <Hotel className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{t("curated_hotels")}</h3>
                                <p className="text-muted-foreground">{t("curated_hotels_description")}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                    <Utensils className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{t("local_restaurants")}</h3>
                                <p className="text-muted-foreground">{t("local_restaurants_description")}</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                    <MapPin className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{t("explore_everywhere")}</h3>
                                <p className="text-muted-foreground">{t("explore_everywhere_description")}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 md:py-24 px-4 max-w-3xl mx-auto w-full">
                    <h2 className="text-3xl font-bold text-center mb-12">{t("faq")}</h2>
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