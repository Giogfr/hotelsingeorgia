"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Instagram, Send, MapPin } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/translations"

export default function ContactPage() {
  const [language, setLanguage] = useState<"en" | "ka" | "es">("en")
  const { t } = useTranslation(language)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create mailto link with form data
    const mailtoLink = `mailto:gioworkingemail@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )}`
    window.location.href = mailtoLink
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
              <Link href="/about" className="text-sm font-medium hover:text-primary">
                {t("about")}
              </Link>
              <Link href="/help" className="text-sm font-medium hover:text-primary">
                {t("helpCenter")}
              </Link>
              <Link href="/contact" className="text-sm font-medium text-primary">
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
                <option value="es">��🇸 Español</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t("contactTitle")}</h1>
            <p className="text-xl text-muted-foreground">{t("contactSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    {t("email")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="mailto:gioworkingemail@gmail.com" className="text-primary hover:underline text-lg">
                    gioworkingemail@gmail.com
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Instagram className="h-5 w-5" />
                    {t("instagram")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href="https://instagram.com/Tetri_101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-lg"
                  >
                    @Tetri_101
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Tbilisi, Georgia</p>
                </CardContent>
              </Card>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond to emails within 24 hours. For urgent matters, reach out via Instagram for faster
                  response.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>{t("sendMessage")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("yourName")}</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">{t("yourEmail")}</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("subject")}</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Hotel booking inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t("message")}</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder={t("messagePlaceholder")}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    {t("sendMessage")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
