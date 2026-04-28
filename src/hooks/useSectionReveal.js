import { useEffect, useRef } from 'react'
import { createSectionReveal, gsap } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function useSectionReveal(start) {
  const ref = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      createSectionReveal(ref.current, start)
    }, ref)

    return () => ctx.revert()
  }, [prefersReducedMotion, start])

  return ref
}
