"use client"

import { useEffect, useState } from "react"

type CookiePreferences = { necessary: true; analytics: boolean; marketing: boolean; updatedAt: string; version: "v1" }
const STORAGE_KEY = "anclora-cookie-consent-v1"
const defaults: CookiePreferences = { necessary: true, analytics: false, marketing: false, updatedAt: "", version: "v1" }

export function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaults)

  useEffect(() => {
    // Reads localStorage after mount to avoid SSR/CSR hydration mismatch;
    // the resulting setState calls are intentionally client-only, not a
    // synchronization loop.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CookiePreferences>
        setPreferences({ necessary: true, analytics: Boolean(parsed.analytics), marketing: Boolean(parsed.marketing), updatedAt: parsed.updatedAt ?? "", version: "v1" })
        return
      }
      setOpen(true)
    } catch {
      setOpen(true)
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  useEffect(() => {
    const listener = () => { setOpen(true); setSettings(true) }
    window.addEventListener("anclora:open-cookie-preferences", listener)
    return () => window.removeEventListener("anclora:open-cookie-preferences", listener)
  }, [])
  function persist(next: CookiePreferences) {
    const value = { ...next, necessary: true as const, updatedAt: new Date().toISOString(), version: "v1" as const }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    setPreferences(value)
    setOpen(false)
    setSettings(false)
  }
  return (
    <>
      <button type="button" aria-label="Preferencias de cookies" onClick={() => { setOpen(true); setSettings(true) }} className="fixed bottom-5 left-5 z-50 h-11 w-11 rounded-full border border-[#C5A059]/50 bg-[#0F172A]/90 text-[#C5A059] shadow-2xl backdrop-blur">C</button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 py-6 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="portfolio-cookie-title">
          <div className="w-full max-w-lg rounded-3xl border border-[#C5A059]/25 bg-[#0F172A] p-6 text-[#F8F5F2] shadow-2xl">
            <h2 id="portfolio-cookie-title" className="font-serif text-3xl font-semibold">{settings ? "Gestionar cookies" : "Preferencias de cookies"}</h2>
            <p className="mt-3 text-sm leading-6 text-[#94A3B8]">Este blueprint utiliza cookies necesarias y puede guardar preferencias opcionales de análisis o marketing si las autorizas.</p>
            {settings ? (
              <div className="mt-5 space-y-3">
                <CookieRow title="Cookies necesarias" description="Operación básica y seguridad. No se pueden desactivar." checked disabled onChange={() => {}} />
                <CookieRow title="Cookies de análisis" description="Medición funcional del blueprint." checked={preferences.analytics} onChange={(analytics) => setPreferences((current) => ({ ...current, analytics }))} />
                <CookieRow title="Cookies de marketing" description="Reservadas para campañas relevantes. No activan scripts inexistentes." checked={preferences.marketing} onChange={(marketing) => setPreferences((current) => ({ ...current, marketing }))} />
              </div>
            ) : null}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {!settings ? <button type="button" onClick={() => persist({ ...defaults, analytics: true, marketing: true })} className="rounded-full bg-[#C5A059] px-5 py-3 text-sm font-semibold text-[#0F172A]">Aceptar todas</button> : null}
              <button type="button" onClick={() => settings ? persist(preferences) : setSettings(true)} className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold">{settings ? "Guardar preferencias" : "Configuración"}</button>
              <button type="button" onClick={() => persist(defaults)} className="rounded-full px-5 py-3 text-sm font-semibold text-[#94A3B8]">Rechazar opcionales</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function CookieRow({ title, description, checked, disabled, onChange }: { title: string; description: string; checked: boolean; disabled?: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"><span><span className="block text-sm font-semibold">{title}</span><span className="mt-1 block text-xs leading-5 text-[#94A3B8]">{description}</span></span><input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-5 w-5 accent-[#C5A059]" /></label>
}
