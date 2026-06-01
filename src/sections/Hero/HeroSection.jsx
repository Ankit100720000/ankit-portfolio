import { useEffect, useRef } from 'react'
import { ArrowUpRight, Mail, Code2, Layers, Zap, Globe } from 'lucide-react'
import { gsap } from '@/animations/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { heroMetrics } from '@/data/site'

// Inline SVGs for icons removed from lucide-react
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)


const socialLinks = [
  { label: 'GitHub', icon: <GithubIcon />, href: 'https://github.com/ankitmaurya-dev' },
  { label: 'LinkedIn', icon: <LinkedinIcon />, href: 'https://linkedin.com/in/ankit-maurya2000' },
  { label: 'Email', icon: <Mail size={16} />, href: 'mailto:mauryankit2615@gmail.com' },
  { label: 'Portfolio', icon: <Globe size={16} />, href: '#projects' },
]

function HeroSection() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      /* ── 1. Staggered entrance ── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('[data-reveal="badge"]',    { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2 })
        .fromTo('[data-reveal="title"]',    { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.5')
        .fromTo('[data-reveal="subtitle"]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.55')
        .fromTo('[data-reveal="stats"]',    { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo('[data-reveal="buttons"]',  { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo('[data-reveal="socials"]',  { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.45')

      /* ── 3. Scroll-based parallax on left column ── */
      gsap.to('.hero-left-col', {
        y: 80, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      })

      /* ── 4. Ambient blob drift ── */
      gsap.to('.hero-blob-1', { y: -40, x: 20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.hero-blob-2', { y: 30, x: -30, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })

      /* ── 5. Background color scroll transition ── */
      gsap.to(document.documentElement, {
        '--bg': '#0e100f',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])


  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pt-28 pb-20 sm:px-8 lg:px-14 xl:px-20 2xl:px-24"
    >
      {/* Background ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="hero-blob-1 absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="hero-blob-2 absolute top-1/3 -right-60 h-[600px] w-[600px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, var(--accent-2) 0%, transparent 70%)', filter: 'blur(120px)' }}
        />
        <div
          className="absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative mx-auto w-full">
        <div className="grid gap-14 xl:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="hero-left-col flex flex-col">

            {/* Availability badge */}
            <div data-reveal="badge" className="mb-8 w-fit">
              {/* <div className="status-pill">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                Available for new work
              </div> */}
            </div>

            {/* Main heading */}
            <div data-reveal="title">
              <h1
                className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
              >
                Hi, I'm{' '}
                <span className="inline-block align-middle mx-2 h-[52px] w-[52px] overflow-hidden rounded-full border-2 border-[var(--accent)]/30 sm:h-[64px] sm:w-[64px] xl:h-[72px] xl:w-[72px]"
                  style={{ boxShadow: '0 0 20px var(--accent-glow)' }}
                >
                  <img
                    src="https://avatars.githubusercontent.com/u/1?v=4"
                    alt="Ankit Maurya"
                    className="h-full w-full object-cover"
                  />
                </span>
                Ankit.
              </h1>

              <div className="mt-10">
                <span
                  className="text-3xl font-extrabold sm:text-4xl xl:text-5xl"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
                >
                  <span className="text-gradient-cool">Frontend</span>{' '}
                  <span className="text-white/70 font-light">Developer</span>
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <p
              data-reveal="subtitle"
              className="mt-6 max-w-lg text-balance text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Crafting clean, scalable, and visually stunning web experiences —
              from complex ERP systems to modern consumer products.
            </p>

            {/* Stats row */}
            <div
              data-reveal="stats"
              className="mt-8 flex flex-wrap items-center gap-8"
            >
              {heroMetrics.map((m) => (
                <div key={m.label} className="hero-stat">
                  <span className="hero-stat-value">{m.value}</span>
                  <span className="hero-stat-label">{m.label}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div data-reveal="buttons" className="mt-10 flex flex-wrap items-center gap-3">
              <a
                id="hero-view-work-cta"
                href="#projects"
                className="btn-primary"
              >
                View Work
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                id="hero-contact-cta"
                href="#contact"
                className="btn-ghost"
              >
                Get in touch
              </a>
            </div>

            {/* Social links */}
            <div
              data-reveal="socials"
              className="mt-8 flex items-center gap-2"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[var(--muted)] transition-all duration-200 hover:border-[var(--accent)]/40 hover:bg-[var(--accent-dim)] hover:text-[var(--accent)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>


        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]" style={{ fontFamily: 'var(--font-display)' }}>Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-[var(--accent)] to-transparent" style={{ animation: 'float 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}

export default HeroSection
