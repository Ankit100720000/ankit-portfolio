import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '@/components/common/Navbar'
import { useLenis } from '@/hooks/useLenis'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useCursorGlass } from '@/hooks/useCursorGlass'
import PremiumBackground from '@/components/common/PremiumBackground'
import ScrollProgress from '@/components/common/ScrollProgress'
import CommandPalette from '@/components/common/CommandPalette'
import HeroSection from '@/sections/Hero/HeroSection'
import Marquee from '@/components/common/Marquee'

const AboutSection = lazy(() => import('@/sections/About/AboutSection'))
const ProjectsSection = lazy(() => import('@/sections/Projects/ProjectsSection'))
const ExperienceSection = lazy(() => import('@/sections/Experience/ExperienceSection'))
const ContactSection = lazy(() => import('@/sections/Contact/ContactSection'))

function App() {
  useLenis()
  useCursorGlass()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Ankit Maurya | Frontend Developer</title>
        <meta
          name="description"
          content="Frontend developer portfolio featuring scalable ERP systems, dashboards, and modern UI experiences with clean design and smooth performance."
        />
      </Helmet>

      <PremiumBackground reducedMotion={prefersReducedMotion} />

      {/* Liquid Page Transition Overlay */}
      <div className="page-transition-container pointer-events-none fixed inset-0 z-[9999] h-screen w-screen" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="page-trans-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="rgba(255, 135, 9, 0.98)" />
              <stop offset="100%" stopColor="rgba(247, 189, 248, 0.98)" />
            </linearGradient>
          </defs>
          <path className="page-transition-path" fill="url(#page-trans-grad)" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
        </svg>
      </div>

      <div className="relative isolate overflow-hidden">
        <ScrollProgress />
        <Navbar />
        <CommandPalette />

        <main className="page-shell">
          <HeroSection />

          <div className="py-24 md:py-32">
            <Marquee items={['React Architecture', 'ERP Workflows', 'GSAP Motion Design', 'Performance Tuning', 'UI Engineering', 'API Integrations']} />
          </div>

          <Suspense fallback={null}>
            <AboutSection />
          </Suspense>

          <div className="section-block py-24 md:py-32">
            <div className="h-rule" />
          </div>

          <Suspense fallback={null}>
            <ProjectsSection />
          </Suspense>

          <div className="py-24 md:py-32">
            <Marquee items={['Clean Code', 'Scalable Architecture', 'Enterprise UX', 'Interactive Grids', 'Tailwind Styling', 'Product Minded']} />
          </div>

          <Suspense fallback={null}>
            <ExperienceSection />
          </Suspense>

          <div className="section-block py-24 md:py-32">
            <div className="h-rule" />
          </div>

          <Suspense fallback={null}>
            <ContactSection />
          </Suspense>
        </main>

        {/* Footer */}
        <footer
          className="section-block flex flex-col items-start justify-between gap-5 py-10 sm:flex-row sm:items-center"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--accent)]/25 bg-[var(--accent-dim)] text-[11px] font-extrabold text-[var(--accent)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AM
            </span>
            <p
              className="text-xs text-[var(--muted)] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)' }}
              />
              © 2026 Ankit Maurya · Built with React & GSAP
            </p>
          </div>
          <div className="flex items-center gap-5" style={{ fontFamily: 'var(--font-display)' }}>
            {['#home:Home', '#about:About', '#projects:Work', '#contact:Contact'].map((item) => {
              const [href, label] = item.split(':')
              return (
                <a
                  key={href}
                  href={href}
                  className="text-xs text-[var(--muted)] transition-colors duration-200 hover:text-[var(--accent)]"
                >
                  {label}
                </a>
              )
            })}
            <a
              href="https://linkedin.com/in/ankit-maurya2000"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[var(--muted)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              LinkedIn ↗
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
