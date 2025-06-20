"use client"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // wait for hydration BEFORE touching the theme
  useEffect(() => setMounted(true), [])

  // ⬇️  NEW: return null instead of a placeholder button
  if (!mounted || !resolvedTheme) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden transition-transform duration-300 hover:rotate-12 active:scale-90"
    >
      {/* Sun */}
      <Sun
        className={`absolute h-5 w-5 origin-center transition-all duration-500 ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      {/* Moon */}
      <Moon
        className={`absolute h-5 w-5 origin-center transition-all duration-500 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </Button>
  )
}
