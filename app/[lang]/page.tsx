import { HomePageClient } from "./home-page-client";

export async function generateStaticParams() {
  const languages = ['en', 'es', 'sr', 'ru', 'ka'];
  return languages.map(lang => ({ lang }));
}

const cityImages = [
  { name: "Tbilisi", hotels: 120, img: "https://images.unsplash.com/photo-1582302394993-4b008d3c7515?auto=format&fit=crop&w=600&q=80" },
  { name: "Batumi", hotels: 85, img: "https://images.unsplash.com/photo-1610421296238-757833533634?auto=format&fit=crop&w=600&q=80" },
  { name: "Kutaisi", hotels: 45, img: "https://images.unsplash.com/photo-1600007829081-35aaa04979e2?auto=format&fit=crop&w=600&q=80" },
  { name: "Gudauri", hotels: 60, img: "https://images.unsplash.com/photo-1588623259528-5b5d19c364e2?auto=format&fit=crop&w=600&q=80" },
]

const faqItems = [
    {
        question: "How do I book a hotel or restaurant?",
        answer: "Browse listings in the respective 'Hotels' or 'Restaurants' sections, choose your favorite, then use the 'Book Now' or 'View Details' options for more information and to finalize your reservation through our partners."
    },
    {
        question: "Can I search by city or amenities?",
        answer: "Yes! The 'Hotels' and 'Restaurants' pages feature a comprehensive search bar and filter system to help you narrow results by city, specific amenities, price range, and user ratings."
    },
    {
        question: "Is there a mobile app?",
        answer: "Absolutely. You can download the GeorgiaStay app from this page for the best mobile experience. The app allows you to book hotels, browse restaurants, and unlock member-only benefits."
    },
]

export default function LandingPage() {
    return <HomePageClient cityImages={cityImages} faqItems={faqItems} />;
} 