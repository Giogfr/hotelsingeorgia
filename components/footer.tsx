"use client"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">GeorgiaStay</h3>
          <p className="text-sm text-neutral-400">Your guide to the heart of the Caucasus.</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="#" className="hover:text-white">Careers</Link></li>
            <li><Link href="#" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>
         <div>
          <h3 className="font-bold mb-4">Actions</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/hotels" className="hover:text-white">Browse Hotels</Link></li>
            <li><Link href="/restaurants" className="hover:text-white">Browse Restaurants</Link></li>
            <li><a href="https://github.com/Giogfr/hotelsingeorgia/releases/latest/download/GeorgiaStay.apk" className="hover:text-white">Download App</a></li>
          </ul>
        </div>
      </div>
      <div className="container max-w-7xl mt-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} GeorgiaStay. All rights reserved.
      </div>
    </footer>
  )
} 