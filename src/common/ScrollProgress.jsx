import { useEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function ScrollProgress() {
  const barRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!barRef.current) {
      return undefined
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0

      if (prefersReducedMotion) {
        barRef.current.style.transform = `scaleX(${progress})`
        return
      }

      gsap.to(barRef.current, {
        scaleX: progress,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [prefersReducedMotion])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-px bg-white/5">
      <div
        ref={barRef}
        className="hero-progress h-full origin-left scale-x-0"
      />
    </div>
  )
}

export default ScrollProgress
