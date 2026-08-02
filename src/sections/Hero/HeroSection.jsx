import { useLayoutEffect, useRef } from 'react'
import { ArrowDownRight, FileText } from 'lucide-react'
import { gsap } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export default function HeroSection() {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  useLayoutEffect(() => {
    if (reducedMotion || !ref.current) return undefined
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
      timeline.fromTo('[data-hero="eyebrow"]', { autoAlpha: 0, x: -28 }, { autoAlpha: 1, x: 0, duration: 0.55 })
        .fromTo('[data-hero="title"]', { autoAlpha: 0, y: 70, rotate: 2 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 1 }, '-=0.25')
        .fromTo('[data-hero="intro"], [data-hero="actions"]', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.12 }, '-=0.4')
        .fromTo('[data-hero="note"]', { autoAlpha: 0, y: 44, rotate: -4 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.7 }, '-=0.5')
      gsap.to('[data-hero="note"]', { y: 35, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1.2 } })
    }, ref)
    return () => ctx.revert()
  }, [reducedMotion])
  return (
    <section id="home" ref={ref} className="section-hero">
      <div className="shell hero">
        <div className="hero-grid">
          <div>
            <span data-hero="eyebrow" className="eyebrow">Frontend engineer · Gurugram, India</span>
            <h1 data-hero="title" className="display">Interfaces for <em>complex</em> work.</h1>
            <p data-hero="intro" className="hero-intro">I’m Ankit Maurya, a frontend engineer who turns dense business workflows into clear, dependable product experiences — from enterprise ERP systems to customer-facing platforms.</p>
            <div data-hero="actions" className="hero-actions">
              <a href="#projects" className="button button-primary">
                Selected work <ArrowDownRight size={16} />
              </a>
              <a href="/Ankit_resume.pdf" target="_blank" rel="noreferrer" className="button button-plain">
                <FileText size={16} /> Resume
              </a>
            </div>
          </div>
          <aside data-hero="note" className="hero-note">
            <strong>Currently available</strong>For senior frontend roles and thoughtful product collaborations.
          </aside>
        </div>
      </div>
    </section>
  )
}
