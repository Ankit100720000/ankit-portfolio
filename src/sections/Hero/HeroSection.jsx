import { useEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import { useTypewriter } from '@/hooks/useTypewriter'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { heroMetrics } from '@/data/site'

const roles = ['Frontend Developer', 'UI Engineer', 'ERP & CRM Designer', 'Product UI Craftsman']

const marqueeWords = [
  'React', 'GSAP', 'ERP Systems', 'Dashboards', 'API Integration',
  'Tailwind CSS', 'Framer Motion', 'UI Engineering', 'Product UI',
]

function HeroSection() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const typedText = useTypewriter(roles, 150, 2800)

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from('[data-hero-label]', { y: 20, opacity: 0, duration: 0.8, delay: 0.4 })
        .from('[data-hero-line]', { y: '110%', duration: 1, stagger: 0.08 }, '-=0.5')
        .from('[data-hero-sub]', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('[data-hero-cta]', { y: 18, opacity: 0, duration: 0.7 }, '-=0.6')
        .from('[data-hero-metric]', { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 }, '-=0.4')
        .from('[data-hero-marquee]', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="section-block relative flex min-h-screen flex-col justify-between overflow-hidden pb-32 pt-32"
    >
      {/* Aurora background */}
      <div className="aurora" />
      <div className="grid-overlay" />

      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px',
        }}
      />

      {/* Main */}
      <div className="relative flex flex-1 flex-col justify-center py-12">
        <div data-hero-label className="status-pill mb-10 self-start">
          <span className="accent-dot" />
          <span>Available for work · Q2 2026</span>
        </div>

        <div className="overflow-hidden">
          <h1 className="display-heading text-balance">
            <span className="block overflow-hidden">
              <span className="block" data-hero-line>
                Ankit Maurya
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block text-[var(--muted)]"
                data-hero-line
                style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
              >
                {typedText}
                <span className="caret text-[var(--accent)]">_</span>
              </span>
            </span>
          </h1>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <p className="body-lg max-w-2xl text-balance" data-hero-sub>
            I build scalable web applications, ERP systems, and modern UI experiences —
            with clean design, smooth performance, and a strong eye for product detail.
          </p>

          <div className="flex flex-wrap items-center gap-4 lg:justify-end" data-hero-cta>
            <a href="#projects" className="btn-primary group">
              View Work
              <span className="arrow-anim">→</span>
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
          </div>
        </div>

        {/* Hero metrics */}
        <div className="mt-20 grid grid-cols-3 gap-3 sm:gap-6">
          {heroMetrics.map((metric) => (
            <div
              key={metric.label}
              data-hero-metric
              className="gradient-border px-5 py-6 sm:px-7 sm:py-7"
            >
              <p
                className="stat-number text-3xl sm:text-4xl lg:text-5xl"
              >
                {metric.value}
              </p>
              <p className="mt-2 label-text text-[10px] sm:text-[11px]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/[0.06] py-4"
        data-hero-marquee
      >
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="label-text">{w}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] opacity-50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
