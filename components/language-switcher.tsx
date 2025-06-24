"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "sr", name: "Srpski" },
  { code: "ru", name: "Русский" },
  { code: "ka", name: "ქართული" },
];

const otherLanguages = [
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
];

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (lang: string) => {
    if (!pathname) return;
    const newPath = `/${lang}${pathname.substring(3)}`
    router.push(newPath)
  }

  const currentLangCode = pathname ? pathname.substring(1, 3) : '';
  const currentLang = languages.find(l => l.code === currentLangCode)?.name || otherLanguages.find(l => l.code === currentLangCode)?.name || "Language";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{currentLang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(lang => (
          <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
            {lang.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Other</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {otherLanguages.map(lang => (
                <DropdownMenuItem key={lang.code} disabled>
                  <div className="flex justify-between w-full items-center">
                    <span>{lang.name}</span>
                    <span className="text-xs text-muted-foreground ml-4">(Coming Soon)</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 