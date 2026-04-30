import { useEffect } from 'react'
import { gsap } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function useCursorGlass() {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined
    }

    if (typeof window === 'undefined') {
      return undefined
    }

    const root = document.documentElement
    const startX = window.innerWidth * 0.5
    const startY = window.innerHeight * 0.25

    root.style.setProperty('--cursor-x', `${startX}px`)
    root.style.setProperty('--cursor-y', `${startY}px`)

    const setRootX = gsap.quickTo(root, '--cursor-x', {
      duration: 0.18,
      ease: 'power3.out',
      units: 'px',
    })
    const setRootY = gsap.quickTo(root, '--cursor-y', {
      duration: 0.18,
      ease: 'power3.out',
      units: 'px',
    })

    let lastX = startX
    let lastY = startY
    let lastTarget = null
    let rafId = 0

    let activeEl = null
    let setElX = null
    let setElY = null

    const update = () => {
      rafId = 0

      setRootX(lastX)
      setRootY(lastY)

      const el = lastTarget?.closest?.('.glass-panel, .modern-card, .gradient-border') ?? null

      if (el !== activeEl) {
        activeEl = el

        if (activeEl) {
          setElX = gsap.quickTo(activeEl, '--gx', {
            duration: 0.22,
            ease: 'power3.out',
            units: 'px',
          })
          setElY = gsap.quickTo(activeEl, '--gy', {
            duration: 0.22,
            ease: 'power3.out',
            units: 'px',
          })
        } else {
          setElX = null
          setElY = null
        }
      }

      if (activeEl && setElX && setElY) {
        const rect = activeEl.getBoundingClientRect()
        setElX(lastX - rect.left)
        setElY(lastY - rect.top)
      }
    }

    const onMove = (event) => {
      lastX = event.clientX
      lastY = event.clientY
      lastTarget = event.target

      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [prefersReducedMotion])
}

