import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ClickSpark from "@/app/ClickSpark"
import BlobCursor from "@/components/BlobCursor"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import FloatingDonateButton from "@/components/floating-action-button"
import { cn } from "@/lib/utils"
import { SocialFAB } from "@/components/social-fab"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GeorgiaStay",
  description: "Find your perfect stay in Georgia. Book hotels and restaurants.",
  keywords: "Georgia, hotels, restaurants, booking, travel, Tbilisi, Batumi",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/georgia_flag.svg" type="image/svg+xml" />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <ClickSpark>
              <BlobCursor />
              {children}
          </ClickSpark>
          <SocialFAB />
          <FloatingDonateButton />
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
