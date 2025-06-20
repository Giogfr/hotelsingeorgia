"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Award, Clock, Heart, Star } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

export default function AboutPage() {
  const [language, setLanguage] = useState<"en" | "ka" | "es">("en")
  const { t } = useTranslation(language)

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: t("localExpertise"),
      description: t("localExpertiseText"),
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: t("bestPrices"),
      description: t("bestPricesText"),
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: t("customerSupport"),
      description: t("customerSupportText"),
    },
  ]

  const stats = [
    { number: "500+", label: "Hotels" },
    { number: "50+", label: "Cities" },
    { number: "10,000+", label: "Happy Customers" },
    { number: "4.8", label: "Average Rating" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">GeorgiaStay</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                {t("hotels")}
              </Link>
              <Link href="/about" className="text-sm font-medium text-primary">
                {t("about")}
              </Link>
              <Link href="/help" className="text-sm font-medium hover:text-primary">
                {t("helpCenter")}
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary">
                {t("contact")}
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "ka" | "es")}
                className="px-3 py-1 border rounded"
              >
                <option value="en">🇺🇸 English</option>
                <option value="ka">🇬🇪 ქართული</option>
                <option value="es">🇪🇸 Español</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("aboutTitle")}</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto">{t("aboutDescription")}</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("ourMission")}</h2>
              <p className="text-lg text-muted-foreground">{t("missionText")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t("whyChooseUs")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Heart className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Authentic Georgian Experience</h3>
                    <p className="text-muted-foreground">
                      We showcase the real Georgia - from traditional guesthouses to luxury resorts, ensuring you
                      experience authentic Georgian hospitality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Star className="h-6 w-6 text-yellow-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Verified Reviews</h3>
                    <p className="text-muted-foreground">
                      All our hotel reviews come from real guests who have stayed at the properties, giving you honest
                      insights for your decision.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Local Team</h3>
                    <p className="text-muted-foreground">
                      Our team consists of local Georgian experts who know the best places to stay and can provide
                      insider recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-4">Contact Our Team</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">Email</Badge>
                    <Link href="mailto:gioworkingemail@gmail.com" className="text-primary hover:underline">
                      gioworkingemail@gmail.com
                    </Link>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">Instagram</Badge>
                    <Link href="https://instagram.com/Tetri_101" className="text-primary hover:underline">
                      @Tetri_101
                    </Link>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Have questions about Georgian hotels or need personalized recommendations? We're here to help!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
