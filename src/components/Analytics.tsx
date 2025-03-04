'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Declare the gtag function as a property on the Window interface
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

    // Track page view - replace with your tracking code
    window.gtag?.('config', 'G-VEF9JH2C7M', {
      page_path: url,
    })
  }, [pathname, searchParams])

  return null
}