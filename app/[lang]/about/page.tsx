import { getDictionary } from "@/lib/translations"
import { AboutPageClient } from "./about-client"
import { MapPin, Users, Award, Clock } from "lucide-react"

// Generate Static Paths
export async function generateStaticParams() {
    const languages = ['en', 'es', 'sr', 'ru', 'ka'];
    return languages.map(lang => ({ lang }));
}

// Main Page Component (Server Component)
export default async function AboutPage({ params: { lang } }: { params: { lang: string } }) {
  const t = await getDictionary(lang);

  const features = [
    {
      icon: "MapPin",
      title: t("localExpertise"),
      description: t("localExpertiseText"),
    },
    {
      icon: "Award",
      title: t("bestPrices"),
      description: t("bestPricesText"),
    },
    {
      icon: "Clock",
      title: t("customerSupport"),
      description: t("customerSupportText"),
    },
  ];

  const stats = [
    { number: "500+", label: "Hotels" },
    { number: "50+", label: "Cities" },
    { number: "10,000+", label: "Happy Customers" },
    { number: "4.8", label: "Average Rating" },
  ];

  // Pass data to the client component
  return <AboutPageClient features={features} stats={stats} t={t} />;
}

