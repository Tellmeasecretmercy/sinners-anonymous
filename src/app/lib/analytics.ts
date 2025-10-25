export const GA_MEASUREMENT_ID = 'G-Y4072WJ49C'

// Define gtag function type
type GtagFunction = (
  command: 'config' | 'event',
  targetId: string,
  config?: Record<string, unknown>
) => void

// Extend window interface
declare global {
  interface Window {
    gtag?: GtagFunction
  }
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Specific tracking functions for Sinners Anonymous
export const trackConfessionalEntry = () => {
  event('confessional_entered', 'engagement', 'sin_chamber')
}

export const trackSinStart = () => {
  event('sin_confession_start', 'engagement', 'typing_started')
}

export const trackAmountSelection = (amount: string) => {
  event('amount_selected', 'conversion', 'sin_pricing', parseFloat(amount))
}

export const trackPaymentInitiated = (amount: string) => {
  event('payment_initiated', 'conversion', 'sin_payment', parseFloat(amount))
}

export const trackSinCompleted = (amount: string) => {
  event('sin_completed', 'conversion', 'confession_complete', parseFloat(amount))
}
