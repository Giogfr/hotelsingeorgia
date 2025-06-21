"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Mail, Instagram } from "lucide-react"
import Link from "next/link"

// Simple SVG for TikTok
const TikTokIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8.33a4.17 4.17 0 0 1-4.17 4.17H10v5.5a2.5 2.5 0 1 1-5 0v-11a2.5 2.5 0 0 1 5 0v1.67" />
    <path d="M16 8.33a4.17 4.17 0 0 1 4.17 4.17h-4.17" />
  </svg>
)


export function SocialFAB() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-28 right-8 z-50">
      {isOpen && (
        <div className="flex flex-col items-center space-y-2 mb-2">
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <Link href="mailto:example@example.com">
              <Mail className="h-6 w-6" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <Link href="https://www.tiktok.com/@pslover.8" target="_blank" rel="noopener noreferrer">
              <TikTokIcon className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      )}
      <Button
        onClick={toggleOpen}
        variant="outline"
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
} 