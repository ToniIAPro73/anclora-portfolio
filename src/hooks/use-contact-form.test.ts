import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { useContactForm } from "@/hooks/use-contact-form"

describe("useContactForm", () => {
  it("validates required fields", () => {
    const { result } = renderHook(() => useContactForm())

    expect(result.current.validateForm()).toBe(false)

    act(() => {
      result.current.updateField("name", "Anclora")
      result.current.updateField("email", "brand@anclora.com")
      result.current.updateField("phone", "+34 600 000 000")
    })

    expect(result.current.validateForm()).toBe(true)
  })

  it("rejects an invalid email address", () => {
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.updateField("name", "Anclora")
      result.current.updateField("email", "not-an-email")
      result.current.updateField("phone", "+34 600 000 000")
    })

    expect(result.current.validateForm()).toBe(false)
  })

  it("shows a validation error and skips submission when required fields are missing", async () => {
    const toast = vi.fn()
    const preventDefault = vi.fn()
    const { result } = renderHook(() =>
      useContactForm({ validationTitle: "Check the form", validationDescription: "Complete required fields", toast })
    )

    await act(async () => {
      await result.current.handleSubmit({ preventDefault } as never)
    })

    expect(preventDefault).toHaveBeenCalledOnce()
    expect(toast).toHaveBeenCalledWith({
      title: "Check the form",
      description: "Complete required fields",
      variant: "destructive",
    })
    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.isSuccess).toBe(false)
  })

  it("resets success state", () => {
    const { result } = renderHook(() => useContactForm())

    act(() => {
      result.current.resetForm()
    })

    expect(result.current.isSuccess).toBe(false)
    expect(result.current.formData.name).toBe("")
  })

  it("restores saved lead data without restoring the website honeypot", () => {
    const previousLeadData = localStorage.getItem("anclora_lead_data")
    localStorage.setItem(
      "anclora_lead_data",
      JSON.stringify({
        name: "Anclora",
        email: "brand@anclora.com",
        phone: "+34 600 000 000",
        interest: "vacation",
        message: "Looking for a summer home",
        budget: 750000,
        website: "bot-filled-value",
      })
    )

    try {
      const { result } = renderHook(() => useContactForm({ initialBudget: 100000 }))

      expect(result.current.formData).toEqual({
        name: "Anclora",
        email: "brand@anclora.com",
        phone: "+34 600 000 000",
        interest: "vacation",
        message: "Looking for a summer home",
        website: "",
      })
      expect(result.current.budgetValue).toEqual([750000])
    } finally {
      if (previousLeadData === null) {
        localStorage.removeItem("anclora_lead_data")
      } else {
        localStorage.setItem("anclora_lead_data", previousLeadData)
      }
    }
  })

  it("surfaces the server error and does not report success when the API responds with a failure", async () => {
    const previousLeadData = localStorage.getItem("anclora_lead_data")
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: "Rate limit exceeded" }),
    })
    vi.stubGlobal("fetch", fetchMock)
    const toast = vi.fn()
    const onSubmitError = vi.fn()
    const onSubmitSuccess = vi.fn()

    try {
      const { result } = renderHook(() => useContactForm({ toast, onSubmitError, onSubmitSuccess }))

      act(() => {
        result.current.updateField("name", "Anclora")
        result.current.updateField("email", "brand@anclora.com")
        result.current.updateField("phone", "+34 600 000 000")
      })

      await act(async () => {
        await result.current.handleSubmit({ preventDefault: vi.fn() } as never)
      })

      expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.objectContaining({ method: "POST" }))
      expect(toast).toHaveBeenCalledWith({
        title: "No se pudo enviar la solicitud. Inténtelo de nuevo.",
        description: "Rate limit exceeded",
        variant: "destructive",
      })
      expect(onSubmitError).toHaveBeenCalledOnce()
      expect(onSubmitSuccess).not.toHaveBeenCalled()
      expect(result.current.isSubmitting).toBe(false)
      expect(result.current.isSuccess).toBe(false)
    } finally {
      vi.unstubAllGlobals()
      if (previousLeadData === null) {
        localStorage.removeItem("anclora_lead_data")
      } else {
        localStorage.setItem("anclora_lead_data", previousLeadData)
      }
    }
  })

  it("submits the form successfully and triggers success callbacks and toast", async () => {
    const previousLeadData = localStorage.getItem("anclora_lead_data")
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })
    vi.stubGlobal("fetch", fetchMock)
    const toast = vi.fn()
    const onSubmitAttempt = vi.fn()
    const onSubmitSuccess = vi.fn()
    const onSubmitError = vi.fn()

    try {
      const { result } = renderHook(() =>
        useContactForm({
          successTitle: "Solicitud enviada",
          successDescription: "Nos pondremos en contacto pronto.",
          toast,
          onSubmitAttempt,
          onSubmitSuccess,
          onSubmitError,
        })
      )

      act(() => {
        result.current.updateField("name", "Anclora")
        result.current.updateField("email", "brand@anclora.com")
        result.current.updateField("phone", "+34 600 000 000")
        result.current.updateField("interest", "investment")
        result.current.updateField("message", "Interesado en portfolio")
      })

      await act(async () => {
        await result.current.handleSubmit({ preventDefault: vi.fn() } as never)
      })

      expect(fetchMock).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      )
      expect(onSubmitAttempt).toHaveBeenCalledOnce()
      expect(onSubmitSuccess).toHaveBeenCalledOnce()
      expect(onSubmitError).not.toHaveBeenCalled()
      expect(toast).toHaveBeenCalledWith({
        title: "Solicitud enviada",
        description: "Nos pondremos en contacto pronto.",
        className: "bg-[#0F172A] text-[#F8F5F2] border-[#C5A059]",
      })
      expect(result.current.isSubmitting).toBe(false)
      expect(result.current.isSuccess).toBe(true)

      const saved = JSON.parse(localStorage.getItem("anclora_lead_data") || "{}")
      expect(saved.name).toBe("Anclora")
      expect(saved.email).toBe("brand@anclora.com")
    } finally {
      vi.unstubAllGlobals()
      if (previousLeadData === null) {
        localStorage.removeItem("anclora_lead_data")
      } else {
        localStorage.setItem("anclora_lead_data", previousLeadData)
      }
    }
  })

  it("shows a localized network error and does not report success when the request throws", async () => {
    const previousLeadData = localStorage.getItem("anclora_lead_data")
    const fetchMock = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"))
    vi.stubGlobal("fetch", fetchMock)
    const toast = vi.fn()
    const onSubmitError = vi.fn()
    const onSubmitSuccess = vi.fn()
    const networkError = "We couldn't complete your request. Please check your connection and try again."

    try {
      const { result } = renderHook(() => useContactForm({ lang: "en", toast, onSubmitError, onSubmitSuccess }))

      act(() => {
        result.current.updateField("name", "Anclora")
        result.current.updateField("email", "brand@anclora.com")
        result.current.updateField("phone", "+34 600 000 000")
      })

      await act(async () => {
        await result.current.handleSubmit({ preventDefault: vi.fn() } as never)
      })

      expect(toast).toHaveBeenCalledWith({
        title: networkError,
        description: networkError,
        variant: "destructive",
      })
      expect(onSubmitError).toHaveBeenCalledOnce()
      expect(onSubmitSuccess).not.toHaveBeenCalled()
      expect(result.current.isSubmitting).toBe(false)
      expect(result.current.isSuccess).toBe(false)
    } finally {
      vi.unstubAllGlobals()
      if (previousLeadData === null) {
        localStorage.removeItem("anclora_lead_data")
      } else {
        localStorage.setItem("anclora_lead_data", previousLeadData)
      }
    }
  })

  it("formats price in euros for Spanish locale by default", () => {
    const { result } = renderHook(() => useContactForm())

    expect(result.current.formatPrice(5000000)).toBe("5.000.000 €")
  })
})
