import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function useGsapSection({ selector = '[data-animate]', stagger = 0.1, start = 'top 78%' } = {}) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  useLayoutEffect(() => {
    if (reducedMotion || !ref.current) return undefined
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(selector)
      if (!items.length) return
      gsap.fromTo(items, { autoAlpha: 0, y: 38, rotate: -1.5 }, {
        autoAlpha: 1, y: 0, rotate: 0, duration: 0.8, stagger, ease: 'power3.out',
        clearProps: 'transform,visibility', scrollTrigger: { trigger: ref.current, start, once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [reducedMotion, selector, stagger, start])
  return ref
}
