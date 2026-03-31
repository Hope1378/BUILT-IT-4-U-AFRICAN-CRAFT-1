import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Disable browser scroll restoration once on mount
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Cross-browser scroll to top (instant, no animation)
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    } catch {
      window.scrollTo(0, 0)
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return null
}