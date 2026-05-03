import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/animations/gsap'
import { heroMetrics } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useTypewriter } from '@/hooks/useTypewriter'

const roles = ['Frontend Developer', 'UI Devloper']

const marqueeWords = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript',
  'React', 'Next.js',
  'Tailwind CSS', 'Framer Motion', 'GSAP',
  'React Query', 'State Management',
  'Component-Based Architecture', 'Single Page Applications',
  'Responsive Design', 'Cross-Browser Compatibility',
  'Web Accessibility', 'SEO Best Practices',
  'Performance Optimization', 'Code Splitting', 'Lazy Loading',
  'Image Optimization', 'Webpack', 'Babel',
  'ESLint', 'Prettier',
  'Jest', 'Cypress', 'Storybook',
  'Design Systems', 'UI Engineering', 'User-Centered Design'
];

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

      gsap.to('[data-hero-line]', {
        xPercent: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [prefersReducedMotion])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="section-block relative flex min-h-screen flex-col justify-between overflow-hidden pb-32 pt-32"
    >
      <div className="aurora" />
      <div className="grid-overlay" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px',
        }}
      />

      <div className="relative flex flex-1 flex-col justify-center py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          

          <div className="overflow-hidden">
            <h1 className="display-heading text-balance">
              <span className="block overflow-hidden mb-5">
                <span className="block font-medium" data-hero-line>
                  Ankit Maurya
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block text-white/45 font-medium"
                  data-hero-line
                  style={{ fontSize: 'clamp(2.35rem, 7.4vw, 6.7rem)' }}
                >
                  {typedText}
                  <span className="caret text-[var(--accent)]">_</span>
                </span>
              </span>
            </h1>
          </div>

          <div className="mt-12 max-w-4xl">
            <p className="body-lg text-balance" data-hero-sub>
              I design and build high-clarity ERP, CRM, analytics, and field-tracking
              interfaces for teams that need speed, structure, and a premium product feel.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4" data-hero-cta>
              <a href="#projects" className="btn-primary group">
                View Work
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a href="#contact" className="btn-ghost">
                Get in touch
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5 xl:mt-20">
          {heroMetrics.map((metric) => (
            <div
              key={metric.label}
              data-hero-metric
              className="hero-stat-card"
            >
              <span className="hero-stat-glow" />
              <p className="stat-number text-4xl lg:text-5xl">
                {metric.value}
              </p>
              <p className="mt-2 label-text text-[10px] sm:text-[11px]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

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
