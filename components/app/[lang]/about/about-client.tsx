"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import * as LucideIcons from "lucide-react"
import { motion } from "framer-motion"
import { Language } from "@/lib/translations"

const Icon = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const LucideIcon = (LucideIcons as any)[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon {...props} />;
};

export function AboutPageClient({ features, stats, t, lang }: { features: any[], stats: any[], t: any, lang: Language }) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background text-foreground"
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground py-20 text-center">
          <div className="container mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg"
            >
              {t.aboutTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto drop-shadow-md"
            >
              {t.aboutDescription}
            </motion.p>
          </div>
        </section>
  
        {/* Stats Section */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{t.ourMission}</h2>
                <p className="text-lg text-muted-foreground">{t.missionText}</p>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    <Card className="text-center h-full hover:shadow-xl transition-shadow duration-300 bg-card">
                      <CardHeader>
                        <div className="flex justify-center mb-4">
                          <Icon name={feature.icon} className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
  
        {/* Why Choose Us */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">{t.whyChooseUs}</h2>
  
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <LucideIcons.Heart className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Authentic Georgian Experience</h3>
                      <p className="text-muted-foreground">
                        We showcase the real Georgia - from traditional guesthouses to luxury resorts, ensuring you
                        experience authentic Georgian hospitality.
                      </p>
                    </div>
                  </div>
  
                  <div className="flex items-start space-x-4">
                    <LucideIcons.Star className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Verified Reviews</h3>
                      <p className="text-muted-foreground">
                        All our hotel reviews come from real guests who have stayed at the properties, giving you honest
                        insights for your decision.
                      </p>
                    </div>
                  </div>
  
                  <div className="flex items-start space-x-4">
                    <LucideIcons.Users className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Local Team</h3>
                      <p className="text-muted-foreground">
                        Our team consists of local Georgian experts who know the best places to stay and can provide
                        insider recommendations.
                      </p>
                    </div>
                  </div>
                </div>
  
                <Card className="bg-card p-6">
                  <h3 className="font-semibold mb-4 text-center">Contact Our Team</h3>
                   <p className="text-sm text-muted-foreground mb-4 text-center">
                    Have questions or need personalized recommendations? We're here to help!
                  </p>
                  <div className="space-y-4">
                     <div className="flex items-center space-x-3 p-3 rounded-lg bg-background">
                       <LucideIcons.Mail className="h-5 w-5 text-primary"/>
                      <a href="mailto:gioworkingemail@gmail.com" className="text-primary hover:underline">
                        gioworkingemail@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-background">
                       <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                       <a href="https://instagram.com/Tetri_101" className="text-primary hover:underline">
                        @Tetri_101
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>
    )
  } 