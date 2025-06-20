"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Mail, Instagram } from "lucide-react"
import Link from "next/link"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-2 animate-in slide-in-from-bottom-2">
          <Button size="icon" className="w-12 h-12 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700" asChild>
            <Link href="mailto:gioworkingemail@gmail.com">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="icon"
            className="w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            asChild
          >
            <Link href="https://instagram.com/Tetri_101" target="_blank">
              <Instagram className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}

      <Button
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}
