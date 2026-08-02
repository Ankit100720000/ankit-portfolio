import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function useLenis() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
    })

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(500, 33)

    const handleAnchorNavigation = (event) => {
      const link = event.target.closest('a[href^="#"]')
      const href = link?.getAttribute('href')

      if (!href || href === '#') {
        return
      }

      const target = document.querySelector(href)
      if (!target) {
        return
      }

      event.preventDefault()

      lenis.scrollTo(target, {
        offset: -80,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }

    lenis.on('scroll', ScrollTrigger.update)
    document.addEventListener('click', handleAnchorNavigation)

    return () => {
      document.removeEventListener('click', handleAnchorNavigation)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [prefersReducedMotion])
}
