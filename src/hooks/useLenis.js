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
      duration: 1.15,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    })

    let updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

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

      const path = document.querySelector('.page-transition-path')
      const container = document.querySelector('.page-transition-container')

      if (path && container) {
        if (container.style.pointerEvents === 'auto') return

        const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z"
        const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z"
        const initial = "M 0 100 V 100 Q 50 100 100 100 V 100 z"

        container.style.pointerEvents = 'auto'

        const tl = gsap.timeline({
          onComplete: () => {
            container.style.pointerEvents = 'none'
          }
        })

        tl.to(path, {
          attr: { d: start },
          duration: 0.45,
          ease: 'power2.in',
        })
        .to(path, {
          attr: { d: end },
          duration: 0.35,
          ease: 'power2.out',
          onComplete: () => {
            lenis.scrollTo(target, { offset: -96, duration: 0 })
          }
        })
        .to(path, {
          attr: { d: start },
          duration: 0.35,
          ease: 'power2.in',
        })
        .to(path, {
          attr: { d: initial },
          duration: 0.45,
          ease: 'power2.out',
        })
      } else {
        lenis.scrollTo(target, { offset: -96, duration: 1.2 })
      }
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
