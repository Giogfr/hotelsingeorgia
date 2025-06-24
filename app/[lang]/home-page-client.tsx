"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import RotatingText from "@/app/RotatingText"
import { ArrowRight, Download, Hotel, Utensils, Star, MapPin } from "lucide-react"
import { useHomeTranslation } from "@/lib/translations"
import { useEffect, useState } from 'react';

export function HomePageClient({ cityImages, lang }: { cityImages: any[], lang: string }) {
    const t = useHomeTranslation(lang as any);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstall(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

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
                                {t("discover_beautiful_georgia")}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg"
                            >
                                {t("find_perfect_stay")}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto items-start max-w-full"
                            >
                                <Button asChild size="lg" className="w-full sm:w-auto">
                                    <Link href={`/${lang}/hotels`}>{t("browse_hotels")} <ArrowRight className="w-4 h-4 ml-2" /></Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                                    <Link href={`/${lang}/restaurants`}>{t("restaurants")}</Link>
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
                                <span className="flex items-center text-xs text-muted-foreground opacity-50 italic mb-1">
                                    <span role="img" aria-label="link" className="mr-1">🔗</span> Partnered with <a href="https://www.dravionai.casa/" target="_blank" rel="noopener noreferrer" className="ml-1 underline hover:text-teal-600">DravionAI</a>
                                </span>
                                <p className="text-xs text-muted-foreground opacity-40 italic leading-relaxed mt-1">
                                    I'm proud to announce my partnership with DravionAI — a cutting-edge platform at the intersection of AI, culture, and creativity. DravionAI brings a new level of visual storytelling, blending advanced generative AI with a strong aesthetic vision. Whether you're into AI art, unique digital experiences, or just want to see what the future of creativity looks like — this is the place to be.<br/>
                                    Check them out and support innovation: <a href="https://www.dravionai.casa/" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-600">dravionai.casa</a><br/>
                                    Let's build the future of digital art together. 🚀
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {cityImages.map((city, index) => (
                                <motion.div
                                    key={city.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 * index }}
                                >
                                    <div className="bg-muted/50 rounded-lg p-6 h-full flex flex-col justify-center items-center text-center hover:bg-muted transition-colors">
                                        <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                                        <p className="text-sm text-muted-foreground">{city.hotels} hotels</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
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