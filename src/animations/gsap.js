import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function createSectionReveal(scope, start = 'top 78%') {
  const items = scope.querySelectorAll('[data-reveal]')

  if (!items.length) {
    return null
  }

  gsap.set(items, { willChange: 'transform, opacity' })

  return gsap.fromTo(
    items,
    { y: 36, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.95,
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'willChange',
      scrollTrigger: {
        trigger: scope,
        start,
      },
    },
  )
}

export function createHeroTextReveal(items) {
  if (!items.length) {
    return null
  }

  return gsap.fromTo(
    items,
    { yPercent: 110, opacity: 0, rotate: 3 },
    {
      yPercent: 0,
      opacity: 1,
      rotate: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out',
    },
  )
}
