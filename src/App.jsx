import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '@/components/Navbar'
import { useLenis } from '@/hooks/useLenis'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useCursorGlass } from '@/hooks/useCursorGlass'
import PremiumBackground from '@/components/PremiumBackground'
import ScrollProgress from '@/common/ScrollProgress'
import CommandPalette from '@/common/CommandPalette'
import HeroSection from '@/sections/Hero/HeroSection'

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      <PremiumBackground reducedMotion={prefersReducedMotion} />

      <div className="relative isolate overflow-hidden">
        <ScrollProgress />
        <Navbar />
        <CommandPalette />

        <main className="page-shell">
          <HeroSection />

          <Suspense fallback={null}>
            <ProjectsSection />
          </Suspense>

          <Suspense fallback={null}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={null}>
            <ExperienceSection />
          </Suspense>

          <Suspense fallback={null}>
            <ContactSection />
          </Suspense>
        </main>

        {/* Footer */}
        <footer
          className="section-block flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] py-10 text-xs text-[var(--muted)] sm:flex-row sm:items-center"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            © 2026 Ankit Maurya. Crafted with care.
          </p>
          <div className="flex items-center gap-6">
            <a href="#home" className="transition-colors hover:text-white">Home</a>
            <a href="#projects" className="transition-colors hover:text-white">Work</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
            <a
              href="https://linkedin.com/in/ankit-maurya2000"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
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
