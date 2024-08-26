"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

const languages = [{
    label: "English",
    value: "EN",
  }, {
    label: "Azerbaijani",
    value: "AZ",
  }
]

export function LanguageBox() {
  const [language, setLanguage] = useState("EN")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-customprimary">{language}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Select language</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
            {languages.map(language =>
                <DropdownMenuRadioItem key={language.value} value={language.value}>
                  {language.label}
                </DropdownMenuRadioItem>
            )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
