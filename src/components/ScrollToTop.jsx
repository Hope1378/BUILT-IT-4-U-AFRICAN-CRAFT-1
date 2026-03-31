import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Disable browser scroll restoration once on mount
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const scrollToTop = () => {
      // Use auto to avoid smooth scrolling animation from CSS scroll-behavior.
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    scrollToTop()
    const rafId = window.requestAnimationFrame(scrollToTop)

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [pathname])

  return null
}