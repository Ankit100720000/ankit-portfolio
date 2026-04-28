import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function useLenis() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    })

    let rafId = 0

    const raf = (time) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

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
      lenis.scrollTo(target, { offset: -96, duration: 1.2 })
    }

    lenis.on('scroll', ScrollTrigger.update)
    rafId = window.requestAnimationFrame(raf)
    document.addEventListener('click', handleAnchorNavigation)

    return () => {
      document.removeEventListener('click', handleAnchorNavigation)
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [prefersReducedMotion])
}
