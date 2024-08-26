import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDayName(date : Date, locale: Intl.LocalesArgument)
{
    return date.toLocaleDateString(locale, { weekday: 'short' });        
}

export function getMonthName(date : Date, locale: Intl.LocalesArgument)
{
    return date.toLocaleDateString(locale, { month: 'short' });        
}