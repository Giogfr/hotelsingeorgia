"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCurrency } from "@/contexts/currency-context"

export type Currency = "GEL" | "EUR" | "USD" | "RUB";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (value: Currency) => {
    setCurrency(value);
  }

  return (
    <Select onValueChange={handleCurrencyChange} defaultValue={currency}>
      <SelectTrigger className="w-24" suppressHydrationWarning>
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="GEL">GEL</SelectItem>
        <SelectItem value="EUR">EUR</SelectItem>
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="RUB">RUB</SelectItem>
      </SelectContent>
    </Select>
  )
}