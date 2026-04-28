import { useEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import { useTypewriter } from '@/hooks/useTypewriter'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const roles = ['Frontend Developer', 'UI Engineer', 'ERP & CRM Designer', 'Web Designer']

const marqueeWords = [
  'React', 'GSAP', 'ERP Systems', 'Dashboards', 'API Integration',
  'Tailwind CSS', 'Framer Motion', 'UI Engineering', 'Product UI',
]

function HeroSection() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
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
        .from('[data-hero-scroll]', { opacity: 0, duration: 0.6 }, '-=0.3')
        .from('[data-hero-marquee]', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden section-block pt-22 pb-30"
    >
      {/* Subtle grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px',
        }}
      />

      {/* Top label */}
      <div />

      {/* Main Headline */}
      <div className="flex-1 flex flex-col justify-center py-16">
        <div data-hero-label className="label-text mb-8 flex items-center gap-3">
          <span className="accent-dot" />
          <span>Available for work</span>
        </div>

        <div ref={headlineRef} className="overflow-hidden">
          <h1 className="display-heading text-balance text-8xl">
            <span className="block overflow-hidden">
              <span className="block" data-hero-line>Ankit Maurya</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block text-[var(--muted)] text-8xl" data-hero-line>
                {typedText}<span className="caret text-[var(--accent)]">_</span>
              </span>
            </span>
          </h1>
        </div>

        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center">
          <p className="body-lg  text-balance" data-hero-sub>
            I build scalable web applications, ERP systems, and modern UI
            experiences — with clean design and smooth performance.
          </p>

          <div className="flex items-center gap-5 shrink-0" data-hero-cta>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--accent)]"
            >
              View Work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-[var(--muted)] underline underline-offset-4 transition-colors duration-200 hover:text-white"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

     

      {/* Marquee */}
      <div className="absolute  bottom-[-5px] left-0 right-0 overflow-hidden border-t border-white/[0.06] py-4" data-hero-marquee>
        <div className="marquee-track">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="label-text">{w}</span>
              <span className="accent-dot opacity-40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
