"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, HelpCircle, MessageCircle, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Language } from "@/lib/translations"

export function HelpPageClient({ t, lang }: { t: any, lang: Language }) {
  const [searchQuery, setSearchQuery] = useState("")

  const faqData = [
    {
      question: t.bookingFaq,
      answer: t.bookingAnswer,
    },
    {
      question: t.cancelFaq,
      answer: t.cancelAnswer,
    },
    {
      question: t.paymentFaq,
      answer: t.paymentAnswer,
    },
    {
      question: t.supportFaq,
      answer: t.supportAnswer,
    },
    {
      question: "What documents do I need for hotel check-in in Georgia?",
      answer:
        "For Georgian hotels, you'll need a valid passport or ID card. International visitors should have their passport with them. Some hotels may also require a credit card for incidentals.",
    },
    {
      question: "Is it safe to travel to Georgia?",
      answer:
        "Georgia is generally considered a very safe country for tourists. The crime rate is low, and Georgians are known for their hospitality. However, always exercise normal travel precautions.",
    },
    {
      question: "What's the best time to visit Georgia?",
      answer:
        "Georgia is beautiful year-round. Spring (April-June) and autumn (September-November) offer mild weather. Summer is great for beach destinations like Batumi, while winter is perfect for skiing in Gudauri.",
    },
    {
      question: "Do hotels in Georgia accept international credit cards?",
      answer:
        "Most hotels in major cities accept international credit cards (Visa, Mastercard). However, it's recommended to have some Georgian Lari (GEL) cash for smaller establishments.",
    },
  ]

  const filteredFAQ = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t.helpTitle}</h1>
          <p className="text-xl text-muted-foreground">{t.helpSubtitle}</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <HelpCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Find answers to common questions about booking and staying in Georgian hotels.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our support team via Instagram for quick assistance.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://instagram.com/Tetri_101" target="_blank" rel="noopener noreferrer">
                  Chat Now
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Send us an email for detailed support and inquiries.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:gioworkingemail@gmail.com">Send Email</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t.faqTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQ.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFAQ.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                  Clear Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/contact">{t.contactUs}</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://instagram.com/Tetri_101" target="_blank" rel="noopener noreferrer">
                Message on Instagram
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 