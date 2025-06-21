import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import ClickSpark from "./ClickSpark"
import PageTransition from "@/components/PageTransition"
import GlobalLoader from "@/components/GlobalLoader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GeorgiaStay",
  description: "Find and book hotels and restaurants in Georgia.",
  keywords: "Georgia, hotels, restaurants, booking, travel, Tbilisi, Batumi",
    generator: 'v0.dev'
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
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5060779146125096"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="travelpayouts-verification" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.src = 'https://emrld.cc/NDI3ODkz.js?t=427893';
                document.head.appendChild(script);
            })();
          `
        }} />
      </head>
      <body className={inter.className}>
        {/* Full-screen mountain skiing background image for the entire app */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
            alt="Tbilisi background"
            className="w-full h-full object-cover object-center blur-sm scale-105"
            style={{ filter: 'blur(2px) brightness(0.85)' }}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="background-georgia-blur absolute left-0 right-0 bottom-0 h-1/3 flex items-end justify-center text-white text-3xl sm:text-4xl font-bold animate-georgia-blur-move px-8 text-center opacity-20" style={{ filter: 'blur(6px)' }}>
            Nestled at the crossroads of Europe and Asia, Georgia is a land of stunning natural beauty, rich traditions, and ancient history. From the towering peaks of the Caucasus Mountains to the sun-soaked beaches of the Black Sea coast, Georgia's diverse landscapes are as breathtaking as they are unique. Its capital, Tbilisi, is a vibrant mix of old and new—historic architecture, cobblestone streets, and sulfur baths stand side by side with modern cafes and art galleries. Georgia is one of the world's oldest wine-producing regions, with a winemaking tradition that dates back over 8,000 years. The country is known for its warm hospitality—visitors are treated like family, and meals are shared with generous amounts of food, laughter, and heartfelt toasts.
          </div>
        </div>
        <ClickSpark>
          <GlobalLoader />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <PageTransition>
              {children}
            </PageTransition>
          </ThemeProvider>
        </ClickSpark>
      </body>
    </html>
  )
}
