"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (lang: string) => {
    const newPath = `/${lang}${pathname.substring(3)}`
    router.push(newPath)
  }

  const currentLang = pathname.substring(1, 3)

  return (
    <Select onValueChange={handleLanguageChange} defaultValue={currentLang}>
      <SelectTrigger className="w-24">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="sr">Srpski</SelectItem>
        <SelectItem value="ru">Русский</SelectItem>
        <SelectItem value="ka">ქართული</SelectItem>
      </SelectContent>
    </Select>
  )
} 