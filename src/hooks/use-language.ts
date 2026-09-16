import { useCallback, useEffect, useState } from "react"
import type { Language } from "@/types"

const resolveInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "es"

  const saved = localStorage.getItem("anclora_language")
  if (saved === "es" || saved === "en") return saved

  return navigator.language.startsWith("en") ? "en" : "es"
}

export const useLanguage = () => {
  const [lang, setLang] = useState<Language>("es")

  useEffect(() => {
    // Reads localStorage/navigator after mount to avoid SSR/CSR hydration
    // mismatch; this setState call is intentionally client-only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(resolveInitialLanguage())
  }, [])

  useEffect(() => {
    localStorage.setItem("anclora_language", lang)
  }, [lang])

  const toggleLanguage = useCallback(() => {
    setLang((previous) => (previous === "es" ? "en" : "es"))
  }, [])

  return {
    lang,
    setLang,
    toggleLanguage,
  }
}
